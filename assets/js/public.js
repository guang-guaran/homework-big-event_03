// 导入form
let form = layui.form
// 导入layer
let layer = layui.layer

// 配置全局路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3007'

// 设置请求拦截器 每次请求都需要这是请求头
axios.interceptors.request.use(function (config) {
  // console.log(config)
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

// 设置响应拦截器 禁止用户强制跳转
axios.interceptors.response.use(function (response) {
  // console.log(response)
  if (response.data.message == '身份认证失败！') {
    // 移除 token 
    localStorage.removeItem('token')
    // 跳转到登录页面
    setTimeout(() => {
      window.parent.location.href = '/login.html'
    }, 1000);
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

// 格式化日期
function formatDate(time) {
  let dt = new Date(time)
  let Y = dt.getFullYear()
  let M = zeroize(dt.getMonth() + 1)
  let D = zeroize(dt.getDate())

  let h = zeroize(dt.getHours())
  let m = zeroize(dt.getMinutes())
  let s = zeroize(dt.getSeconds())
  return `${Y}-${M}-${D}  ${h}:${m}:${s}`
}

function zeroize(n) {
  return n < 10 ? '0' + n : n
}