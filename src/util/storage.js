export default {
  getLoginUserMenus () {
    return localStorage.getItem('menuCode') || []
  },
  getToken () {
    return localStorage.getItem('token') || ''
  },
  removeToken () {
    localStorage.removeItem('token')
  }
}
