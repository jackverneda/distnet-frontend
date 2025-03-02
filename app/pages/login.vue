<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 text-center mb-6">
      Welcome Back
    </h1>

    <UForm :state="form" class="space-y-6 flex flex-col" @submit="handleLogin">
      <UFormGroup label="Email" name="email" required>
        <UInput
          v-model="form.email"
          class="w-full"
          type="email"
          placeholder="your@email.com"
          icon="i-heroicons-envelope"
        />
      </UFormGroup>

      <UFormGroup label="Password" name="password" required>
        <UInput
          v-model="form.password"
          class="w-full"
          type="password"
          placeholder="••••••••"
          icon="i-heroicons-lock-closed"
        />
      </UFormGroup>

      <UButton
        type="submit"
        color="primary"
        size="lg"
        block
        class="mt-8"
        :loading="loading"
      >
        Sign In
      </UButton>

      <div v-if="error" class="text-red-500 text-sm text-center">
        {{ error }}
      </div>
    </UForm>
    <div class="mt-8 text-center">
      <span class="text-gray-600">New here? </span>
      <NuxtLink
        to="/register"
        class="text-primary-600 hover:text-primary-800 font-semibold"
      >
        Create an account
      </NuxtLink>
    </div>

    <!-- <template #footer>
      <div class="text-center text-sm text-gray-600">
        Don't have an account?
        <NuxtLink to="/register" class="text-primary-500 hover:underline">
          Sign up
        </NuxtLink>
      </div>
    </template> -->
  </div>
</template>

<script setup>
const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref('')

async function handleLogin() {
  try {
    loading.value = true
    error.value = ''
    await userStore.login(form.email, form.password)
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}

// Redirect if already logged in
definePageMeta({
  middleware: ['auth'],
  layout: 'auth',
  // auth: {
  //   unauthenticatedOnly: true,
  //   navigateAuthenticatedTo: '/',
  // },
})
</script>
