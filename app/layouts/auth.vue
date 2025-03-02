<template>
  <div class="min-h-screen bg-gradient-to-br from-white to-green-600">
    <div class="container mx-auto px-4 h-screen">
      <div class="flex items-center justify-center h-full">
        <div class="w-full max-w-md space-y-8 backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-xl">
          <div class="text-center">
            <NuxtLink to="/">
              <div class="inline-flex items-center gap-2">
                <UIcon name="i-heroicons-globe-alt" class="w-12 h-12 text-white" />
                <span class="text-3xl font-bold text-white">DistNet</span>
              </div>
            </NuxtLink>
            <p class="mt-2 text-white/80">
              Connect with friends and the world around you
            </p>
          </div>

          <!-- Page Content -->
          <div class="bg-white rounded-2xl p-8 shadow-lg">
            <AuthTransition>
              <slot />
            </AuthTransition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <style>
  /* Smooth background gradient animation */
  /* body {
    @apply from-white to-green-600;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  } */

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  </style>
