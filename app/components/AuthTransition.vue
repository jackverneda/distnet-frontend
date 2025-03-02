<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform opacity-0 translate-y-4"
    enter-to-class="transform opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform opacity-100 translate-y-0"
    leave-to-class="transform opacity-0 translate-y-4"
  >
    <slot />
  </Transition>
</template>
