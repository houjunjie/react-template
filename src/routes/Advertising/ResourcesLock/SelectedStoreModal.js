import React from 'react';
import { Modal, Tabs, Table, Select } from 'antd'
import { storeType } from 'config'
import style from './ResourcesFrom.less'


const selectedData = {"list":[{"province":"\u5e7f\u4e1c\u7701","province_code":"44","city":"\u5e7f\u5dde\u5e02","city_code":"4401","area":"\u8d8a\u79c0\u533a","area_code":"440101","total":10,"select":1,"mask":0,"select_store":[{"name":"\u5e97\u5bb6\u4e00","address":"\u5148\u70c8\u4e2d\u8def80\u53f7","ktvnetcode":"K1505240001"}],"mask_store":[]},{"province":"\u5e7f\u4e1c\u7701","province_code":"44","city":"\u5e7f\u5dde\u5e02","city_code":"4401","area":"\u767d\u4e91\u533a","area_code":"440106","total":10,"select":1,"mask":0,"select_store":[{"name":"\u5e97\u5bb6\u4e00","address":"\u5148\u70c8\u4e2d\u8def80\u53f7","ktvnetcode":"K1505240001"}],"mask_store":[]},{"province":"\u5e7f\u4e1c\u7701","province_code":"44","city":"\u5e7f\u5dde\u5e02","city_code":"4401","area":"\u5929\u6cb3\u533a","area_code":"440104","total":10,"select":1,"mask":0,"select_store":[{"name":"\u5e97\u5bb6\u4e00","address":"\u5148\u70c8\u4e2d\u8def80\u53f7","ktvnetcode":"K1505240001"}],"mask_store":[]}]}
const { TabPane } = Tabs
const Option = Select.Option;
class SelectedStoreModal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      allStoreObject: {},
      allCityObject: {},
      list:[],
      province: "",
      city: "",
      area: "",
      province_value: '',
      provinceList: [], // 省名列表
      city_value: '',
      cityList: [], // 市名列表
      area_value: '',
      areaList: [] // 区名列表
    }
  }
  handleProvinceChange = (value) => {
    const { allCityObject } = this.state;
    if(allCityObject[value]){
      this.setState({
        cityList: allCityObject[value],
        city:'',
        area: ''
      })
      return;
    }
    let city = [];
    let cityList = []
    selectedData.list.map((item, index) => {
      if(city.indexOf(item.city_code) === -1) {
        city.push(item.city_code)
        cityList.push({
          name: item.city,
          city_code: item.city_code
        })
      }
    })
    this.updateList(value, 'province_code')
    console.log(cityList, 'city_code');
    this.setState({
      [allCityObject[value]]: cityList,
      cityList: cityList,
      city:'',
      area: ''
    })
  }
  onCityChange = (value) => {
    const { allCityObject } = this.state;
    if(allCityObject[value]){
      this.setState({
        areaList: allCityObject[value],
        area: ''
      })
      return;
    }
    let area = [];
    let areaList = []
    selectedData.list.map((item, index) => {
      if(area.indexOf(item.area_code) === -1) {
        area.push(item.area_code)
        areaList.push({
          name: item.area,
          area_code: item.area_code
        })
      }
    })
    this.updateList(value, 'city_code')
    console.log(areaList, 'areaList');
    this.setState({
      [allCityObject[value]]: areaList,
      areaList: areaList,
      area: ''
    })
  }
  onAreaChange = (value) => {
    this.updateList(value, 'area_code')
  }
  updateList = (code, attr) => {
    // const selectedData
    console.log(code, attr, 'attrrrrrrrr')
    const { allStoreObject } = this.state
    let list = []
    if(allStoreObject[code]){
      this.setState({
        list: allStoreObject[code]
      })
      return;
    }
    if(!attr) {
      selectedData.list.map((item) => {
        list = list.concat(item.select_store)
      })
      this.setState({
        list: list
      })
    } else {
      selectedData.list.map((item) => {
        if(item[attr] == code){
          list = list.concat(item.select_store)
        }
      })
      this.setState({
        [allStoreObject[code]]: list,
        list: list
      })
    }

    console.log(list,"hello");

  }
  componentDidMount() {
    let province = [];
    let provinceList = []
    selectedData.list.map((item, index) => {
      if(province.indexOf(item.province_code) === -1) {
        province.push(item.province_code)
        provinceList.push({
          name: item.province,
          province_code: item.province_code
        })
      }
    })
    this.updateList(provinceList[0].province_code)
    this.setState({
      provinceList: provinceList,
      province_value: provinceList[0].province_code
    })
  }
  render() {
    const { modalProps, dispatch, loading, selectedStorelist } = this.props
    const { province, city, area, provinceList,list, cityList, areaList } = this.state
    // const { visible } = modal
    console.log(selectedData,provinceList,list,cityList,areaList, 'selectedStorelistselectedStorelist')
    // const { sList } = selectedStorelist
    const sList = list
    // let province = []
    // let city = []
    // let area = []


    const columns = [
      {
        title: '店家名',
        dataIndex: 'name',
        width: 130
      },
      {
        title: '店家地址',
        dataIndex: 'address',
        width: 160
      },
      {
        title: '类型',
        dataIndex: 'ktvnetcode',

      },
    ]
    const selectedListProps = {
      // pagination: sPagination,
      // pagination: false,
      dataSource: sList,
      columns,
      // rowSelection: {
      //   selectedRowKeys: sSelectedRowKeys,
      //   onChange: (keys) => {
      //     console.log('keys', keys)
      //     dispatch({
      //       type: 'resourceslock/updateSelectStoreState',
      //       payload: {
      //         sSelectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
      // loading: loading.effects['resourceslock/queryStorelist'],
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
    const provinceOptions = provinceList.map(province => <Option key={province.province_code} title={province.name}>{province.name}</Option>);
    const cityOptions = cityList.map(city => <Option key={city.city_code} title={city.name}>{city.name}</Option>);
    const areaOptions = areaList.map(area => <Option key={area.area_code} title={area.name}>{area.name}</Option>);
    return (
      <Modal {...modalProps}>
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
          // value={city_code}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          placeholder="选择市"
          className={style.select}
          value={city}
          onSelect={this.onCityChange}>
          {cityOptions}
        </Select>
        <Select
          showSearch
          // value={area_code}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          placeholder="选择区"
          className={style.select}
          value={area}
          onSelect={this.onAreaChange}>
          {areaOptions}
        </Select>
        {/* <Tabs
          defaultActiveKey="1"
          onTabClick={handleClick}
        >
          <TabPane tab="广告主信息" key="1">
            <Table
              {...selectedListProps}
              bordered
              // scroll={{ x: 1200 }}
              // columns={columns}
              simple
              size="small"
              scroll={{ y: 400 }}
              rowKey={record => record.id}
            />
          </TabPane>

          <TabPane tab="操作记录" key="3">操作记录</TabPane>
        </Tabs> */}
        {/* <TabPane tab="广告主信息" key="1"> */}
          <Table
            {...selectedListProps}
            bordered
            // scroll={{ x: 1200 }}
            // columns={columns}
            simple
            size="small"
            scroll={{ y: 400 }}
            rowKey={record => record.id}
          />
      </Modal>
    )
  }
}
// const SelectedStoreModal = ({
//   ...selectedStoreProps
// }) => {

// }

export default SelectedStoreModal
