<template>
  <div>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="alertName">点击弹出姓名</button>
  </div>
</template>

<script>
export default {
    name: 'Student',
  data() {
    return {
      name: "Leah",
      age: 23,
    };
  },
  methods: {
    alertName() {
      alert(this.name);
    },
  },
};
</script>