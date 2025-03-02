<template>
  <div
    class="hover:bg-gray-50 hover:bg-opacity-20 transition-colors cursor-pointer flex flex-col p-4 animate-pulse"
  >
    <div class="flex flex-row items-center justify-between gap-3">
      <div class="flex-1 flex flex-row gap-3 justify-start items-center">
        <!-- Avatar skeleton -->
        <div class="w-12 h-12 rounded-full bg-gray-200"></div>

        <!-- Text skeleton -->
        <div class="flex flex-col items-start space-y-2">
          <div class="h-4 bg-gray-200 rounded w-32"></div>
          <div class="h-3 bg-gray-200 rounded w-24"></div>
          <div class="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      <!-- Button skeleton -->
      <div class="h-8 bg-gray-200 rounded-lg w-20"></div>
    </div>
  </div>
</template>

<style>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
