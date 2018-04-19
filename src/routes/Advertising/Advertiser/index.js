import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
// import queryString from 'query-string'
import { connect } from 'dva'
// import { Input, Tabs, } from 'antd'
import AdvertiserFirstStep from './AdvertiserFirstStep'
import AdvertiserLastStep from './AdvertiserLastStep'

// const { Search } = Input
// const { TabPane } = Tabs;
class Advertiser extends React.PureComponent {
  static propTypes = {
    advertiser: PropTypes.object,
    loading: PropTypes.object,
    dispatch: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    const { advertiser, loading, location, dispatch } = this.props;
    // const { firstStep } = this.state
    console.log('location', location)
    const { firstStep } = advertiser
    // location.query = queryString.parse(location.search)
    // const { query, pathname } = location


    const firstStepProp = {
      advertiser,
      loading,
      dispatch
    }
    const lastStepProp = {
      advertiser,
      loading,
      dispatch
    }
    return (
      <Fragment>
        {
          firstStep ? <AdvertiserFirstStep {...firstStepProp}/> : <AdvertiserLastStep {...lastStepProp}/>
        }
      </Fragment>
    )
  }
}
// const Advertiser = ({
//   advertiser, loading, location, dispatch
// }) => {
//   // const { advertiser, loading, location, dispatch } = this.props
//     console.log('location', location)
//     const { pagination, list } = advertiser
//     // location.query = queryString.parse(location.search)
//     // const { query, pathname } = location

//     const columns = [
//       {
//         title: '广告主id',
//         dataIndex: 'id',
//       },
//       {
//         title: '联系人1',
//         dataIndex: 'name',
//       },
//       {
//         title: '电话',
//         dataIndex: 'moblie',
//       },
//     ]
//     const listProps = {
//       pagination,
//       dataSource: list,
//       columns,
//       loading: loading.effects['advertiser/query'],
//       onRow (record) {
//         return {
//           onClick: () => {
//             console.log(record, 111)
//           }
//         }
//       },
//       onChange (page) {
//         console.log(page, 'dddd');
//         // dispatch(routerRedux.push({
//         //   pathname,
//         //   search: queryString.stringify({
//         //     ...query,
//         //     current_page: page.current,
//         //     per_page: page.pageSize,
//         //   }),
//         // }))
//         dispatch({
//           type: 'advertiser/query',
//           payload: {
//             current_page: page.current,
//             per_page: page.pageSize,
//           }
//         })
//       },
//     }
//     return (
//       <div>
//         <Row className="margin-bottom" type="flex" align="middle">
//           {/* <Col span={6}>
//             <h3 style={{ marginBottom: 0 }}>下架的作品</h3>
//           </Col> */}
//           <Col span={18} className="floatRight">
//             <Search style={{ width: 300 }} placeholder="请输入要搜索的作品名称" onSearch={this.handleSearch} enterButton />
//           </Col>
//         </Row>
//         <Table
//           {...listProps}
//           bordered
//           // scroll={{ x: 1200 }}
//           // columns={columns}
//           simple
//           rowKey={record => record.id}
//         />
//       </div>
//     )
// }

export default connect(({ advertiser, loading}) => ({ advertiser, loading}))(Advertiser)
