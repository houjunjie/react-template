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

// const adTypeList = [{
//   value: 'A',
//   name: '广告一'
// }, {
//   value: 'B',
//   name: '广告二'
// }, {
//   value: 'C',
//   name: '广告三'
// }, {
//   value: 'D',
//   name: '广告四'
// }];

class ResourcesModal extends React.PureComponent {
  constructor(props) {
    super(props);
    // const lists = _.map(adTypeList, 'value')
    this.state = {
      adTypeList: [],
      allLists: {},
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      checkedObj: {},
      modalVisible: false,
      next: false,
      total: 0
    }
  }
  componentWillReceiveProps(nextProps) {
    const { adTypeList } = nextProps.resourceslock

    this.setState({
      allLists: _.map(adTypeList, '_id'),
      adTypeList: adTypeList
    })
  }
  onCheckAllChange = (e) => {
    const { allLists, adTypeList } = this.state;
    // const { adTypeList } = this.props.resourceslock
    let newadTypeList = [];
    if(e.target.checked) {
      newadTypeList = this.checkSelect(allLists)
    } else {
      newadTypeList = adTypeList.map((item, index) => {
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
      adTypeList: newadTypeList
    });
  }
  onChange = (checkedList) => {
    const { allLists } = this.state;
    const newadTypeList = this.checkSelect(checkedList)
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < allLists.length),
      checkAll: checkedList.length === allLists.length,
      adTypeList: newadTypeList
    });
  }
  checkSelect = (checkedList) => {
    const { adTypeList } = this.state;
    // const { adTypeList } = this.props.resourceslock
    return adTypeList.map((item, index) => {
      const isCheck = _.indexOf(checkedList, item._id) !== -1
      return {
        ...item,
        isCheck
      }
    })

  }
  handleNumber = (e, data) => {
    const {adTypeList} = this.state
    // let total = 0;
    const newAdTypeList = [...adTypeList]
    newAdTypeList.map(item => {
      // if(item.isCheck && item._id !== data._id) {
      //   total = total + ~~item.total
      // }
      if(item._id === data._id) {
        // total = total + ~~e.target.value
        item.total = ~~e.target.value
      }
    })
    this.setState({
      // total: total,
      adTypeList: newAdTypeList
    })
  }
  getTotal = () => {
    const {adTypeList} = this.state
    let total = 0;
    const newAdTypeList = [...adTypeList]
    newAdTypeList.map(item => {
      if(item.isCheck) {
        total = total + ~~item.total
      }
    })
    return total
  }
  // setSongModalVisible = (visible) => {
  //   this.setState({
  //     modalVisible: visible
  //   })
  // }
  handleStep = (val) => {
    this.setState({
      next: val
    })
  }
  render () {
    const { checkedList, next, adTypeList } = this.state;
    const { closeModal } = this.props
    const total = this.getTotal()
    // const { adTypeList } = resourceslock
    // const implateProp = {
    //   dispatch,
    //   loading,
    //   resourceslock,
    //   modalVisible,
    //   setSongModalVisible: this.setSongModalVisible
    // }
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
            adTypeList.map((item, index) => {
              return (
                <div key={index}>
                  <Checkbox value={item._id} className={style.checkbox}>
                    {item.name}
                    <div className={style.checkboxRight}>
                      <InputNumber disabled={!item.isCheck} max={item.daily_show_amount} onBlur={(e) => this.handleNumber(e, item)} size="small" style={{ width: 80 }} /> /{item.daily_show_amount}
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
          <span className="floatRight">{total}</span>
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
