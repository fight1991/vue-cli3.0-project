export default {
  getLoginUserMenus () {
    return localStorage.getItem('menuCode') || []
  },
  removeToken () {
    localStorage.removeItem('token')
  },
  setToken (token) {
    localStorage.setItem('token', token)
  },
  getToken () {
    return localStorage.getItem('token') || ''
  },
  removeLoginInfo () {
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('phone')
  },
  setUserInfo (userInfo) {
    userInfo.name && localStorage.setItem('username', userInfo.name)
    userInfo.email && localStorage.setItem('email', userInfo.email)
    userInfo.phone && localStorage.setItem('phone', userInfo.phone)
  },
  getUserInfo (item) {
    return localStorage.getItem(item) || ''
  }
}
