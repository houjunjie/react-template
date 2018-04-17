import React from 'react';
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Select } from 'antd';


const Option = Select.Option;

class ResourcesFrom extends React.PureComponent {
  static propTypes = {
    advertising: PropTypes.object,
    dispatch: PropTypes.func
  }
  constructor(props) {
    super(props)

    // console.log(advertising, 'advertising')
    this.state = {
      province: [],
      city: [],
      area: []
    }
  }
  handleProvinceChange = (value) => {
    console.log('value', value)
    // this.setState({
    //   cities: cityData[value],
    //   secondCity: cityData[value][0],
    // });
  }
  onCityChange = (value) => {
    console.log('value', value)
    // this.setState({
    //   secondCity: value,
    // });
  }
  onAreaChange = (value) => {
    console.log('value', value)
    // this.setState({
    //   secondCity: value,
    // });
  }
  render() {
    const { advertising } = this.props
    const { province, city, area } = advertising
    const provinceOptions = province.map(province => <Option key={province.id}>{province.name}</Option>);
    const cityOptions = city.map(city => <Option key={city}>{city}</Option>);
    const areaOptions = area.map(city => <Option key={city}>{city}</Option>);
    return (
      <div>
        <Select style={{ width: 90 }} onChange={this.handleProvinceChange}>
          {provinceOptions}
        </Select>
        <Select style={{ width: 90 }} onChange={this.onCityChange}>
          {cityOptions}
        </Select>
        <Select style={{ width: 90 }} onChange={this.onAreaChange}>
          {areaOptions}
        </Select>
      </div>
    )
  }
}

export default connect(({ advertising, loading }) => ({ advertising }))(ResourcesFrom)
