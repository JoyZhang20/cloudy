<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  },
  methods: {},
};
</script>

<style>
html,
body,
#app {
   margin: 0px;
   padding: 0px;
  height: 90%;
  background-color: #92baff;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
