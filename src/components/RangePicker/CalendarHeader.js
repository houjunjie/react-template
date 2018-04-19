import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'dva'
import style from './index.less'
const CalendarHeader = ({
  rangepicker,
  dispatch
}) => {

  let { year, month } = rangepicker
  const handleLeftClick = () => {
    let newMonth = month - 1;
    if (newMonth < 1) {
      year--;
      newMonth = 12;
    }
    dispatch({
      type: 'rangepicker/updataState',
      payload: {
        month: newMonth,
        year
      }
    })
  }
  const handleRightClick = () => {
    let newMonth = month + 1;
    if (newMonth > 12) {
      year ++;
      newMonth = 1;
    }
    dispatch({
      type: 'rangepicker/updataState',
      payload: {
        month: newMonth,
        year
      }
    })
  }
  console.log(moment().format('M'), 32)
  return (
    <div className={style.headerborder}>
      <p style={{lineHeight: '60px'}}>{year}-{month}</p>
      <p className={style.triangleLeft} onClick={handleLeftClick}> </p>
      <p className={style.triangleRight} onClick={handleRightClick}> </p>
    </div>
  )
}
CalendarHeader.propTypes= {
  rangepicker: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(({ rangepicker }) => ({ rangepicker }))(CalendarHeader)
