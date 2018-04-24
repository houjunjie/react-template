import React from 'react';
import { Modal, Table, Button, Tabs } from 'antd'
import { storeType } from 'config'
// import style from './ResourcesFrom.less'


const { TabPane } = Tabs
class SelectedStoreModal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sSelectedRowKeys: [],
      list:[],
      maskStore: [],
      key: 0
    }
  }
  updateList = (index) => {
    const { sList } = this.props.selectedStorelist
    let list = []
    let maskStore = []
    let sSelectedRowKeys = []
    if(sList.length<=0) return
    sList[index].select_store.map((d) => {
      sSelectedRowKeys.push(d.shop_code)
    })
    list = list.concat(sList[index].select_store)
    maskStore = maskStore.concat(sList[index].mask_store)
    this.setState({
      list: list,
      maskStore: maskStore,
      sSelectedRowKeys,
      key: index
    })

  }

  updateState = (payload) => {
    this.setState({
      ...payload
    })
  }
  handleOk = () => {
    const { sSelectedRowKeys, list, maskStore, key } = this.state
    const { selectedStorelist, modalProps } = this.props
    const { sList } = selectedStorelist
    let newStore = []
    let mask_store = []
    const allList = [].concat(list, maskStore )
    if(!sSelectedRowKeys.length){
      mask_store = list
    }
    else {
      allList.map((item) => {
        if(sSelectedRowKeys.indexOf(item.shop_code) === -1) {
          newStore.push(item)
        }else {
          mask_store.push(item)
        }
      })
    }
    sList[key].select_store = newStore
    sList[key].mask_store = mask_store
    modalProps.onOk({
      list: sList,
      key: key,
      action: 'UPDATE'
    })
  }
  handleDel = () => {
    const { key } = this.state
    const { selectedStorelist, modalProps } = this.props
    const { sList } = selectedStorelist
    modalProps.onOk({
      list: sList,
      key: key,
      action: 'DELETE'
    })
  }
  handleTabClick = (val) => {
    this.updateList(val)
  }
  componentWillReceiveProps(nextProps) {
    this.updateList(0)
  }
  render() {
    const { modalProps, dispatch, loading, selectedStorelist } = this.props
    const { maskStore, city, area, provinceList, list, cityList, areaList, sSelectedRowKeys } = this.state
    const { sList } = selectedStorelist
    const modalOpts = {
      ...modalProps,
      onOk: this.handleOk,

    }
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
        onFilter: (value, record) => { return record['store_type'] === Number(value)},
        render: (item) => <span>{storeType[item-1]}</span>
      },
    ]
    const updateState = this.updateState
    const selectedListProps = {
      pagination: false,
      scroll:{ y: 500 },
      dataSource: [].concat(list, maskStore),
      columns,
      rowSelection: {
        selectedRowKeys: sSelectedRowKeys,
        onChange: (keys) => {
          updateState({
            sSelectedRowKeys: keys,
          })
        },
      },
    }
    const rendertabPane = sList.map((item, index) => {
      const name = item.area || item.city || item.province || '全国'
      return (
        <TabPane tab={name} key={index}>
          <Table
            {...selectedListProps}
            bordered
            // scroll={{ x: 1200 }}
            // columns={columns}
            simple
            size="small"
            scroll={{ y: 400 }}
            rowKey={record => record.shop_code}
          />
        </TabPane>
      )
    })

    return (
      <Modal {...modalOpts}
        footer={[
          <Button key="del" className="floatLeft" type="danger" onClick={this.handleDel}>移除该地区</Button>,
          <Button key="goback" onClick={modalOpts.onBack}>返回店家列表</Button>,
          <Button key="back" onClick={modalOpts.onCancel}>取消</Button>,
          <Button key="submit" type="primary"  onClick={this.handleOk}>
            修改
          </Button>,
        ]}
      >

        <Tabs
          defaultActiveKey="0"
          tabPosition="left"
          onTabClick={this.handleTabClick}
        >
          {
            rendertabPane
          }
        </Tabs>

      </Modal>
    )
  }
}
export default SelectedStoreModal
