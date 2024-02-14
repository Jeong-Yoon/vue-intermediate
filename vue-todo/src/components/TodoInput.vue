<template>
  <div class="inputBox shadow">
    <!-- v-model: input box에 입력된 text 값을 동적으로 vue instance에 맵핑하는 역할 -->
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
    <!-- <button v-on:click="addTodo">add</button> -->
    <span class="addContainer" v-on:click="addTodo">
        <i class="fas fa-plus addBtn"></i>
    </span>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            newTodoItem: ""
        }
    },
    methods: {
        addTodo: function() {
            if(this.newTodoItem !== '') {
                var obj = {completed: false, item: this.newTodoItem};
                // console.log(this.newTodoItem);
                // 저장하는 로직
                // localStorage.setItem(this.newTodoItem, this.newTodoItem);
                localStorage.setItem(this.newTodoItem, JSON.stringify(obj));
                this.clearInput();
                // this.newTodoItem = '';
            }
        },
        clearInput: function() {
            this.newTodoItem = '';
        }
    }
}
</script>

<style scoped>
    input:focus {
        outline: none;
    }
    .inputBox {
        /* display: flex; */
        background: white;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
    }
    .inputBox input {
        border-style: none;
        font-size: 0.9rem;
        width: calc(100% - 5rem);
    }
    .addContainer {
        float: right;
        background: linear-gradient(to right, #6478F8, #8763FB);
        display: block;
        width: 3rem;
        border-radius: 0 5px 5px 0;
    }
    .addBtn {
        color: white;
        vertical-align: middle;
    }
</style>