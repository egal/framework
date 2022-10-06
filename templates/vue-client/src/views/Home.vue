<template>
  <div class="home">
    <UserProfile></UserProfile>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserProfile from '@/components/UserProfile.vue'
export default defineComponent({
  name: 'Home',
  components: { UserProfile },
})
</script>
