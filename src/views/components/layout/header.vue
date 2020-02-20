<template>
  <div class="head-container">
    <div class="logo fl">
      <img :src="logoSrc" alt="vue中国">
      <span>后台管理系统</span>
    </div>
    <div class="login fr">
      <span class="company">vue中国社区</span>
        <el-dropdown
          placement="top-start">
          <span class="user">
            <i class="user-logo el-icon-user-solid"></i>
            <span class="userName">张三</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      <span class="info"><i class="el-icon-message-solid"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout-header',
  data () {
    return {
      logoSrc: require('@/assets/logo.png')
    }
  }
}
</script>

<style lang="less" scoped>
.head-container {
  width: 100%;
  height: 100%;
}
.login, .logo {
  height: 100%;
  display: flex;
  align-items: center;
}
.login {
  color: #fff;
  .el-dropdown {
    color: #fff;
  }
  .el-popper[x-placement^=bottom] .popper__arrow {
    display: none;
  }
  .company {
    padding: 0 5px;
    margin: 0 10px;
  }
  .user-logo {
    padding-right: 5px;
  }
  .info {
    padding: 0 20px;
  }
}
.logo {
  height: 100%;
  img {
    width: 40px;
  }
  span {
    color: #fff;
    margin-left: 20px;
    font-size: 16px;
  }
}
</style>
