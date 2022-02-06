jQuery(function () {
  let q = {
    pagenum: 1, //是	int	页码值
    pagesize: 20, //是	int	每页显示多少条数据
    cate_id: '', //否	string	文章分类的 Id
    state: '' //否	string	文章的状态，可选值有：已发布、草稿
  }

  // 1. 调用初始化文章列表
  initArticleList()

  function initArticleList() {
    axios({
      url: '/my/article/list',
      method: 'GET',
      params: q
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
            <td>${item.title}</td>
            <td>${item.cate_name}</td>
            <td>${formatDate(item.pub_date)}</td>
            <td>${item.state}</td>
            <td>
              <button class="layui-btn layui-btn-xs">编辑</button>
              <button data-id="${item.Id}" class="del-btn layui-btn layui-btn-xs layui-btn-danger">删除</button>
            </td>
          </tr>
        `)
      })
      // $('tbody').empty().html(htmlArr.join(''))
      $('tbody').empty().html(htmlArr.join(''))
      renderPage(res.total)
    })
  }

  //  2.初始化文章分类列表
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

  // 3. 筛选
  $('#filterForm').on('submit', function (e) {
    e.preventDefault()
    q.cate_id = $('[name="cate_id"]').val()
    q.state = $('[name="state"]').val()
    // 重新初始化文章列表 渲染页面
    initArticleList()
  })

  // 4. 分页
  function renderPage(total) {
    let laypage = layui.laypage;
    //执行一个laypage实例
    laypage.render({
      elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到z
      limit: q.pagesize,
      curr: q.pagenum,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'refresh', 'skip'],
      limits: [2, 3, 5, 10],
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数

        //首次不执行
        if (!first) {
          //do something
          // q.pagenum = obj.curr
          // q.pagesize = obj.limit
          // 重新初始化文章列表 渲染页面
          initArticleList()
        }
      }
    })
  }

  // 5. 删除分类
  $('tbody').on('click', '.del-btn', function () {
    let id = this.dataset.id
    layer.confirm('确认删除吗?', {
      icon: 3,
      title: '提示'
    }, function (index) {
      axios({
        url: '/my/article/delete/' + id,
      }).then(({
        data: res
      }) => {
        console.log(res)
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        // 重新渲染到页面
        initArticleList()
      })
      layer.close(index);
    });
  })
})