export default {
  getLoginUserMenus () {
    return localStorage.getItem('menuCode') || []
  }
}
