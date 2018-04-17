import React from 'react';
import moment from 'moment'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import style from './index.less'
const CalendarBody = ({
  rangepicker,
  dispatch,
  handleSelect
}) => {
  const { year, month, curDay, startDate, endDate, off } = rangepicker
  const m = moment(`${year}-${month}`, 'YYYY-MM'),
        daysCount = m.daysInMonth(), // 当前月的天数
        lastDay = moment(`${year}-${month}`, 'YYYY-MM').subtract(1, 'days'),
        nextMonthDay = moment(`${year}-${month}-${daysCount}`, 'YYYY-MM-DD').add(1, 'days');

  let lastDays = lastDay.daysInMonth(), // 上一个月的天数
      firstDayWeek = m.day(); // 当前月第一天是周几
  let monthData = [];
  let rowsInMonth = [];
  //补足上一个月
  for (; firstDayWeek > 0; firstDayWeek--) {
    let day = lastDays--;
    let date = `${lastDay.format('YYYY')}-${lastDay.format('MM')}-${day < 10 ? '0' + day : day}`
    monthData.push({
      classname: classnames({
        'last-month-day': true,
        [style.today]: curDay === date,
        [style.inRange]: moment(date).unix() >  moment(startDate).unix() && moment(date).unix() <  moment(endDate).unix(),
        [style.selectedStart]: date === startDate,
        [style.selectedEnd]: date === endDate
      }),
      day: day,
      date
    })
    // monthData.unshift(lastDays--)
  }
  //加入当前月
  for (let i = 0; i < daysCount;) {
    let day = ++i;
    let date = `${m.format('YYYY')}-${m.format('MM')}-${day < 10 ? '0' + day : day}`
    monthData.push({
      classname: classnames({
        [style.today]: curDay === date,
        [style.inRange]: moment(date).unix() >  moment(startDate).unix() && moment(date).unix() <  moment(endDate).unix(),
        [style.selectedStart]: date === startDate,
        [style.selectedEnd]: date === endDate
      }),
      day: day,
      date
    })
  }
  //补足下一个月
  for (let i = 42 - monthData.length, j = 0; j < i;) {
    let day = ++j;
    let date = `${nextMonthDay.format('YYYY')}-${nextMonthDay.format('MM')}-${day < 10 ? '0' + day : day}`
    monthData.push({
      classname: classnames({
        'last-month-day': true,
        [style.today]: curDay === date,
        [style.inRange]: moment(date).unix() >  moment(startDate).unix() && moment(date).unix() <  moment(endDate).unix(),
        [style.selectedStart]: date === startDate,
        [style.selectedEnd]: date === endDate
      }),
      day: day,
      date
    })
    // monthData.push(++j)
  }
  //把每一个月的显示数据以7天为一组等分
  monthData.forEach((day, index)=> {
    if (index % 7 === 0) {
      rowsInMonth.push(monthData.slice(index, index + 7))
    }
  })

  const handleMouseEnter = (date) => {
    // console.log(date, "date");
    if(!startDate || off) {
      return
    }
    const temp = isEndDateMax(startDate, date);
    dispatch({
      type: 'rangepicker/updataState',
      payload: {
        endDate: temp ? date : null
      }
    })
    // payload = {
    //   startDate: temp ? startDate : date,
    //   endDate: temp ? date : startDate
    // }
    // console.log(payload, 'payload')
  }
  // 判断后一个日期是否比前一个日期大
  const isEndDateMax = (start, end) => {
    let unix1 = moment(start).unix(),
        unix2 = moment(end).unix();
    return unix1 <= unix2
  }
  const handleClick = (date) => {
    console.log(date, 'click');
    let payload = {}
    handleSelect()
    if(!startDate || (endDate && off) ) {
      payload = {
        startDate: date,
        endDate: null
      }
    } else {
      const temp = isEndDateMax(startDate, date);
      payload = {
        startDate: temp ? startDate : date,
        endDate: temp ? date : startDate,
        off: temp ? true : false
      }
    }
    dispatch({
      type: 'rangepicker/updataState',
      payload
    })
  }

  return (
    <div>
      <table className={style.calendarTable} cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th title="星期一">
              <span >一</span>
            </th>
            <th title="星期二">
              <span >二</span>
            </th>
            <th title="星期三">
              <span >三</span>
            </th>
            <th title="星期四">
              <span >四</span>
            </th>
            <th title="星期五">
              <span >五</span>
            </th>
            <th title="星期六">
              <span >六</span>
            </th>
            <th title="星期天">
              <span >日</span>
            </th>
          </tr>
        </thead>
        <tbody>
        {
          rowsInMonth.map((row, rowIndex)=> {
            return (
              <tr key={rowIndex}>
                {
                  row.map((item, i)=> {
                    return (
                      <td
                        className={item.classname}
                        title={item.date}
                        key={i}
                        onMouseEnter={() => handleMouseEnter(item.date)}
                        onClick={() => handleClick(item.date)}
                      >
                        <div className={style.calendarDate}>{item.day}</div>
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
        </tbody>
      </table>
      {/* <div className={style.weekday}>
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
          {prevNodeList()}
          {nodeList()}
          {nextNodeList()}
        </ul>
      </div> */}
    </div>
  )
}
CalendarBody.propTypes= {
  rangepicker: PropTypes.object,
  dispatch: PropTypes.func
}
export default connect(({ rangepicker }) => ({ rangepicker }))(CalendarBody)
