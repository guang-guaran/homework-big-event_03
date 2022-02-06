jQuery(function () {
  // 1. 表单验证
  form.verify({
    pwd: [
      /^[\S]{6,15}$/,
      '密码的必须是6-15位的非空字符'
    ],
    oldPwd: function (value) {
      let v1 = $('[name="oldPwd"]').val()
      if (v1 == value) {
        return '新旧密码不能相同！'
      }
    },
    regPwd: function (value) {
      let v2 = $('[name="newPwd"]').val()
      if (v2 !== value) {
        return '两次新密码不一致！'
      }
    }
  })

  // 2. 修改密码发送ajax请求
  $('#pwdForm').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/my/updatepwd',
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

      // 清空表单
      $('#pwdForm')[0].reset()
      // 移除 token 
      localStorage.removeItem('token')
      // 跳转到登录页面
      setTimeout(() => {
        window.parent.location.href = '/login.html'
      }, 1000);


    })
  })

})