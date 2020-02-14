/**
 * 日期格式化 yyyy-MM-dd HH:mm:ss
 * @param date
 * @returns {*}
 */
export function formatDate (date, pattern = 'yyyy-MM-dd HH:mm:ss') {
  if (!date) return
  switch (typeof date) {
    case 'string':
      date = new Date(date.replace(/-/, '/'))
      break
    case 'number':
      date = new Date(date)
      break
  }
  if (!(date instanceof Date)) return
  let dict = {
    'yyyy': date.getFullYear(),
    'M': date.getMonth() + 1,
    'd': date.getDate(),
    'H': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds(),
    'MM': ('' + (date.getMonth() + 101)).substr(1),
    'dd': ('' + (date.getDate() + 100)).substr(1),
    'HH': ('' + (date.getHours() + 100)).substr(1),
    'mm': ('' + (date.getMinutes() + 100)).substr(1),
    'ss': ('' + (date.getSeconds() + 100)).substr(1)
  }
  return pattern.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
    return dict[arguments[0]]
  })
}
// 获取N天后的日期
export function getNdayDate (startDay, days) {
  var d = startDay
  var year = d.getFullYear()
  var mon = d.getMonth() + 1
  var day = d.getDate()
  if (day <= days) {
    if (mon > 1) {
      mon = mon - 1
    } else {
      year = year - 1
      mon = 12
    }
  }
  d.setDate(d.getDate() + days)
  year = d.getFullYear()
  mon = d.getMonth() + 1
  day = d.getDate()
  return year + '/' + (mon < 10 ? ('0' + mon) : mon) + '/' + (day < 10 ? ('0' + day) : day)
}
/**
 * 金额格式化
 * @param value 要格式化的数字
 * @param currency 货币前缀 默认''
 * @param  decimals 保留几位小数 默认2
 * @param  unit 单位 默认''
 * @returns {string}
 */
const digitsRE = /(\d{3})(?=\d)/g
export function formatCurrency (value, decimals = 2, currency = '', unit = '') {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  var i = _int.length % 3
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  var _float = decimals ? stringified.slice(-1 - decimals) : ''
  var sign = value < 0 ? '-' : ''
  return (
    sign +
    currency +
    head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float +
    unit
  )
}
