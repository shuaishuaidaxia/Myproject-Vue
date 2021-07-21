import axios from 'axios'
import { VueAxios } from './axios'

// 创建axios实例对象
const request = axios.create({
  baseURL: 'http://localhost:8088', // 请求服务器地址暂时无
  timeout: 5000
})
/* //请求拦截器 在请求发出时做出的响应
instance.interceptors.request.use(config=>{
    //此处编写拦截的代码 一半用弹窗
    alert("正在请求")
    return config
}),err=>{
    alert("请求失败"+err)
}
//响应拦截器
instance.interceptors.request.use(res=>{
    //此处编写拦截的代码 一半用弹窗
    return res //该返回对象会传到请求方法的响应对象中
}),err=>{
    alert("请求失败"+err)
}

//封装axios请求方法，参数为配置对象
//option = {method,url,params} method为请求方法，url为请求接口，params为请求参数

async function  request(option={}){
    console.log(option)
    console.log("这里是api-request")
    console.log(option.url+"查看传过来的是什么")
    let result = null
    if (option.method ==='get' || option.method === 'delete')
    {//处理get和delete请求
        await instance[option.method](
            api[option.url],
            {
                params: option.params
            }
        ).then(res => {
            result=res.data
        }).catch(err => {
            result =err
        })
    }else if (option.method === 'post' || option.method === 'put'){
        //处理post put请求
        await instance[option.method](
            api[option.url],
            option.params
        ).then(res=>{
            result = res.data
        }).catch(err=>{
            result = err
        })
    }
    return result
}
export default request */

// 异常拦截处理器
const erroHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    console.log(data)
  }
  return Promise.reject(error)
}
// 请求拦截器
request.interceptors.request.use(config => {
  console.log('发出请求')
  console.log(config)
  return config
}, erroHandler)

// 响应请求
request.interceptors.response.use((response) => {
  console.log('响应请求')
  console.log(response.data)
  return response.data
}, erroHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
