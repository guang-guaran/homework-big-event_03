jQuery(function () {
  // 1. 获取用户信息，渲染头
  getUserInfo()

  // 2. 退出操作
  $('.logout').on('click', function () {
    layer.confirm('确认退出登录吗？', {
      icon: 3,
      title: '提示'
    }, function (index) {
      //do something
      // 移除 token 
      layer.msg('退出成功!')
      localStorage.removeItem('token')
      // 跳转到登录页面
      setTimeout(() => {
        location.href = '/login.html'
      }, 1000);
      layer.close(index);
    });
  })

})

function getUserInfo() {
  axios({
    url: '/my/userinfo',
  }).then(({
    data: res
  }) => {
    // console.log(res)
    if (res.status !== 0) {
      return layer.msg(res.message)
    }
    // 封装渲染头像的函数
    renderAvatar(res.data)
  })
}

function renderAvatar(user) {
  let name = user.nickname || user.username
  $('.welcome').html('欢迎 ' + name)

  if (user.user_pic) {
    $('.layui-nav-img').show().prop('src', user.user_pic)
    $('.avatar-text').hide()
  } else {
    $('.layui-nav-img').hide()
    $('.avatar-text').show().html(name[0].toUpperCase())
  }
}