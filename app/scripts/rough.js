import Vue from 'vue/dist/vue'

let app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
		oskar: 'it works',
		todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
})

window.freedomtv = app

export default app

