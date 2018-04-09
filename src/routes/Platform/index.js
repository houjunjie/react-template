import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
// import { Link } from 'dva/router'
import style from './index.less'

const Platform = ({
  platform,
  dispatch,
}) => {
  console.log('platform', platform)
  const goService = (user) => {
    console.log(user, 'data')
    dispatch({
      type: 'platform/goService',
      payload: { user },
    })
  }
  return (
    <div className={style.platform}>
      <Row gutter={16}>
        {
          platform.user_service.map((item, index) => {
            return (<Col key={index} span={6} onClick={() => goService(item.role)} >
              {item.service.name}
            </Col>)
          })
        }

      </Row>
    </div>
  )
}
Platform.propTypes = {
  platform: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ platform }) => ({ platform }))(Platform)
// export default class Platform extends Component {
//   render () {
//     return (
//     )
//   }
// }
