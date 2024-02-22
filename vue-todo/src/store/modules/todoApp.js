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

const state = {
    todoItems: storage.fetch()
}

const getters = {
    storedTodoItems(state) {
        return state.todoItems;
    }
}

const mutations = {
    addOneItem(state, todoItem) {
        const obj = {completed: false, item: todoItem}; // const는 오버라이딩이 불가능하기 때문에 디버깅에 도움이 되어 안전한 프로그래밍 가능
        // 저장하는 로직
        localStorage.setItem(todoItem, JSON.stringify(obj));
        state.todoItems.push(obj);
    },
    removeOneItem(state, payload) {
        localStorage.removeItem(payload.todoItem.item);
        state.todoItems.splice(payload.index, 1);
    },
    toggleOneItem(state, payload) {
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

export default {
    state,
    getters,
    mutations
}