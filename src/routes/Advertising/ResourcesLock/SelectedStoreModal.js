import React from 'react';
import { Modal, Tabs, Table } from 'antd'
import { storeType } from 'config'
// {"data":{"targeting":{"_id":"5ad89215fa42452e300017b3","user_id":174,"list":[{"province":"\u5e7f\u4e1c\u7701","province_code":"44","city":"\u5e7f\u5dde\u5e02","city_code":"4401","area":"\u8d8a\u79c0\u533a","area_code":"440101","total":10,"select":1,"mask":0,"select_store":[{"name":"\u5e97\u5bb6\u4e00","address":"\u5148\u70c8\u4e2d\u8def80\u53f7","ktvnetcode":"K1505240001"}],"mask_store":[]},{"province":"\u5e7f\u4e1c\u7701","province_code":"44","city":"\u5e7f\u5dde\u5e02","city_code":"4401","area":"\u767d\u4e91\u533a","area_code":"440106","total":10,"select":1,"mask":0,"select_store":[{"name":"\u5e97\u5bb6\u4e00","address":"\u5148\u70c8\u4e2d\u8def80\u53f7","ktvnetcode":"K1505240001"}],"mask_store":[]},{"province":"\u5e7f\u4e1c\u7701","province_code":"44","city":"\u5e7f\u5dde\u5e02","city_code":"4401","area":"\u5929\u6cb3\u533a","area_code":"440104","total":10,"select":1,"mask":0,"select_store":[{"name":"\u5e97\u5bb6\u4e00","address":"\u5148\u70c8\u4e2d\u8def80\u53f7","ktvnetcode":"K1505240001"}],"mask_store":[]}],"updated_at":"2018-04-20 15:06:48","created_at":"2018-04-19 20:56:53"}},"msg":"","tips":"","url":"","code":0}
const { TabPane } = Tabs
class SelectedStoreModal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { selectedStoreProps } = this.props
    const { modalProps, dispatch, loading, selectedStorelist } = selectedStoreProps
    // const { visible } = modal
    console.log(selectedStorelist, 'selectedStorelistselectedStorelist')
    const { sList } = selectedStorelist
    const handleClick = () =>{

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
        onFilter: (value, record) => { console.log(record['store_type'], value); return record['store_type'] === Number(value)},
        render: (item) => <span>{storeType[item-1]}</span>
      },
    ]
    const selectedListProps = {
      // pagination: sPagination,
      pagination: false,
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
    return (
      <Modal {...modalProps}>
        <Tabs
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
        </Tabs>
      </Modal>
    )
  }
}
// const SelectedStoreModal = ({
//   ...selectedStoreProps
// }) => {

// }

export default SelectedStoreModal
