jQuery(function () {
  // 1.1 初始化文章分类列表
  initArtCateList()

  function initArtCateList() {
    axios({
      url: '/my/article/cates',
    }).then(({
      data: res
    }) => {
      // console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      let htmlArr = ['<option value="">请选择文章类别</option>']
      res.data.forEach(item => {
        // console.log(item)
        htmlArr.push(`
          <option value="${item.Id}">${item.name}</option>
        `)
      })
      $('[name="cate_id"]').empty().html(htmlArr.join(''))
      // form.render() 可以渲染 select/checkbox/radio
      form.render()
    })
  }

  // 1.2 初始化富文本编辑器
  initEditor()

  // 2.1 获取裁剪区域的 DOM 元素
  let $image = $('#image')
  // 2.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }
  // 2.3 创建裁剪区域
  $image.cropper(options)

  // 3.1 获取cover_img参数
  $('#imgBtn').on('click', function () {
    $('#imgFile').click()
  })
  $('#imgFile').on('change', function (e) {
    let file = e.target.files[0]
    if (!file) {
      return layer.msg('文章封面不能为空！')
    }

    let newImgURL = URL.createObjectURL(file)
    // 2. 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 3.2 获取state 状态
  let state = ''
  $('#btn1').on('click', function () {
    state = '已发布'
  })
  $('#btn2').on('click', function () {
    state = '草稿'
  })

  // 3. 发布文章
  $('#pubForm').on('submit', function (e) {
    e.preventDefault()
    // 发送ajax请求需要的参数比较多 创建formData对象
    let fd = new FormData(this)
    fd.append('state', state)


    $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 400,
      height: 280
    }).toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      fd.append('cover_img', blob)

      axios({
        url: '/my/article/add',
        method: 'POST',
        data: fd
      }).then(({
        data: res
      }) => {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        setTimeout(() => {
          window.parent.document.querySelector('#art-list').click()
        }, 2000);
      })
    });


  })

})