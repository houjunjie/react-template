import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Tabs } from 'antd';
import ResourcesLock from './ResourcesLock'
import Advertoser from './Advertiser'

const { TabPane } = Tabs;

const Advertising = ({
  resourceslock,
  loading,
  dispatch
}) => {
  const handleClick = (val) => {
    console.log('valll', val)
    dispatch({
      type: 'advertiser/query',
      payload: {}
    })
  }
  return (
    <Fragment>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        onTabClick={handleClick}
      >
        <TabPane tab="资源锁定" key="1">
          <ResourcesLock />
        </TabPane>
        <TabPane tab="广告主" key="2">
          <Advertoser />
        </TabPane>
        <TabPane tab="签约审核" key="3">签约审核</TabPane>
        <TabPane tab="素材审核" key="4">素材审核</TabPane>
      </Tabs>
    </Fragment>
  )
}

Advertising.propTypes = {
  resourceslock: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(({ resourceslock, loading }) => ({ resourceslock, loading }))(Advertising)
