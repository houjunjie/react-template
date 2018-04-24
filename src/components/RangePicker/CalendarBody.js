import React from 'react';
import moment from 'moment'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'dva'
// import { Row, Col } from 'antd'
import style from './index.less'
const CalendarBody = ({
  rangepicker,
  dispatch,
  handleSelect,
  sourceData
}) => {
  if(sourceData.length === 0) return (<div></div>)
  const { year, month, curDay, startDate, endDate, off } = rangepicker
  const date = sourceData[0].date
  const m = moment(`${year}-${month}`, 'YYYY-MM'),
        daysCount = m.daysInMonth(), // 当前月的天数
        // lastDay = moment(`${year}-${month}`, 'YYYY-MM').subtract(1, 'days'),
        nextMonthDay = moment(`${year}-${month}-${daysCount}`, 'YYYY-MM-DD').add(1, 'days');

  // let lastDays = lastDay.daysInMonth() // 上一个月的天数
      // firstDayWeek = m.day(); // 当前月第一天是周几
  let monthData = [];
  let rowsInMonth = [];
  console.log('sourceData', date, sourceData)
  // 第一天是周几
  let firstDayWeek = moment(date,'YYYY-MM-DD').day();
  let lastDay = moment(date, 'YYYY-MM-DD').subtract(1, 'days')
  console.log('first', firstDayWeek, lastDay.format("MM-DD"))
  //补足日期
  for (; firstDayWeek > 0; firstDayWeek--) {
    // let day = lastDays--;
    // let date = `${lastDay.format('YYYY')}-${lastDay.format('MM')}-${day < 10 ? '0' + day : day}`
    let date = lastDay.format("MM-DD")
    // const disabled = moment(curDay).unix() > moment(date).unix()
    monthData.unshift({
      classname: classnames({
        [style.lastMonthDay]: true,
        [style.disabled]: true,
        // [style.today]: curDay === date,
        // [style.inRange]: moment(date).unix() >  moment(startDate).unix() && moment(date).unix() <  moment(endDate).unix(),
        // [style.selectedStart]: date === startDate,
        // [style.selectedEnd]: date === endDate
      }),
      disabled: true,
      day: date,
      date: lastDay.format("YYYY-MM-DD")
    })
    lastDay = moment(lastDay.format("YYYY-MM-DD"), 'YYYY-MM-DD').subtract(1, 'days')
    // monthData.unshift(lastDays--)
  }
  //加入当前月
  // for (let i = 0; i < sourceData;) {
  sourceData.map((item) => {
    let date = item.date
    const disabled = moment(curDay).unix() > moment(date).unix()
    monthData.push({
      classname: classnames({
        [style.today]: curDay === date,
        [style.disabled]: disabled,
        [style.inRange]: moment(date).unix() >  moment(startDate).unix() && moment(date).unix() <  moment(endDate).unix(),
        [style.selectedStart]: date === startDate,
        [style.selectedEnd]: date === endDate
      }),
      id: item.id,
      amount: item.amount,
      disabled: disabled,
      day: moment(date, 'YYYY-MM-DD').format("MM-DD"),
      date
    })
  })

  //补足下一个月
  // for (let i = 42 - monthData.length, j = 0; j < i;) {
  //   let day = ++j;
  //   let date = `${nextMonthDay.format('YYYY')}-${nextMonthDay.format('MM')}-${day < 10 ? '0' + day : day}`;
  //   const disabled = moment(curDay).unix() > moment(date).unix()
  //   monthData.push({
  //     classname: classnames({
  //       [style.nextMonthDay]: true,
  //       [style.today]: curDay === date,
  //       [style.disabled]: disabled ,
  //       [style.inRange]: moment(date).unix() >  moment(startDate).unix() && moment(date).unix() <  moment(endDate).unix(),
  //       [style.selectedStart]: date === startDate,
  //       [style.selectedEnd]: date === endDate
  //     }),
  //     disabled: disabled,
  //     day: day,
  //     date
  //   })
  //   // monthData.push(++j)
  // }
  //把每一个月的显示数据以7天为一组等分
  monthData.forEach((day, index)=> {
    if (index % 7 === 0) {
      rowsInMonth.push(monthData.slice(index, index + 7))
    }
  })

  const handleMouseEnter = (date, disabled) => {
    if(disabled) return
    // .log(date, "date");
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
  }
  // 判断后一个日期是否比前一个日期大
  const isEndDateMax = (start, end) => {
    let unix1 = moment(start).unix(),
        unix2 = moment(end).unix();
    return unix1 <= unix2
  }
  const handleClick = (date, disabled) => {
    if(disabled) return
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
                        onMouseEnter={() => handleMouseEnter(item.date, item.disabled)}
                        onClick={() => handleClick(item.date, item.disabled)}
                      >
                        <div className={style.calendarDate}>
                          {item.day}
                          <div>{item.amount}</div>
                        </div>
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
