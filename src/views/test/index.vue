<template>
    <div>
      <h2>测试页面 {{ msg }}</h2>
    </div>
</template>

<script>
export default {
  name: 'TextIndex',
  data() {
    return {
      msg: ''
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      console.log('test')
    }
  }
}
</script>

<style scoped>

</style>
