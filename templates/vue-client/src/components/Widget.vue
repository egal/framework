<!--<template>-->
<!--  <div>-->
<!--    <component :is="component" :data="data" />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'Widget',-->
<!--  props: {-->
<!--    type: {-->
<!--      type: String,-->
<!--      required: true,-->
<!--    },-->
<!--    data: {-->
<!--      default: '',-->
<!--    },-->
<!--  },-->
<!--  computed: {-->
<!--    component() {-->
<!--      if (this.type === 'Input') {-->
<!--        return () => import(`./Truck`)-->
<!--      } else if (this.type === 'RATE' || this.type === 'FLOAT') {-->
<!--        return () => import(`./RealRate`)-->
<!--      }-->
<!--      return () => import(`./TextGroup`)-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="scss"></style>-->
