import React from 'react';
import { Row, Col, Input, Table } from 'antd'

const { Search } = Input
const AdvertiserFirstStep = ({
  ...firstStepProp
}) => {
  const { dispatch, loading, advertiser } = firstStepProp
  const { pagination, list } = advertiser
  const columns = [
    {
      title: '广告主id',
      dataIndex: 'id',
    },
    {
      title: '联系人1',
      dataIndex: 'name',
    },
    {
      title: '电话',
      dataIndex: 'moblie',
    },
  ]
  const listProps = {
    pagination,
    dataSource: list,
    columns,
    loading: loading.effects['advertiser/query'],
    onRow (record) {
      return {
        onClick: () => {
          dispatch({
            type: 'advertiser/updateState',
            payload: {
              firstStep: false
            }
          })
        }
      }
    },
    onChange (page) {
      console.log(page, 'dddd');
      // dispatch(routerRedux.push({
      //   pathname,
      //   search: queryString.stringify({
      //     ...query,
      //     current_page: page.current,
      //     per_page: page.pageSize,
      //   }),
      // }))
      dispatch({
        type: 'advertiser/query',
        payload: {
          current_page: page.current,
          per_page: page.pageSize,
        }
      })
    },
  }
  return (
    <div>
      <Row className="margin-bottom10" type="flex" align="middle">
        {/* <Col span={6}>
          <h3 style={{ marginBottom: 0 }}>下架的作品</h3>
        </Col> */}
        <Col span={18} className="floatRight">
          <Search style={{ width: 300 }} placeholder="请输入要搜索的作品名称" onSearch={this.handleSearch} enterButton />
        </Col>
      </Row>
      <Table
        {...listProps}
        bordered
        // scroll={{ x: 1200 }}
        // columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  )
}

export default AdvertiserFirstStep
