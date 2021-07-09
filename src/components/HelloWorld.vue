<template>
  <div class="hello">
      我是小可爱
         <router-link :to="{ path: '/cute'}" replace @click="clickIt">点我啊,傻</router-link>
  </div>
</template>

<script>
import Good from './good'
export default {

  name: 'HelloWorld',
  components: { Good },
  data: function () {
    return { }
  },
  methods:{
    clickIt:function (){
      console.log("aaa")
      window.location.href="/cute"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
