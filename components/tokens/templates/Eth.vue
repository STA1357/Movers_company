<template>
  <div class="eth">
    <Eth :options="value" v-model="value"></Eth>
    {{value}}
  </div>
</template>

<script>
import Eth from '../template'

export default {
  components: {
    Eth
  },
  data() {
    return {
      options: {

      },
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>