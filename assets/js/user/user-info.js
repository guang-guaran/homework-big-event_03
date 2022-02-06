jQuery(function () {
  // 1. 表单验证
  form.verify({
    nickname: [
      /^[\S]{1,10}$/,
      '昵称的长度为1-10的非空字符串'
    ]
  })

  // 2. 获取用户信息 封装函数后面会用
  initUserInfo()

  function initUserInfo() {
    axios({
      url: '/my/userinfo',
    }).then(({
      data: res
    }) => {
      // console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      // 表单赋值 有什么赋值什么，只有用户名
      form.val('userInfoForm', res.data);
    })
  }
  // 3. 重置按钮重新渲染
  $('#resetBtn').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })

  // 4. 修改用户信息
  $('form').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/my/userinfo',
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
      window.parent.getUserInfo()
    })
  })

})