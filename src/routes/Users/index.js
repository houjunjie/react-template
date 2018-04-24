import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Tabs } from 'antd';
// import ResourcesLock from './ResourcesLock'
// import Advertoser from './Advertiser/'

const { TabPane } = Tabs;

const Advertising = ({
  resourceslock,
  loading,
  dispatch
}) => {
  const handleClick = (val) => {
    // dispatch({
    //   type: 'advertiser/query',
    //   payload: {}
    // })
  }
  return (
    <Fragment>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        onTabClick={handleClick}
      >
        <TabPane tab="用户列表" key="1">
          {/* <ResourcesLock /> */}
        </TabPane>
        <TabPane tab="注册用户" key="2">
          {/* <Advertoser /> */}
        </TabPane>
      </Tabs>
    </Fragment>
  )
}

Advertising.propTypes = {
  resourceslock: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(({ resourceslock, loading }) => ({ resourceslock, loading }))(Advertising)
