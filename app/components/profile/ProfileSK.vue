<template>
  <div class="max-w-4xl mx-auto">
    <ProfileHeaderSK />
    <div class="mt-8">
      <PostSK v-for="i in 3" :key="i" />
    </div>
  </div>
</template>

<script setup>
import ProfileHeaderSK from './ProfileHeaderSK.vue'
import PostSK from '../Post/PostSK.vue'
</script>
