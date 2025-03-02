<template>
  <div class="max-w-md mx-auto flex flex-col justify-center">
    <!-- Título del Registro -->
    <h1 class="text-3xl font-bold text-gray-900 text-center mb-6">
      Join DistNet
    </h1>

    <!-- Indicador de Pasos -->
    <div class="flex justify-center gap-2 mb-6">
      <div
        v-for="step in steps"
        :key="step"
        class="w-3 h-3 rounded-full"
        :class="currentStep === step ? 'bg-primary-500' : 'bg-gray-300'"
      ></div>
    </div>

    <!-- Formulario de Registro -->
    <UForm :state="form" @submit="handleSubmit" class="space-y-6">
      <!-- Paso 1: Información Básica -->
      <div
        v-if="currentStep === 1"
        class="space-y-4 flex flex-col items-center"
      >
        <UFormGroup label="Full Name" name="name" class="w-full" required>
          <UInput
            class="w-full"
            v-model="form.name"
            placeholder="John Doe"
            icon="i-heroicons-user"
          />
        </UFormGroup>

        <UFormGroup label="Username" name="username" class="w-full" required>
          <UInput
            class="w-full"
            v-model="form.username"
            placeholder="johndoe123"
            icon="i-heroicons-at-symbol"
          />
        </UFormGroup>
      </div>

      <!-- Paso 2: Información de Contacto -->
      <div
        v-if="currentStep === 2"
        class="space-y-4 flex flex-col items-center"
      >
        <UFormGroup label="Email" name="email" class="w-full" required>
          <UInput
            v-model="form.email"
            class="w-full"
            type="email"
            placeholder="your@email.com"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>

        <UFormGroup label="Bio" name="bio" class="w-full">
          <UTextarea
            v-model="form.bio"
            class="w-full"
            placeholder="Tell us about yourself..."
            :rows="3"
            autoresize
          />
        </UFormGroup>
      </div>

      <!-- Paso 3: Contraseña -->
      <div
        v-if="currentStep === 3"
        class="space-y-4 flex flex-col items-center"
      >
        <UFormGroup label="Password" name="password" class="w-full" required>
          <UInput
            v-model="form.password"
            class="w-full"
            type="password"
            placeholder="••••••••"
            icon="i-heroicons-lock-closed"
          />
        </UFormGroup>

        <UFormGroup
          label="Confirm Password"
          name="confirmPassword"
          class="w-full"
          required
        >
          <UInput
            v-model="form.confirmPassword"
            class="w-full"
            type="password"
            placeholder="••••••••"
            icon="i-heroicons-lock-closed"
          />
        </UFormGroup>
      </div>

      <!-- Botones de Navegación -->
      <div class="flex justify-between">
        <UButton
          v-if="currentStep > 1"
          label="Back"
          color="gray"
          variant="outline"
          @click="prevStep"
        />

        <UButton
          v-if="currentStep < steps"
          label="Next"
          color="primary"
          @click="nextStep"
        />

        <UButton
          v-if="currentStep === steps"
          label="Sign Up"
          type="submit"
          color="primary"
          :loading="loading"
        />
      </div>
    </UForm>
    <div class="mt-8 text-center">
      <span class="text-gray-600">Already an account? </span>
      <NuxtLink
        to="/login"
        class="text-gray-600 hover:text-primary-800 font-semibold"
        >Sign in instead</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const steps = 3 // Número total de pasos
const currentStep = ref(1) // Paso actual
const loading = ref(false) // Estado de carga
const userStore = useUserStore()

// Datos del formulario
const form = reactive({
  name: '',
  username: '',
  email: '',
  bio: '',
  password: '',
  confirmPassword: '',
})

// Validación del formulario
const validateStep = () => {
  if (currentStep.value === 1) {
    if (!form.name || !form.username) {
      return false
    }
  } else if (currentStep.value === 2) {
    if (!form.email) {
      return false
    }
  } else if (currentStep.value === 3) {
    if (
      !form.password ||
      !form.confirmPassword ||
      form.password !== form.confirmPassword
    ) {
      return false
    }
  }
  return true
}

// Navegar al siguiente paso
const nextStep = () => {
  if (validateStep()) {
    currentStep.value++
  } else {
    alert('Please fill out all required fields.')
  }
}

// Navegar al paso anterior
const prevStep = () => {
  currentStep.value--
}

// Enviar el formulario
const handleSubmit = async () => {
  if (!validateStep()) {
    alert('Please fill out all required fields.')
    return
  }

  try {
    loading.value = true
    const response = await userStore.register({
      username: form.username,
      email: form.email,
      password: form.password,
      name: form.name,
      bio: form.bio,
    })
    console.log('Registration successful:', response)
    // Redirigir al usuario a la página de inicio o login
    navigateTo('/login')
  } catch (error) {
    console.error('Registration failed:', error)
    alert('Registration failed. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
