import mockjs from 'mockjs';
let database = mockjs.mock({
  'data|100': [
    {
      'id|+1': 1,
      'name': '@cname',
      'moblie|1': ['13531544954','13632250649','15820292420','15999905612'],
    },
  ],
}).data
export default {
  'GET /v4.0/advertisers': (req, res) => {
    // const list = mockjs.mock({
    //   data: {
    //     'list|100': [{
    //       'id|+1': 1,
    //       'songname': '@cname',
    //       'singer': '@cname',
    //       'resources|1-10000': 1,
    //     }]
    //   }

    // });
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }
    res.json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    });
  },
};
