import dva from 'dva';
import { message } from 'antd'
import createLoading from 'dva-loading';
// import createHistory from 'history/createBrowserHistory';
import { browserHistory } from 'dva/router'
import './index.less';
import 'animate.css'
import 'babel-polyfill'
// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: browserHistory,
  onError (error) {
    message.error(error.message)
  },
});

// 2. Plugins
// app.use(createLoading());

// 3. Model
app.model(require('./models/app').default);
app.model(require('./models/components/rangepicker').default);
// app.model(require('./models/components/detailPanel').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
