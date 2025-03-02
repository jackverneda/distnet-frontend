<template>
  <div
    class="hover:bg-gray-50 hover:bg-opacity-20 transition-colors cursor-pointer flex flex-col p-4"
  >
    <NuxtLink :to="`/profile/${user.user_id}`" class="block">
      <div>
        <div class="flex flex-row items-center justify-between gap-3">
          <div class="flex-1 flex flex-row gap-3 justify-start items-center">
            <UAvatar :src="user.avatar" :alt="user.name" size="xl" />
            <div class="flex flex-col items-start">
              <span class="font-semibold">{{ user.name }}</span>
              <span class="text-gray-500">@{{ user.username }}</span>
              <span
                v-if="isFollowee"
                class="text-gray-500 text-xs flex flex-row items-center"
              >
                <UIcon name="i-lucide-user" class="h-3 w-3" />
                Following</span
              >
            </div>
          </div>
          <div
            class="flex items-center gap-1 text-gray-500 hover:text-green-500"
          >
            <UButton
              v-if="!isFollowee && !isMe"
              label="Follow"
              color="primary"
              :disabled="false"
              @click="userStore.followUser(user.user_id)"
            />
            <!-- <UButton
          icon="i-heroicons-arrow-path"
          variant="ghost"
          size="sm"
          :color="retweeted ? 'green' : 'gray'"
          @click="$emit('retweet', tweet)"
          /> -->
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})
const userStore = useUserStore()
const isFollowee = computed(() => userStore.isFollowee(props.user.user_id))
const isMe = computed(() => {
  return userStore.currentUser.user_id === props.user.user_id
})

const emit = defineEmits(['like', 'retweet'])
</script>
