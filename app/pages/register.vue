<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 text-center mb-6">
      Join DistNet
    </h1>

    <UForm
      :state="form"
      class="space-y-4 flex flex-col justify-stretch"
      @submit="handleRegister"
    >
      <UFormGroup label="Username" name="username" required>
        <UInput
          v-model="form.username"
          class="w-full"
          placeholder="johndoe123"
          icon="i-heroicons-user"
        />
      </UFormGroup>

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

      <UFormGroup label="Confirm Password" name="confirmPassword" required>
        <UInput
          v-model="form.confirmPassword"
          class="w-full"
          type="password"
          placeholder="••••••••"
          icon="i-heroicons-lock-closed"
        />
      </UFormGroup>

      <UButton
        type="submit"
        color="primary"
        block
        :loading="loading"
        :disabled="loading"
      >
        Create Account
      </UButton>

      <div v-if="error" class="text-red-500 text-sm text-center">
        {{ error }}
      </div>
    </UForm>

    <div class="mt-8 text-center">
      <span class="text-gray-600">Already have an account? </span>
      <NuxtLink
        to="/login"
        class="text-primary-600 hover:text-primary-800 font-semibold"
      >
        Sign in instead
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  username: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const loading = ref(false)
const error = ref('')

async function handleRegister() {
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    loading.value = true
    error.value = ''
    await userStore.register({
      username: form.username,
      email: form.email,
      password: form.password,
    })
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}

definePageMeta({
  middleware: ['auth'],
  layout: 'auth',
  // auth: {
  //   unauthenticatedOnly: true,
  //   navigateAuthenticatedTo: '/',
  // },
})
</script>
