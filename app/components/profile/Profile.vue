<template>
  <div class="max-w-2xl mx-auto">
    <ProfileHeader
      :user="user"
      :is-current-user="isCurrentUser"
      @follow="handleFollow"
      @unfollow="handleUnfollow"
    />

    <!-- Tweets -->
    <div v-if="activeTab === 'posts'" class="divide-y divide-gray-200">
      <Post
        v-for="tweet in user.tweets"
        :key="tweet.id"
        :tweet="tweet"
        @like="$emit('like', tweet)"
        @retweet="$emit('retweet', tweet)"
      />

      <div v-if="user.tweets.length === 0" class="p-8 text-center text-gray-500">
        No tweets yet
      </div>
    </div>

    <!-- Other tabs content would go here -->
  </div>
</template>

<script>
export default {
  name: 'Profile'
}
</script>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  isCurrentUser: {
    type: Boolean,
    default: false
  }
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
