import React from 'react';
import { Modal, Radio, List } from 'antd'
import PropTypes from 'prop-types'
import style from './SourceCenter.less'

const RadioGroup = Radio.Group;
const listData = [];
for (let i = 0; i < 5; i++) {
  listData.push({
    id: i,
    title: `test ${i}`,
    avatar: 'http://192.168.1.99/Uploads/220/ad_file/2016-09-06/57ce1a4e4d3b4_thumbnail.png',
  });
}
class SourceCenter extends React.PureComponent {
  static propTypes = {
    // advertiser: PropTypes.object,
    // loading: PropTypes.object,
    // dispatch: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: ''
    }
  }
  handleCancel = () => {
    this.setState({
      previewVisible: false
    })
  }
  openPreview = (previewImage) => {
    this.setState({
      previewVisible: true,
      previewImage
    })
  }
  render() {
    const {centerVisible, handleCenterCancel} = this.props
    const { previewVisible, previewImage } = this.state
    const pagination = {
      pageSize: 10,
      current: 1,
      total: listData.length,
      onChange: (() => {}),
    };
    const onChange = (val) => {
      console.log('素材中心valradio', val)
    }
    return (
      [
        <Modal key="1" width="70%" visible={centerVisible} title="素材中心" onCancel={handleCenterCancel}>
          <RadioGroup onChange={onChange} >
            <List
              grid={{ gutter: 16, column: 4 }}
              pagination={pagination}
              dataSource={listData}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  style={{borderBottom: 0}}
                  className={style.listItem}
                >
                  <img src={item.avatar} alt="" className={style.img} onClick={() => this.openPreview(item.avatar)} />
                  <Radio className={style.radio} value={item.id}></Radio>
                </List.Item>
              )}
            >
            </List>
          </RadioGroup>
        </Modal>,
        <Modal key="2" visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      ]
    )
  }
}
// const SourceCenter = ({
//   ...centerProps
// }) => {

// }

export default SourceCenter
