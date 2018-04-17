import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Checkbox, Row, Col, InputNumber } from 'antd'
import _ from 'lodash'

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

export default class ResourcesModai extends React.PureComponent {
  constructor(props) {
    super(props);
    const lists = _.map(plainOptions, 'value')

    this.state = {
      plainOptions: plainOptions,
      allLists: lists,
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      checkedObj: {}
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
  render () {
    const { checkedList, plainOptions } = this.state;
    const { closeModal } = this.props
    return (
      <Fragment>
        <div className="textRight">
          <Icon type="close" className={style.close} onClick={closeModal}/>
        </div>
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
                      <InputNumber type="number" disabled={!item.isCheck} onBlur={(e) => this.setTotal(e, item)} size="small" style={{ width: 80 }} /> /10000
                    </div>
                  </Checkbox>
                </div>
              )
            })
          }
        </CheckboxGroup>
      </Fragment>
    )
  }
}
