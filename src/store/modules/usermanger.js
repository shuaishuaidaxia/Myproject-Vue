import { login, getuserinfo, adduser, updateuser, deleteuser } from '../../http/api'
import Vue from 'vue'
const usermanger = {
  state: {
    userlist: []
  },
  mutations: {
    SET_USERLIST: (state, userlist) => {
      state.userlist = null
      state.userlist = userlist
      console.log(state.userlist)
      console.log('<srorelist')
    },
    ADD_USER: (state, userinfo) => {
      console.log(userinfo + 'userinfo')
      /* state.userlist.unshift(userinfo) */
    },
    UPDATE_USER (state, userinfo) {
      const datalist = [...state.userlist]
      const target = datalist.find(item => item.id === userinfo.id)
      if (target) {
        target.name = userinfo.name
        target.password = userinfo.password
        state.userlist = datalist
      }
    },
    DELETE_USER (state, paramter) {
      console.log(paramter.userId, '删除id')
      const datalist = [...state.userlist]
      state.userlist = datalist.filter(item => item.id != paramter.userId)
    }

  },
  getters: {
    getuserlist: state => state.userlist
  },
  actions: {
  // 获取分页用户信息
    Getuserlist ({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        getuserinfo(parameter).then(response => {
          const datalist = JSON.stringify(response)
          const data = JSON.parse(datalist)
          commit('SET_USERLIST', data.list)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    AddUser ({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        adduser(parameter).then(response => {
          const data = JSON.parse(JSON.stringify(response))
          commit('ADD_USER', data.data)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    UpdataUser ({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        updateuser(parameter).then(response => {
          const data = JSON.parse(JSON.stringify(response))
          commit('UPDATE_USER', data.data)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    DeleteUser ({ commit }, paramter) {
      return new Promise((resolve, reject) => {
        deleteuser(paramter).then(response => {
          const data = JSON.parse(JSON.stringify(response))
          commit('DELETE_USER', paramter)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
export default usermanger
