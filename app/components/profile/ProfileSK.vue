<template>
  <div class="max-w-4xl mx-auto">
    <ProfileHeaderSkeleton />
    <div class="mt-8">
      <PostSkeleton v-for="i in 3" :key="i" />
    </div>
  </div>
</template>

<script setup>
import ProfileHeaderSkeleton from './ProfileHeaderSkeleton.vue'
import PostSkeleton from './PostSkeleton.vue'
</script>
