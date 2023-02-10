<template>
  <div>
    <h2>学校：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
    name: 'School',
  data() {
    return {
      name: "B站大学",
      address: "哔哩哔哩网站",
    };
  },
};
</script>

<style >
/* 组件的样式 */
</style>