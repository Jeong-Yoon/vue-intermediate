<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" 
      v-on:removeItem="removeOneItem" 
      v-on:toggleItem="toggleOneItem"></TodoList>
    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

// var my_cmp = {
//   template:'<div>my component</div>'
// };

// new Vue({
//   el: '',
//   components: {
//     // '컴포넌트 이름': '컴포넌트 내용'
//     'my-cmp': my_cmp
//   }
// });

export default {
  data: function() {
    return {
      todoItems: []
    }
  },
  methods: {
    addOneItem: function(todoItem) {
      const obj = {completed: false, item: todoItem}; // const는 오버라이딩이 불가능하기 때문에 디버깅에 도움이 되어 안전한 프로그래밍 가능
      // console.log(this.newTodoItem);
      // 저장하는 로직
      // localStorage.setItem(this.newTodoItem, this.newTodoItem);
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem: function(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem: function(todoItem, index) {
      // todoItem.completed = !todoItem.completed;
      // props를 내리기 위해 event bus를 넘기고, 컴포넌트 사이의 경계를 명확히 함
      this.todoItems[index].completed = !this.todoItems[index].completed;
      // 로컬 스토리지에 데이터를 갱신
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems: function() {
      localStorage.clear();
      this.todoItems = [];
    }
  },
  created: function() { // 인스턴스가 생성되자마자 호출되는 라이프사이클 훅(생성되는 시점에 로직이 실행)
    // console.log('created');
    if(localStorage.length > 0) {
      for(let i = 0; i < localStorage.length; i++) { // 반복문은 값이 계속 증가해야 하기 때문에 let
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          // this.todoItems.push(localStorage.key(i));
        }
        // console.log(localStorage.key(i));
      }
    }
  },
  components: {
    // 컴포넌트 태그명: 컴포넌트 내용
    'TodoHeader': TodoHeader, 
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter,
  }
}
</script>

<style>
  body {
    text-align: center;
    background-color: #F6F6F6;
  }

  input {
    border-style: groove;
    width: 200px;
  }

  button {
    border-style: groove;
  }
  
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
  }
</style>
