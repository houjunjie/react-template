import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { connect } from 'dva'
import { Table } from 'antd'

class Advertiser extends React.PureComponent {
  static propTypes = {
    advertiser: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
    location: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {

    const { advertiser, loading, location, dispatch } = this.props
    console.log('location', location)
    const { pagination, list } = advertiser
    // location.query = queryString.parse(location.search)
    // const { query, pathname } = location

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
        dataIndex: 'phone',
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
            console.log(record, 111)
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
}

export default connect(({ advertiser, loading}) => ({ advertiser, loading}))(Advertiser)
