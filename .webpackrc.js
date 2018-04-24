export default {
  entry: "src/index.js",
  publicPath: "/",
  extraBabelPlugins: [
    ["import", { "libraryName": "antd", "style": true }],
    ["module-resolver", {
      "alias": {
        "routes": `${__dirname}/src/routes`,
        "models": `${__dirname}/src/models`,
        "services": `${__dirname}/src/services`,
        "components": `${__dirname}/src/components`,
        "utils": `${__dirname}/src/utils`,
        "config": `${__dirname}/src/config`
      }
    }]
  ],
  env: {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  proxy: {
    "/v4.0": {
      // "target": "http://test.beidousat.com:8084/server/index.php?g=Web&c=Mock&o=simple&projectID=16&uri=/v4.0/",
      "target": "http://192.168.1.99:5000/",
      "changeOrigin": true,
      // "pathRewrite": { "^/api/v1": "" }
    },
    "/v3.6": {
      // "target": "http://test.beidousat.com:8084/server/index.php?g=Web&c=Mock&o=simple&projectID=16&uri=/v4.0/",
      "target": "http://192.168.1.99:5000/",
      "changeOrigin": true,
      // "pathRewrite": { "^/api/v1": "" }
    },
  },
  // dllPlugin: {
  //   exclude: ["babel-runtime", "roadhog", "cross-env"],
  //   include: ["dva/router", "dva/saga", "dva/fetch"]
  // }
}
