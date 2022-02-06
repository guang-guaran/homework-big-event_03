jQuery(function () {
  // 1. 登录注册点击切换
  $('.loginBox a').on('click', function () {
    $('.regBox').show()
    $('.loginBox').hide()
  })
  $('.regBox a').on('click', function () {
    $('.loginBox').show()
    $('.regBox').hide()
  })

  // 2. 表单验证
  form.verify({
    username: [
      /^[a-zA-Z0-9]{1,10}$/,
      '用户名必须是1-10位字母和数字'
    ],
    password: [
      /^[\S]{6,15}$/,
      '密码长度必须是6-15位的非空字符串'
    ],
    regPwd: function (value) {
      let pwd = $('.regBox [name="password"]').val()
      if (value !== pwd) {
        return '两次密码不一致！'
      }
    }
  })

  // 3. ajax请求登录注册
  // 3.1 注册
  $('#regForm').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/api/reguser',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      // console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg(res.message)
      $('.regBox a').click()
    })
  })

  $('#loginForm').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      // console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg(res.message)

      // 储存token
      localStorage.setItem('token', res.token)
      // 跳转到主页
      setTimeout(() => {
        location.href = '/index.html'
      }, 1000);
    })
  })
})