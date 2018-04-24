import React, { Fragment } from 'react';
import { Row, Col, Form } from 'antd'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import RangePicker from 'components/RangePicker'
import ResourcesModal from './ResourcesModal'
import ResourcesFrom from './ResourcesFrom'


const FormItem = Form.Item
class ResourcesLock extends React.PureComponent {
  static propTypes = {
    resourceslock: PropTypes.object,
    dispatch: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      leftSpan: 24,
      rightSpan: 0
    }
  }
  handleSelect = () => {
    const { open } = this.state;
    if(open) return;
    this.setState({
      open: true,
      leftSpan: 16,
      rightSpan: 8
    })
  }
  closeModal = () => {

    this.setState({
      open: false,
    })
    setTimeout(() => {
      this.setState({
        leftSpan: 24,
        rightSpan: 0
      })
    }, 700);
  }
  render () {
    const { leftSpan, rightSpan, open } = this.state
    const { resourceslock } = this.props
    const {ad_plan} = resourceslock
    // const { dispatch, loading } = this.props
    // const modalProp = {
    //   dispatch,
    //   loading
    // }
    return (
      <Fragment>
        <Row>
          <ResourcesFrom></ResourcesFrom>
        </Row>
        <Row type="flex">
          <Col span={leftSpan}>
            <RangePicker handleSelect={this.handleSelect} sourceData={ad_plan}></RangePicker>
          </Col>
          <Col span={rightSpan} style={{ paddingLeft: 10 }} className={classnames({
            bounceInDown: open,
            bounceOutUp: open === false,
            animated:true
          })}>
            <ResourcesModal closeModal={this.closeModal} ></ResourcesModal>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default connect(({ resourceslock }) => ({ resourceslock }))(ResourcesLock)
