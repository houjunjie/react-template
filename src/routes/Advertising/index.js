import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Tabs } from 'antd';
import ResourcesLock from './ResourcesLock'

const { TabPane } = Tabs;

const Advertising = ({
  advertising,
  loading,
  dispatch
}) => {
  return (
    <Fragment>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
      >
        <TabPane tab="资源锁定" key="1">
          <ResourcesLock />
        </TabPane>
        <TabPane tab="广告主" key="2">广告主</TabPane>
        <TabPane tab="签约审核" key="3">签约审核</TabPane>
        <TabPane tab="素材审核" key="4">素材审核</TabPane>
      </Tabs>
    </Fragment>
  )
}

Advertising.propTypes = {
  advertising: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(({ advertising, loading }) => ({ advertising, loading }))(Advertising)
