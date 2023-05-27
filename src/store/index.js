//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {
    //执行共享值变化
    changeUserName(state, value) {
        state.username = value
    },
    changeInputMsg(state, value) {
        state.inputMsg = value
    },
    changeIsHave(state, value) {
        state.isHave = value
    },
    changeIsLog(state, value) {
        state.isLog = value
    },
    changeUserMsg(state, value) {
        state.userMsg = value
    },
    changeIndex(state, value) {
        state.index = value
    },
}
//准备state对象——保存具体的数据
const state = {
    username: '',
    inputMsg: [],
    isHave: false,
    isLog: false,
    userMsg: [],
    index: 1
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})