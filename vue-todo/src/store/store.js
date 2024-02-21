import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); // use: vue의 plugin, vue를 사용할 때, 전역으로, vue를 사용하는 모든 영역에 특정 기능(global functionality)을 추가하고 싶을 때 사용

// Todo.vue
// this.$store
const storage = {
    fetch() { // 인스턴스가 생성되자마자 호출되는 라이프사이클 훅(생성되는 시점에 로직이 실행)
        const arr = [];
        if(localStorage.length > 0) {
            for(let i = 0; i < localStorage.length; i++) { // 반복문은 값이 계속 증가해야 하기 때문에 let
                if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    },       
}

export const store = new Vuex.Store({ // export const로 선언하는 순간 store라는 변수를 밖에서 사용할 수 있다.
    state: {
        // headerText: 'TODO it!'
        todoItems: storage.fetch()
    },
    mutations: {
        addOneItem(state, todoItem) {
        // addOneItem(todoItem) { // == addOneItem: function(todoItem)
            const obj = {completed: false, item: todoItem}; // const는 오버라이딩이 불가능하기 때문에 디버깅에 도움이 되어 안전한 프로그래밍 가능
            // console.log(this.newTodoItem);
            // 저장하는 로직
            // localStorage.setItem(this.newTodoItem, this.newTodoItem);
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeOneItem(state, payload) {
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.index, 1);
        },
        toggleOneItem(state, payload) {
            // todoItem.completed = !todoItem.completed;
            // props를 내리기 위해 event bus를 넘기고, 컴포넌트 사이의 경계를 명확히 함
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
            // 로컬 스토리지에 데이터를 갱신
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
        },
        clearAllItems(state) {
            localStorage.clear();
            state.todoItems = [];
        }
    }
});