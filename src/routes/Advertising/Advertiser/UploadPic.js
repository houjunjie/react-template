import React from 'react';
import { Upload, Modal, Button } from 'antd'
import style from './UploadPic.less'

const UploadPic = ({
  ...uploadPicProps
}) => {
  const {
    fileList,
    previewVisible,
    previewImage,
    handleCancel,
    handlePreview,
    handleChange,
    openSourceCenter
  } = uploadPicProps
  const uploadButton = (
    <div className={style.uploadBtn}>
      {/* <Icon type="plus" /> */}
      <Button style={{width: 80}} >上传</Button>
    </div>
  );
  // const cancel = () => {
  //   handleCancel()
  // }
  return (
    <div className={style.uploadBox}>

      {
        fileList.length >= 1 ? null :
        <div className={style.uploadMask}>
          <p>类型：JPG,PNG</p>
          <p>大小：＜＝5M</p>
          <p>大小：＜＝5M</p>
          <Button style={{width: 80}} type="primary" onClick={openSourceCenter}>素材中心</Button>
        </div>
      }
      <Upload
        action="//jsonplaceholder.typicode.com/posts/"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        className="upload"
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default UploadPic
