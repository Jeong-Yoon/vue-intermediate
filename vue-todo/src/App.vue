<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <!-- <TodoInput v-on:addTodoItem="addOneItem"></TodoInput> -->
    <!-- <TodoList v-bind:propsdata="todoItems" 
      v-on:removeItem="removeOneItem" // event 발생을 시키지도 않고 인자들도 store로 바로 보내기 때문에 불필요
      v-on:toggleItem="toggleOneItem"></TodoList> -->
    <!-- <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter> -->
    <TodoInput></TodoInput>
    <TodoList></TodoList>
    <TodoFooter></TodoFooter>
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
  // data() { // data: function() {
  //   return {
  //     todoItems: []
  //   }
  // },
  methods: {
    // mutations를 사용하면서 methods에 있는 함수들이 다 이동됨.
    // event 발생을 시키지도 않고 인자들도 store로 바로 보내기 때문에 불필요
  },
  // created() { // 인스턴스가 생성되자마자 호출되는 라이프사이클 훅(생성되는 시점에 로직이 실행)
  //   // console.log('created');
  //   if(localStorage.length > 0) {
  //     for(let i = 0; i < localStorage.length; i++) { // 반복문은 값이 계속 증가해야 하기 때문에 let
  //       if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
  //         this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  //         // this.todoItems.push(localStorage.key(i));
  //       }
  //       // console.log(localStorage.key(i));
  //     }
  //   }
  // },
  components: {
    // 컴포넌트 태그명: 컴포넌트 내용
    TodoHeader, // 'TodoHeader': TodoHeader, 객체의 속성명과 값 명이 동일할 때 축약이 가능하다.
    TodoInput,
    TodoList,
    TodoFooter,
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
