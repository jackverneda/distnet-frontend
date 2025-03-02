<template>
  <div class="max-w-2xl mx-auto">
    <ProfileHeader
      :user="user"
      :posts="posts"
      :is-current-user="isCurrentUser"
      @follow="handleFollow"
      @unfollow="handleUnfollow"
    />

    <!-- Tweets -->
    <div v-if="activeTab === 'posts'" class="divide-y divide-gray-200">
      <Post
        v-for="post in posts"
        :key="post.post_id"
        :tweet="post"
        @retweet="$emit('retweet', post)"
      />

      <div v-if="posts.length === 0" class="p-8 text-center text-gray-500">
        No posts yet
      </div>
    </div>

    <!-- Other tabs content would go here -->
  </div>
</template>

<script setup>
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
})

const emit = defineEmits(['like', 'retweet', 'follow', 'unfollow'])

const activeTab = ref('posts')

function handleFollow() {
  emit('follow', props.user)
}

function handleUnfollow() {
  emit('unfollow', props.user)
}
</script>
