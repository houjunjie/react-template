import React, { Fragment } from 'react';
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'

const RangePicker = (props) => {
  return (
    <Fragment>
      <CalendarHeader />
      <CalendarBody {...props} ></CalendarBody>
    </Fragment>
  )
}
export default RangePicker
