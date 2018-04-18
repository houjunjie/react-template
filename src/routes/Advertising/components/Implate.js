import React from 'react';
import { Row, Col, Button, Icon, InputNumber } from 'antd'
import style from './Implate.less'

import SongModalLists from './SongModalLists'


const Implate = ({...implateProp}) => {
  const {
    dispatch,
    loading,
    advertising,
    modalVisible,
    setSongModalVisible
  } = implateProp;
  console.log('loading', loading)
  const {
    pagination,
    selectedRowKeys,
    list
  } = advertising
  console.log('modalVisiblemmm', modalVisible)
  const modalProps = {
    visible: modalVisible,
    maskClosable: false,
    title: '选择植入的歌曲',
    dispatch,
    loading,
    warpClassName: 'vertical-center-modal',
    onOk (data) {
      console.log(data, 'ok')
      setSongModalVisible(false)
    },
    onCancel () {
      setSongModalVisible(false)
    },
  }
  const handleClick = () => {
    setSongModalVisible(true)
    dispatch({
      type: 'advertising/querySonglist',
      payload: {}
    })
  }
  const columns = [
    {
      title: '歌曲名称',
      dataIndex: 'id',
    },
    {
      title: '歌星',
      dataIndex: 'author',
    },
    {
      title: '剩余资源',
      dataIndex: 'status',
    },
  ]
  const listProps = {
    pagination,
    dataSource: list,
    columns,
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
    loading: loading.effects['advertising/querySonglist'],
    onChange (page) {
      // dispatch(routerRedux.push({
      //   pathname,
      //   search: queryString.stringify({
      //     ...query,
      //     current_page: page.current,
      //     per_page: page.pageSize,
      //   }),
      // }))
    },
  }
  return (
    <div className={style.implate}>
      <Row type="flex" className="margin-bottom10">
        <Col span="6">植入广告</Col>
        <Col span="18" className="textRight"><Button size="small" onClick={handleClick}>选择植入广告</Button></Col>
      </Row>
      <div>
        <Row>
          <Icon type="minus-circle-o" className={style.del} />
          冬天里的一把火
          <div className="floatRight"><InputNumber size="small" style={{ width: 80 }} /> /10000</div>
        </Row>
      </div>
      <SongModalLists modalProps={modalProps} listProps={listProps}></SongModalLists>
    </div>
  )
}

export default Implate
