<template>
  <div>
    <h2>Todo application</h2>
    <router-link to="/">Home</router-link>
    <AddTodo
      @add-todo="addTodo"
    />
    <TodoList
      v-bind:todos="todos"
      @remove-todo="removeTodo"
    />

  </div>
</template>

<script>
import TodoList from '@/components/TodoList'
import AddTodo from '@/components/AddTodo'

export default {
  name: 'app',
  data () {
    return {
      todos: [
        // { id: 1, title: 'buy bread', completed: false },
        // { id: 2, title: 'buy beer', completed: false },
        // { id: 3, title: 'buy bike', completed: false }
      ]
    }
  },
  components: {
    // HelloWorld
    TodoList,
    AddTodo
  },
  mounted () {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
      .then(response => response.json())
      .then(json => {
        this.todos = json
      })
  },
  methods: {
    removeTodo (id) {
      this.todos = this.todos.filter(t => t.id !== id)
    },
    addTodo (todo) {
      this.todos.push(todo)
    }
  }
}
</script>
