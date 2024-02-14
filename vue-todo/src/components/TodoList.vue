<template>
  <div>
    <ul>
      <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow">
        <!-- v-bind:class="{class명: 조건}" : 조건이 true면 해당 class가 적용 -->
        <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" v-on:click="toggleComplete(todoItem, index)"></i>
        <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
        <!-- <button v-on:click="removeTodo">delete</button> -->
        <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      todoItems: []
    }
  },
  methods: {
    removeTodo: function(todoItem, index) {
      console.log(todoItem, index);
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
    },
    toggleComplete: function(todoItem, index) {
      todoItem.completed = !todoItem.completed;
      // update가 없기 때문에 지우고 다시 저장
      // 로컬 스토리지에 데이터를 갱신
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
      // console.log(todoItem);
    }
  },
  created: function() { // 인스턴스가 생성되자마자 호출되는 라이프사이클 훅(생성되는 시점에 로직이 실행)
    // console.log('created');
    if(localStorage.length > 0) {
      for(var i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          // this.todoItems.push(localStorage.key(i));
        }
        // console.log(localStorage.key(i));
      }
    }
  }
}
</script>

<style scoped>
 ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
 }
 li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
 }
 .removeBtn {
  margin-left: auto;
  color: #de4343;
 }
 .checkBtn {
  line-height: 45px;
  color: #62acde;
   margin-right: 5px;
 }
 .checkBtnCompleted {
  color: #b3adad;
 }
 .textCompleted {
  text-decoration: line-through;
  color: #b3adad;
 }
</style>