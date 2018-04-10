export default {
  entry: "src/index.js",
  publicPath: "/",
  extraBabelPlugins: [
    ["import", { "libraryName": "antd", "style": true }]
  ],
  env: {
    "development": {
      "extraBabelPlugins": ["dva-hmr"]
    }
  },
  proxy: {
    "/api/v1": {
      // "target": "http://test.beidousat.com:8084/server/index.php?g=Web&c=Mock&o=simple&projectID=16&uri=/v4.0/",
      "target": "http://192.168.1.99:5000/v4.0/",
      "changeOrigin": true,
      // "pathRewrite": { "^/api/v1": "" }
    },
  }
}
