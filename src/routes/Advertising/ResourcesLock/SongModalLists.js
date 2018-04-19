import React from 'react';
import { Modal, Table } from 'antd'
// import { connect } from 'dva'

const SongModalLists = ({
  modalProps,
  listProps
}) => {
  // const modalOpts = {
  //   ...modalProps,
  //   width: '70%',
  // }

  return (
    <Modal {...modalProps}>
      <Table
          {...listProps}
          bordered
          // scroll={{ x: 1200 }}
          // columns={columns}
          simple
          rowKey={record => record.id}
        />
    </Modal>
  )
}

export default SongModalLists
