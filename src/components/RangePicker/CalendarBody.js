import React from 'react';
import moment from 'moment'
import style from './index.less'
const CalendarHeader = ({

}) => {
  console.log(moment().format('M'), 32)
  return (
    <div>
      <div className={style.weekday}>
        <ul>
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
      </div>
      <div className={style.CalendarDay}>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
        </ul>
      </div>
    </div>
  )
}

export default CalendarHeader
