import React from 'react';
import { withRouter, Link } from 'dva/router';
import PropTypes from 'prop-types'
import {
  Layout,
  BackTop,
  LocaleProvider,
  // notification,
  Breadcrumb,
} from 'antd';
import { connect } from 'dva';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import styles from './App.less';

import SiderMenu from '../components/SiderMenu/';
import HeaderNav from '../components/HeaderNav/';
import { openPages } from '../config';

const {
  Sider,
  Header,
  Content,
  Footer,
} = Layout;

function App({ children, dispatch, app, location, loading }) {
  // console.log('childrenchildrenchildrenchildren', children)
  const { pathname } = location
  const { breadcrumb } = app
  // console.log(pathname, openPages, 2222)
  if (openPages && openPages.includes(pathname)) {
    return (<div>
      {children}
    </div>)
  }
  // console.log('breadcrumb', breadcrumb)
  return (
    <LocaleProvider locale={zhCN}>
      <Layout className={styles.layout}>
        {/* <ImageViewer />
        <DetailPanel />
        <Player /> */}
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          width={240}
        >
          <SiderMenu />
        </Sider>
        <Layout>
          <BackTop className={styles.backup} />
          <Header style={{ padding: 0 }}>
            <HeaderNav />
          </Header>
          <Content className={styles.content}>
            <Breadcrumb style={{ marginBottom: 8 }}>
              <Breadcrumb.Item>
                <Link to="/">首页</Link>
              </Breadcrumb.Item>
              {
                breadcrumb.map((item, index) => (
                  <Breadcrumb.Item key={index}>
                    <Link to={item.route}>{item.title}</Link>
                  </Breadcrumb.Item>
                ))
              }
            </Breadcrumb>
            <div className={styles.main}>
              {children}
            </div>
          </Content>
          <Footer className={styles.footer}>©2018 Created by houjunjie</Footer>
        </Layout>
      </Layout>
    </LocaleProvider>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
};

// export default withRouter(connect(data => data.app)(App));
export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
