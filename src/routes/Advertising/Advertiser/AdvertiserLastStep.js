import React from 'react';
import { Tabs, Button, Table, Select } from 'antd'
import UploadPic from './UploadPic'
import SourceCenter from './SourceCenter'

const { TabPane } = Tabs
const { Option } = Select
const AdvertiserLastStep = ({
  ...firstStepProp
}) => {
  const { dispatch, loading, advertiser } = firstStepProp
  const { lastStepData } = advertiser
  // lastStep
  const {
    pagination,
    list,
    selectedRowKeys,
    fileList,
    previewVisible,
    previewImage,
    centerVisible,
    centerList
  } = lastStepData

  const handleSetp = (value) => {
    dispatch({
      type: 'advertiser/updateState',
      payload: {
        firstStep: value
      }
    })
  }
  const handleClick = (value) => {
    console.log('valueclick', value)
  }
  const handleChangeAdType = (value) => {
    console.log('handleChangeAdType', value)
  }
  const handleChangeAdPosition = (value) => {
    console.log('handleChangeAdPosition', value)
  }
  const columns = [
    {
      title: '展示设备',
      dataIndex: 'id',
    },
    {
      title: '广告尺寸',
      dataIndex: 'name',
    },
    {
      title: '广告大小',
      dataIndex: 'moblie',
    },
    {
      title: '日均展示量',
      dataIndex: 'num',
    },
    {
      title: '价格(元/千次)展示',
      dataIndex: 'total',
    },
    {
      title: '广告位置',
      dataIndex: 'postition',
    },
  ]
  // 表单Porp
  const listProps = {
    pagination,
    dataSource: list,
    columns,
    loading: loading.effects['advertiser/query'],
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        // dispatch({
        //   type: 'waitingsong/updateState',
        //   payload: {
        //     selectedRowKeys: keys,
        //   },
        // })
      },
    },
    onChange (page) {
      console.log(page, 'dddd');
      // dispatch(routerRedux.push({
      //   pathname,
      //   search: queryString.stringify({
      //     ...query,
      //     current_page: page.current,
      //     per_page: page.pageSize,
      //   }),
      // }))
      dispatch({
        type: 'advertiser/query',
        payload: {
          current_page: page.current,
          per_page: page.pageSize,
        }
      })
    },
  }

  // 上传图片的props
  const handleCancel = () => {
    dispatch({
      type: 'advertiser/updateLastStepState',
      payload: {
        previewVisible: false
      }
    })
  }

  const handlePreview = (file) => {
    // console.log('handlePreview', file)
    dispatch({
      type: 'advertiser/updateLastStepState',
      payload: {
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      }
    })
  }
  const handleChange = ({ fileList }) => {
    // console.log('handleChange', fileList)
    dispatch({
      type: 'advertiser/updateLastStepState',
      payload: {
        fileList
      }
    })
  }
  const openSourceCenter = () => {
    dispatch({
      type: "advertiser/updateLastStepState",
      payload: {
        centerVisible: true
      }
    })
  }
  const uploadPicProps ={
    fileList, previewVisible, previewImage, handleCancel, handlePreview, handleChange, openSourceCenter
  }

  // 素材中心
  const handleCenterCancel = () => {
    dispatch({
      type: "advertiser/updateLastStepState",
      payload: {
        centerVisible: false
      }
    })
  }
  const centerProps = {
    centerVisible,
    centerList,
    handleCenterCancel
  }
  return (
    <div>
      <Button onClick={() => handleSetp(true)}>返回广告主列表</Button>
      <Tabs
        defaultActiveKey="2"
        onTabClick={handleClick}
      >
        <TabPane tab="广告主信息" key="1">
        </TabPane>
        <TabPane tab="广告投放" key="2">
          <div className="margin-bottom10">
            <Select defaultValue="1" style={{ width: 100, marginRight: 10 }} onChange={handleChangeAdType}>
              <Option value="1">标准广告</Option>
              <Option value="2">非标准广告</Option>
            </Select>
            <Select defaultValue="1" style={{ width: 100 }} onChange={handleChangeAdPosition}>
              <Option value="1">电视屏</Option>
              <Option value="2">点歌屏</Option>
              <Option value="3">墙面屏</Option>
              <Option value="4">门口屏</Option>
              <Option value="5">minik屏</Option>
            </Select>
          </div>
          <div>
            <Table
              {...listProps}
              bordered
              // scroll={{ x: 1200 }}
              // columns={columns}
              simple
              className="margin-bottom10"
              rowKey={record => record.id}
            />
            <UploadPic {...uploadPicProps}/>
            <SourceCenter {...centerProps} />
          </div>
        </TabPane>
        <TabPane tab="操作记录" key="3">操作记录</TabPane>
      </Tabs>
    </div>
  )
}

export default AdvertiserLastStep
