import React from 'react';
import moment from 'moment'
import { connect } from 'dva'
import style from './index.less'
const CalendarHeader = ({
  rangepicker
}) => {
  const { year, month } = rangepicker
  const handleLeftClick = () => {

  }
  const handleRightClick = () => {

  }
  console.log(moment().format('M'), 32)
  return (
    <div className={style.headerborder}>
      <p>{year}</p>
      <p>{month}</p>
      <p className={style.triangleLeft} onClick={handleLeftClick}> </p>
      <p className={style.triangleRight} onClick={handleRightClick}> </p>
    </div>
  )
}

export default connect(({ rangepicker }) => ({ rangepicker }))(CalendarHeader)
