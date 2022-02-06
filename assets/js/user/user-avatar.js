jQuery(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }
  // 1.3 创建裁剪区域
  $image.cropper(options)


  // 2. 上传头像
  // 2.1 点击按钮触发选择文件
  $('#upalodBtn').on('click', function () {
    $('#uploadFile').click()
  })

  // 2.2 file文件表单的change事件
  $('#uploadFile').on('change', function () {
    let file = this.files[0]

    let newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 2.3 上传头像 渲染到页面
  $('#confirmBtn').on('click', function () {
    let dataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    axios({
      url: '/my/update/avatar',
      method: 'POST',
      data: 'avatar=' + encodeURIComponent(dataURL)
    }).then(({
      data: res
    }) => {
      // console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg(res.message)

      // 渲染到页面
      window.parent.getUserInfo()
    })
  })
})