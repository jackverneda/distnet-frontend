<template>
  <Register />
</template>

<script setup lang="ts">
import Register from '~/components/auth/Register.vue'
definePageMeta({
  // middleware: ['auth'],
  layout: 'auth',
  // auth: {
  //   unauthenticatedOnly: true,
  //   navigateAuthenticatedTo: '/',
  // },
})
</script>
