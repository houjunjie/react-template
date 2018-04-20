import React from 'react';
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Select, TimePicker, Checkbox, Button, Table, Popover } from 'antd';
import moment from 'moment'
import { storeType } from 'config'
import SelectedStoreModal from './SelectedStoreModal'
// import classnames from 'classnames'

import style from './ResourcesFrom.less'

const Option = Select.Option;

class ResourcesFrom extends React.PureComponent {
  static propTypes = {
    resourceslock: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object
  }
  constructor(props) {
    super(props)

    // console.log(advertising, 'advertising')
    this.state = {
      province: [],
      city: [],
      area: [],
      startDate: "00:00",
      endDate: "23:59",
      firstSetp: true,
      disabled: true
    }
  }
  handleProvinceChange = (value, item) => {
    const { dispatch, resourceslock } = this.props
    const { province_code } = resourceslock
    if(value === province_code) return
    dispatch({
      type: 'resourceslock/queryCityList',
      payload: {
        query: {
          parent_id: value
        },
        provinceObj: {
          province_name: item.props.children,
          province_code: value,
          city_name: '',
          city_code: '',
          area_name: '',
          area_code: '',
          selectedRowKeys:[]
        }
      },
    })

    // this.setState({
    //   cities: cityData[value],
    //   secondCity: cityData[value][0],
    // });
  }
  onCityChange = (value, item) => {
    const { dispatch, resourceslock } = this.props
    const { city_code} = resourceslock
    if(value === city_code) return
    dispatch({
      type: 'resourceslock/queryAreaList',
      payload: {
        query:{
          parent_id: value
        },
        cityObj: {
          city_name: item.props.children,
          city_code: value,
          area_name: '',
          area_code: '',
          selectedRowKeys:[]
        }
      }
    })
  }
  onAreaChange = (value, item) => {
    const { dispatch, resourceslock } = this.props
    const { area_code } = resourceslock
    if(value === area_code) return
    dispatch({
      type: 'resourceslock/updateState',
      payload: {
        area_name: item.props.children,
        area_code: value,
        selectedRowKeys:[]
      }
    })
    // this.setState({
    //   secondCity: value,
    // });
  }
  openStoreList = () => {
    const { dispatch, resourceslock } = this.props
    const { province_code, city_code, area_code } = resourceslock
    dispatch({
      type: 'resourceslock/queryStorelist',
      payload: {
        province: province_code,
        city: city_code,
        area: area_code
      }
    })
    dispatch({
      type: 'resourceslock/updateState',
      payload: {
        popoverVisible: true
      }
    })
  }
  selectStartDate = (value) => {
    this.setState({
      startDate: value
    })
  }
  selectEndDate = (value) => {
    this.setState({
      endDate: value
    })
  }
  selectAllDay = (e) => {
    this.setState({
      disabled: e.target.checked
    })
  }
  selectStore = () => {

  }
  addSelect = () => {
    const { dispatch, resourceslock} = this.props;
    const {
      selectedRowKeys,
      list,
      province_name,
      province_code,
      city_name,
      city_code,
      area_name,
      area_code
    } = resourceslock;
    const select = list.filter((item) => {
      return selectedRowKeys.indexOf(item.id) !== -1
    })
    const mask_store = list.filter((item) => {
      return selectedRowKeys.indexOf(item.id) === -1
    })
    console.log(selectedRowKeys, select, province_name, province_code)
    const total = list.length,
          selectTotal = select.length
    dispatch({
      type: 'resourceslock/addSelectStore',
      payload: {
        select: {
          select: selectTotal,
          total: total,
          mask: total - selectTotal,
          province:province_name,
          province_code:province_code,
          city:city_name,
          city_code:city_code,
          area:area_name,
          area_code:area_code,
          select_store: select,
          mask_store: mask_store
        }
      }
    })
  }
  openSelectedStore = () => {
    this.props.dispatch({
      type: 'resourceslock/querySelectedStorelist',
      payload:{}
    })
    this.props.dispatch({
      type: 'resourceslock/updateState',
      payload:{
        selectedVisible: true,
        popoverVisible: false
      }
    })
    // this.setState({
    //   firstSetp: value
    // })
  }
  render() {
    const { disabled } = this.state
    const { resourceslock, loading, dispatch } = this.props
    const {
      province,
      city,
      area,
      pagination,
      list,
      selectedRowKeys,
      city_code,
      area_code,
      selectedStorelist,
      selectedVisible,
      popoverVisible
    } = resourceslock
    // const { sSelectedRowKeys, sPagination, sList} = selectedStorelist
    const format = 'HH:mm';
    const provinceOptions = province.map(province => <Option key={province.id} title={province.name}>{province.name}</Option>);
    const cityOptions = city.map(city => <Option key={city.id} title={city.name}>{city.name}</Option>);
    const areaOptions = area.map(area => <Option key={area.id} title={area.name}>{area.name}</Option>);
    const columns = [
      {
        title: '店家名',
        dataIndex: 'ktv_name',
        width: 130
      },
      {
        title: '店家地址',
        dataIndex: 'business_address',
        width: 160
      },
      {
        title: '类型',
        dataIndex: 'store_type',
        width: 80,
        filters: [
          { text: '量版式', value: '1' },
          { text: '夜总会', value: '2' },
          { text: 'minik', value: '3' },
        ],
        onFilter: (value, record) => { console.log(record['store_type'], value); return record['store_type'] === Number(value)},
        render: (item) => <span>{storeType[item-1]}</span>
      },
    ]
    const listProps = {
      pagination,
      dataSource: list,
      columns,
      rowSelection: {
        selectedRowKeys,
        onChange: (keys) => {
          dispatch({
            type: 'resourceslock/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
      loading: loading.effects['resourceslock/queryStorelist'],
      onChange (page, filters) {
        // dispatch(routerRedux.push({
        //   pathname,
        //   search: queryString.stringify({
        //     ...query,
        //     current_page: page.current,
        //     per_page: page.pageSize,
        //   }),
        // }))
      },
    }
    // const selectedListProps = {
    //   // pagination: sPagination,
    //   pagination: false,
    //   dataSource: sList,
    //   columns,
    //   rowSelection: {
    //     selectedRowKeys: sSelectedRowKeys,
    //     onChange: (keys) => {
    //       console.log('keys', keys)
    //       dispatch({
    //         type: 'resourceslock/updateSelectStoreState',
    //         payload: {
    //           sSelectedRowKeys: keys,
    //         },
    //       })
    //     },
    //   },
    //   loading: loading.effects['resourceslock/queryStorelist'],
    //   onChange (page, filters) {
    //     // dispatch(routerRedux.push({
    //     //   pathname,
    //     //   search: queryString.stringify({
    //     //     ...query,
    //     //     current_page: page.current,
    //     //     per_page: page.pageSize,
    //     //   }),
    //     // }))
    //   },
    // }
    const storeContent = (
      <div className={style.popover}>
        <Table
          {...listProps}
          bordered
          // scroll={{ x: 1200 }}
          // columns={columns}
          simple
          size="small"
          scroll={{ y: 400 }}
          rowKey={record => record.id}
        />
        <div className="margin-top10">
          <Button onClick={this.addSelect}>添加已选</Button>
          <Button className="floatRight" onClick={() => this.openSelectedStore(false)}>已选x家</Button>
        </div>
      </div>
    )
    const selectedStoreProps = {
      modalProps: {
        visible: selectedVisible,
        maskClosable: false,
        // confirmLoading: loading.effects['user/update'],
        title: '已选店家',
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
          // dispatch({
          //   type: 'reportcontent/offShelf',
          //   payload: {
          //     // modalVisible: false,
          //     status: 3,
          //     ...data,
          //   },
          // })
          // dispatch({
          //   type: 'reportcontent/updateState',
          //   payload: {
          //     modalVisible: false,
          //   },
          // })
        },
        onCancel () {
          dispatch({
            type: 'resourceslock/updateState',
            payload:{
              selectedVisible: false
            }
          })
        },
      },
      dispatch,
      loading,
      selectedStorelist,
    }
    return (
      <div>
        地区
        <Select
          showSearch
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          placeholder="选择省"
          className={style.select}
          onSelect={this.handleProvinceChange}>
          {provinceOptions}
        </Select>
        <Select
          showSearch
          value={city_code}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          placeholder="选择市"
          className={style.select}
          onSelect={this.onCityChange}>
          {cityOptions}
        </Select>
        <Select
          showSearch
          value={area_code}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          placeholder="选择区"
          className={style.select}
          onSelect={this.onAreaChange}>
          {areaOptions}
        </Select>
        <Popover visible={popoverVisible} placement="bottomLeft" content={storeContent} trigger="click">
          <Button className="margin-left10" onClick={this.openStoreList}>店家</Button>
        </Popover>
        <span className="margin-left10">时间</span>
        <TimePicker
          className={style.time}
          onChange={this.selectStartDate}
          disabled={disabled}
          defaultValue={moment('00:00', format)}
          format={format} />
        -
        <TimePicker
          className={style.time}
          defaultValue={moment('23:59', format)}
          disabled={disabled}
          onChange={this.selectEndDate}
          format={format} />
        <Checkbox defaultChecked onChange={this.selectAllDay}>全天</Checkbox>

        {selectedVisible && <SelectedStoreModal {...selectedStoreProps} />}
      </div>
    )
  }
}

export default connect(({ resourceslock, loading }) => ({ resourceslock, loading }))(ResourcesFrom)
