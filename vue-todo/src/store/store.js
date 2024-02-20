import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); // use: vue의 plugin, vue를 사용할 때, 전역으로, vue를 사용하는 모든 영역에 특정 기능(global functionality)을 추가하고 싶을 때 사용

// Todo.vue
// this.$store

export const store = new Vuex.Store({ // export const로 선언하는 순간 store라는 변수를 밖에서 사용할 수 있다.

});