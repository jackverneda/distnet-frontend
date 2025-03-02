<template>
  <div class="border-b border-gray-200">
    <!-- Cover Photo -->
    <div class="h-48 bg-gray-100 relative">
      <div class="absolute -bottom-16 left-4">
        <UAvatar
          size="3xl"
          :src="user.avatar"
          :alt="user.name"
          class="border-4 border-white"
        />
      </div>
    </div>

    <!-- Profile Info -->
    <div class="pt-20 px-4">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-xl font-bold">
            {{ user.name }}
          </h1>
          <p class="text-gray-500">@{{ user.username }}</p>
        </div>
        <UButton
          v-if="!isCurrentUser"
          :label="isFollowing ? 'Following' : 'Follow'"
          :color="isFollowing ? 'gray' : 'black'"
          variant="solid"
          @click="toggleFollow"
        />
      </div>

      <p class="mt-4">
        {{ user.bio }}
      </p>

      <!-- Stats -->
      <div class="flex gap-4 mt-4 text-gray-500">
        <div class="flex items-center gap-1">
          <span class="font-semibold">{{ user.following || 0 }}</span>
          <span>Following</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-semibold text-gray-900">{{
            user.followers || 0
          }}</span>
          <span>Followers</span>
        </div>
        <div class="flex items-center gap-1">
          <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
          <span>Joined {{ joinDate }}</span>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <UTabs
      :items="tabs"
      class="mt-4"
      :ui="{ wrapper: 'border-b border-gray-200' }"
      @change="changeTab"
    >
      <template #item="{ item }">
        <div class="flex items-center gap-1 relative py-4">
          <span>{{ item.label }}</span>
          <span v-if="item.count" class="text-gray-500 text-sm">{{
            item.count
          }}</span>
        </div>
      </template>
    </UTabs>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  posts: {
    type: Array,
    default: () => [],
  },
  isCurrentUser: {
    type: Boolean,
    default: false,
  },

  isFollowing: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['follow', 'unfollow', 'changeTab'])

const joinDate = computed(() => {
  return new Date(props.user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
})

const tabs = [
  { label: 'Posts', key: 'posts', count: props.posts.length },
  { label: 'Followers', key: 'followers', count: 0 },
  { label: 'Following', key: 'following', count: 0 },
]

function toggleFollow() {
  isFollowing.value = !isFollowing.value
  emit(isFollowing.value ? 'follow' : 'unfollow')
}

function changeTab(index) {
  console.log(index)
  emit('changeTab', index)
}
</script>
