<template>
  <div class="inputBox shadow">
    <!-- v-model: input box에 입력된 text 값을 동적으로 vue instance에 맵핑하는 역할 -->
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
    <span class="addContainer" v-on:click="addTodo">
        <i class="fas fa-plus addBtn"></i>
    </span>
    <!-- use the modal component, pass in the prop -->
    <Modal v-if="showModal" @close="showModal = false">
        <!--
            you can use custom content here to overwrite
            default content
        -->
        <!--
            slot은 vue의 특별한 기능
            이미 정의된 UI 표현 부분 script, css, html tag 등은 slot을 통해서 특정 부분들을 재정의 할 수 있다.
            slot은 특정 컴포넌트의 UI를 재사용할 수 있는 기능
        -->
        <h3 slot="header">
            경고
            <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
            <!-- v-on:click == @click 같은 의미, 축약형 $emit('close') -->
        </h3>

        <div slot="body">
            입력된 값이 없습니다.
        </div>

        <!-- <h5 slot="footer">
            copy right
        </h5> -->
    </Modal>
  </div>
</template>

<script>
import Modal from './common/Modal.vue';

export default {
    data() {
        return {
            newTodoItem: "",
            showModal: false
        }
    },
    methods: {
        addTodo() {
            if(this.newTodoItem !== '') {
                this.$store.commit('addOneItem', this.newTodoItem);
                this.clearInput();
            } else {
                this.showModal = !this.showModal;
                console.log(this.showModal);
            }
        },
        clearInput() {
            this.newTodoItem = '';
        }
    },
    components: {
        Modal
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
    .closeModalBtn {
        color: #42b983;
    }
</style>