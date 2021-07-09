<template>
  <div style="padding: 20px" id="app">
    <div class="panel panel-primary">
      <div class="panel-heading">用户管理</div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.content }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
  name: "hello",
  data() {
    return {
      user: { id: 1, content: "" },
      users: [
        { id: 1, content: "电子信息"},
        { id: 2, content: "计算机科学与技术"},
      ],
    };
  },
  methods: {
  },
  mounted() {
    axios
      .get("http://www.joyzhang.site:8828/searchAllClipBoard")
      .then((response) => (this.users = response.data))
      .catch(function (error) {
        // 请求失败处理
        console.log("连接失败！！！");
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
tr,
th {
  text-align: center;
}
</style>
