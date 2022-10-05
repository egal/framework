<template>
  <component :is="layout">
    <template v-slot:content>
      <router-view />
    </template>
  </component>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import variables from '@/assets/variables.scss'
export default defineComponent({
  name: 'App',
  components: {},
  data() {
    return {}
  },
  mounted() {
    this.getRequest()
  },
  methods: {
    getRequest() {
      axios.get('http://localhost/interface-metadata').then((response) => {
        console.log(response)
        this.setCssVariables(response.data.app)
      })
    },
    setCssVariables(vars) {
      let newVars = Object.assign(variables, {
        ...vars.colors,
        font: vars.font,
      })
      console.log(newVars)
    },
  },
  computed: {
    layout: function () {
      return this.$route.meta.layout || 'default-layout'
    },
  },
})
</script>

<style lang="scss">
@import 'src/assets/variables';
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: $open-sans-font;
}
h5 {
  font-size: $h5-font-size;
  font-weight: $h5-font-style;
}
</style>
