import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Icon, Checkbox, Row, Col, InputNumber, Button } from 'antd'
import _ from 'lodash'
import classnames from 'classnames'
import Implate from './Implate'

import style from './ResourcesModal.less'


// const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

const plainOptions = [{
  value: 'A',
  name: '广告一'
}, {
  value: 'B',
  name: '广告二'
}, {
  value: 'C',
  name: '广告三'
}, {
  value: 'D',
  name: '广告四'
}];

class ResourcesModal extends React.PureComponent {
  constructor(props) {
    super(props);
    const lists = _.map(plainOptions, 'value')
    this.state = {
      plainOptions: plainOptions,
      allLists: lists,
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      checkedObj: {},
      modalVisible: false,
      next: false
    }
  }
  onCheckAllChange = (e) => {
    const { allLists, plainOptions } = this.state;
    let newPlainOptions = [];
    if(e.target.checked) {
      newPlainOptions = this.checkSelect(allLists)
    } else {
      newPlainOptions = plainOptions.map((item, index) => {
        return {
          ...item,
          isCheck: false
        }
      })
    }
    this.setState({
      checkedList: e.target.checked ? allLists : [],
      indeterminate: false,
      checkAll: e.target.checked,
      plainOptions: newPlainOptions
    });
  }
  onChange = (checkedList) => {
    const { allLists } = this.state;
    const newPlainOptions = this.checkSelect(checkedList)
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < allLists.length),
      checkAll: checkedList.length === allLists.length,
      plainOptions: newPlainOptions
    });
  }
  checkSelect = (checkedList) => {
    const { plainOptions } = this.state;
    return plainOptions.map((item, index) => {
      const isCheck = _.indexOf(checkedList, item.value) !== -1
      return {
        ...item,
        isCheck
      }
    })
  }
  setTotal = (e, item) => {
    const {plainOptions} = this.state
    item.total = e.target.value
    let newPlainOptions = Object.assign(plainOptions,item)
  }
  setSongModalVisible = (visible) => {
    console.log('modalVisible', visible)
    this.setState({
      modalVisible: visible
    })
  }
  handleStep = (val) => {
    this.setState({
      next: val
    })
  }
  render () {
    const { checkedList, plainOptions, modalVisible, next } = this.state;
    const { closeModal, dispatch, loading, resourceslock } = this.props
    console.log('loadingloading', loading)
    const implateProp = {
      dispatch,
      loading,
      resourceslock,
      modalVisible,
      setSongModalVisible: this.setSongModalVisible
    }
    const firstStep = () => (
      <div className={style.inner}>
        <div className="margin-bottom10">
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >全选
          </Checkbox>
        </div>
        <CheckboxGroup onChange={this.onChange} value={checkedList} className={style.checkGropu}>
          {
            plainOptions.map((item, index) => {
              return (
                <div key={index}>
                  <Checkbox value={item.value} className={style.checkbox}>
                    {item.name}
                    <div className={style.checkboxRight}>
                      <InputNumber disabled={!item.isCheck} onBlur={(e) => this.setTotal(e, item)} size="small" style={{ width: 80 }} /> /10000
                    </div>
                  </Checkbox>
                </div>
              )
            })
          }
        </CheckboxGroup>
        {/* <Implate {...implateProp}></Implate> */}
        <div className={style.total}>
          合计
          <span className="floatRight">10000</span>
        </div>
        <div className={style.bottom}>
          <Button type="primary" onClick={() => this.handleStep(true)}>下一步</Button>
        </div>
      </div>
    )
    const lastStep = () => (
      <div className={style.inner}>
        <div className={style.top}>
          <div>
            广告形式一
            <span className="floatRight">10000</span>
          </div>
          <div>
            广告形式二
            <span className="floatRight">10000</span>
          </div>
          <div className={style.total}>
            合计
            <span className="floatRight">10000</span>
          </div>
        </div>
        <div className={style.bottom}>
          <Button type="primary" onClick={() => this.handleStep(false)}>上一步</Button>
          <Button type="primary" onClick={closeModal} className={style.submit}>提交</Button>
        </div>
      </div>
    )
    return (
      <div className={style.modal}>
        <div className="textRight">
          <Icon type="close" className={style.close} onClick={closeModal}/>
        </div>
        {
          !next ? firstStep() : lastStep()
        }

      </div>
    )
  }
}
export default connect(({ resourceslock, loading }) => ({ resourceslock, loading }))(ResourcesModal)
