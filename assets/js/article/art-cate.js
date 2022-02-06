jQuery(function () {
  // 1. 初始化文章列表
  initArticleList()

  function initArticleList() {
    axios({
      url: '/my/article/cates',
      // method: 'GET',
      // params: {}
    }).then(({
      data: res
    }) => {
      // console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      let htmlArr = []
      res.data.forEach(item => {
        // console.log(item)
        htmlArr.push(`
          <tr>
            <td>${item.Id}</td>
            <td>${item.name}</td>
            <td>${item.alias}</td>
            <td>
              <button data-id="${item.Id}" type="button" class="editArtCate layui-btn layui-btn-xs">修改</button>
              <button data-id="${item.Id}" type="button" class="delArtCate layui-btn layui-btn-xs layui-btn-danger">删除</button>
            </td>
          </tr>
        `)
      })
      $('tbody').empty().html(htmlArr.join(''))
    })
  }

  // 2. 点击添加分类 弹出form表单
  let indexAdd = ''
  $('#addCate').on('click', function () {
    indexAdd = layer.open({
      title: '添加文章分类',
      type: 1,
      area: ['500px', '260px'],
      content: `
        <form id="addForm" class="layui-form" action="">
          <!-- 1. 分类名称 -->
          <div class="layui-form-item">
            <label class="layui-form-label">分类名称</label>
            <div class="layui-input-block">
              <input type="text" name="name" required lay-verify="required" placeholder="请输入分类名称" autocomplete="off"
                class="layui-input">
            </div>
          </div>
          <!-- 2. 分类别名 -->
          <div class="layui-form-item">
            <label class="layui-form-label">分类别名</label>
            <div class="layui-input-block">
              <input type="text" name="alias" required lay-verify="required" placeholder="请输入分类别名" autocomplete="off"
                class="layui-input">
            </div>
          </div>
          <!-- 3. 按钮 -->
          <div class="layui-form-item">
            <div class="layui-input-block">
              <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
              <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
          </div>
        </form>
      `
    });
  })

  // 3. 添加分类发送ajax请求 渲染到页面
  $('body').on('submit', '#addForm', function (e) {
    e.preventDefault()
    axios({
      url: '/my/article/addcates',
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
      // 渲染到页面
      initArticleList()
      // 关闭弹出框
      layer.close(indexAdd)
    })
  })

  // 4. 删除分类列表
  $('tbody').on('click', '.delArtCate', function () {
    let id = this.dataset.id
    layer.confirm('确认删除吗?', {
      icon: 3,
      title: '提示'
    }, function (index) {
      axios({
        url: '/my/article/deletecate/' + id,
      }).then(({
        data: res
      }) => {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        initArticleList()
      })
      // 重新渲染到页面
      layer.close(index);
    });

  })

  // 5. 修改分类列表
  let indexEdit = ''
  $('tbody').on('click', '.editArtCate', function () {
    indexEdit = layer.open({
      title: '修改文章分类',
      type: 1,
      area: ['500px', '260px'],
      content: `
        <form id="editForm" lay-filter="editForm" class="layui-form" action="">
          <!-- 0. 隐藏域获取Id 用于修改文章列表-->
          <input type="hidden" name="Id">
          <!-- 1. 分类名称 -->
          <div class="layui-form-item">
            <label class="layui-form-label">分类名称</label>
            <div class="layui-input-block">
              <input type="text" name="name" required lay-verify="required" placeholder="请输入分类名称" autocomplete="off"
                class="layui-input">
            </div>
          </div>
          <!-- 2. 分类别名 -->
          <div class="layui-form-item">
            <label class="layui-form-label">分类别名</label>
            <div class="layui-input-block">
              <input type="text" name="alias" required lay-verify="required" placeholder="请输入分类别名" autocomplete="off"
                class="layui-input">
            </div>
          </div>
          <!-- 3. 按钮 -->
          <div class="layui-form-item">
            <div class="layui-input-block">
              <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
              <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
          </div>
        </form>
      `
    });
    let id = this.dataset.id
    axios({
      url: '/my/article/cates/' + id,
    }).then(({
      data: res
    }) => {
      // console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      form.val('editForm', res.data)
    })
  })

  // 6. 修改文章分类
  $('body').on('submit', '#editForm', function (e) {
    e.preventDefault()
    axios({
      url: '/my/article/updatecate',
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
      // 渲染到页面
      initArticleList()
      // 关闭弹出框
      layer.close(indexEdit)
    })
  })
})