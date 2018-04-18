import React from 'react';
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Select, TimePicker, Checkbox  } from 'antd';
import moment from 'moment'
import classnames from 'classnames'

import style from './ResourcesFrom.less'

const Option = Select.Option;

class ResourcesFrom extends React.PureComponent {
  static propTypes = {
    resourceslock: PropTypes.object,
    dispatch: PropTypes.func
  }
  constructor(props) {
    super(props)

    // console.log(advertising, 'advertising')
    this.state = {
      province: [],
      city: [],
      area: [],
      startDate: "00:00",
      endDate: "23:59"
    }
  }
  handleProvinceChange = (value) => {
    console.log('value', value)
    this.props.dispatch({
      type: 'resourceslock/queryCityList',
      payload: {
        parent_id: value
      }
    })
    // this.setState({
    //   cities: cityData[value],
    //   secondCity: cityData[value][0],
    // });
  }
  onCityChange = (value) => {
    console.log('value', value)
    this.props.dispatch({
      type: 'resourceslock/queryAreaList',
      payload: {
        parent_id: value
      }
    })
  }
  onAreaChange = (value) => {
    console.log('value', value)
    // this.setState({
    //   secondCity: value,
    // });
  }
  selectStartDate = (value) => {
    this.setState({
      startDate: value
    })
  }
  selectEndDate = (value) => {
    this.setState({
      endDate: value
    })
  }
  selectAllDay = (e) => {
    console.log(e.target.checked, 'value');
    this.setState({
      disabled: e.target.checked
    })
  }
  render() {
    const { disabled } = this.state
    const { resourceslock } = this.props
    const { province, city, area } = resourceslock
    const format = 'HH:mm';
    console.log('city', city)
    const provinceOptions = province.map(province => <Option key={province.id} title={province.name}>{province.name}</Option>);
    const cityOptions = city.map(city => <Option key={city.id} title={city.name}>{city.name}</Option>);
    const areaOptions = area.map(area => <Option key={area.id} title={area.name}>{area.name}</Option>);
    return (
      <div>
        地区
        <Select placeholder="选择省" className={style.select} onChange={this.handleProvinceChange}>
          {provinceOptions}
        </Select>
        <Select placeholder="选择市" className={style.select} onChange={this.onCityChange}>
          {cityOptions}
        </Select>
        <Select placeholder="选择区" className={style.select} onChange={this.onAreaChange}>
          {areaOptions}
        </Select>
        <span className="margin-left10">时间</span>
        <TimePicker
          className={style.time}
          onChange={this.selectStartDate}
          disabled={disabled}
          defaultValue={moment('00:00', format)}
          format={format} />
        -
        <TimePicker
          className={style.time}
          defaultValue={moment('23:59', format)}
          disabled={disabled}
          onChange={this.selectEndDate}
          format={format} />
        <Checkbox onChange={this.selectAllDay}>全天</Checkbox>
      </div>
    )
  }
}

export default connect(({ resourceslock, loading }) => ({ resourceslock, loading }))(ResourcesFrom)
