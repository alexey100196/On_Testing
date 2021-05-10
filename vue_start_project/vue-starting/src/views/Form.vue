<template>
  <div>
    <h2>Constants form</h2>
    <router-link to="/">Home</router-link>
    <form @submit.prevent="onSubmit">
      <div class="constant" v-for="(item, index) in items" :key="index">
        <span> {{ item.name }} </span>
        <input
          type="text"
          v-model="item.value">
      </div>
      <button type="submit">submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      name: '',
      items: [
        {
          name: 'name',
          value: 'value'
        },
        {
          name: 'name',
          value: 'value'
        },
        {
          name: 'name',
          value: 'value'
        }
      ]
    }
  },
  mounted () {
    axios
      .get('/constants')
      .then(response => (this.name = response.data.name))
  }
  // methods: {
  //   onSubmit (value) {
  //     axios
  //       .put(`/constants/${value}`)
  //       .then(response => (this.items = response))
  //   }
  // }
}
</script>

<style scoped>
form {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 2em;
}

.constant {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}

.constant input {
  display: flex;
  justify-content: space-between;
}
</style>
