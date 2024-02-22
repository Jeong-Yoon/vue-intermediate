<template>
  <div>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in this.storedTodoItems" v-bind:key="todoItem.item" class="shadow">
        <!-- v-bind:class="{class명: 조건}" : 조건이 true면 해당 class가 적용 -->
        <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" v-on:click="toggleComplete({todoItem, index})"></i>
        <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
        <span class="removeBtn" v-on:click="removeTodo({todoItem, index})">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations({
      removeTodo: 'removeOneItem', // map이 들어가는 helper 함수들은 인자를 선언하지 않아도 호출하는 곳에서 인자가 있으면 그걸 그대로 들고가서 넘기기 때문에 선언 불필요
      toggleComplete: 'toggleOneItem'
    })
  },
  computed: {
    ...mapGetters(['storedTodoItems'])
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

 /* 리스트 아이템 transition 효과 */
 .list-enter-active, .list-leave-active {
  transition: all 1s;
 }
 .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
 }
</style>