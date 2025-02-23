<template>
  <div class="max-w-2xl mx-auto space-y-4">
    <!-- Compose New Tweet -->
    <UCard>
      <div class="flex gap-3">
        <UAvatar
          size="md"
          :src="currentUser.avatar"
          alt="Profile"
          class="flex-shrink-0"
        />
        <div class="flex-1">
          <UTextarea
            v-model="newTweet"
            placeholder="What's happening?"
            :rows="3"
            autoresize
            variant="none"
            class="text-lg p-0 border-none focus:ring-0 w-full"
          />
          <div class="flex items-center justify-between mt-3">
            <div class="flex gap-2 text-primary-500">
              <UButton
                icon="i-heroicons-photo"
                size="sm"
                variant="ghost"
                color="primary"
              />
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-500">{{ newTweet.length }}/280</span>
              <UButton
                label="Tweet"
                color="primary"
                :disabled="newTweet.length === 0 || newTweet.length > 280"
                @click="postTweet"
              />
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Tweet Feed -->
    <Post
      v-for="tweet in tweets"
      :key="tweet.id"
      :tweet="tweet"
      @like="toggleLike"
      @retweet="toggleRetweet"
    />
  </div>
</template>

<script setup>
const currentUser = {
  name: 'John Doe',
  handle: 'johndoe',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
}

const tweets = ref([
  {
    id: 1,
    user: {
      name: 'Jane Smith',
      handle: 'janesmith',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    content: 'Just shipped a new feature! 🚀 #coding #webdev',
    likes: 42,
    retweets: 12,
    replies: 3,
    liked: false,
    retweeted: false,
    timestamp: new Date(Date.now() - 3600000)
  }
])

const newTweet = ref('')

function postTweet() {
  if (newTweet.value.trim()) {
    tweets.value.unshift({
      id: tweets.value.length + 1,
      user: { ...currentUser },
      content: newTweet.value.trim(),
      likes: 0,
      retweets: 0,
      replies: 0,
      liked: false,
      retweeted: false,
      timestamp: new Date()
    })
    newTweet.value = ''
  }
}

function toggleLike(tweet) {
  tweet.liked = !tweet.liked
  tweet.likes += tweet.liked ? 1 : -1
}

function toggleRetweet(tweet) {
  tweet.retweeted = !tweet.retweeted
  tweet.retweets += tweet.retweeted ? 1 : -1
}
</script>
