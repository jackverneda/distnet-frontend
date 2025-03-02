<script setup lang="ts">
const postsStore = usePostStore()
const userStore = useUserStore()
const currentUser = computed(() => userStore.currentUser)  

const tweets = ref([
  {
    id: 2,
    user: {
      name: 'Alex Johnson',
      handle: 'alexd',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    content:
      'Just joined the @nuxt_js community! Any tips for a newbie? 👨💻 #webdev #vue',
    likes: 28,
    retweets: 5,
    replies: 7,
    liked: false,
    retweeted: false,
    timestamp: new Date(Date.now() - 7200000), // 2 horas
  },
  {
    id: 3,
    user: {
      name: 'Sarah Lee',
      handle: 'sarah_dev',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    content:
      'Anyone else stuck in CSS grid hell today? 😅 \n\nPro tip: grid-template-areas are your friend!',
    likes: 65,
    retweets: 15,
    replies: 12,
    liked: false,
    retweeted: false,
    timestamp: new Date(Date.now() - 1800000), // 30 minutos
  },
  {
    id: 4,
    user: {
      name: 'Mike Chen',
      handle: 'mikechen',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    content:
      'Debugging be like: "Why is this working now? I didn\'t change anything!" 🐛 #developerhumor',
    likes: 142,
    retweets: 42,
    replies: 23,
    liked: false,
    retweeted: false,
    timestamp: new Date(Date.now() - 86400000), // 24 horas
  },
  {
    id: 5,
    user: {
      name: 'Emma Wilson',
      handle: 'emma_w',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    content:
      'Just discovered the power of Vue composables! 🤯\n\nLife-changing for state management! #vuejs #frontend',
    likes: 89,
    retweets: 32,
    replies: 9,
    liked: false,
    retweeted: false,
    timestamp: new Date(Date.now() - 5400000), // 1.5 horas
  },
  {
    id: 6,
    user: {
      name: 'John Doe',
      handle: 'johndoe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    content:
      'Shoutout to my team for crushing the latest sprint! 🚀\n\nNext stop: production deployment! #agile #devops',
    likes: 15,
    retweets: 3,
    replies: 2,
    liked: false,
    retweeted: false,
    timestamp: new Date(Date.now() - 900000), // 15 minutos
  },
])

const newTweet = ref('')

function postTweet() {
  console.log('Posting tweet:', newTweet.value)
  postsStore.createPost(newTweet.value.trim())
  newTweet.value = ''
}

function toggleRetweet(tweet) {
  tweet.retweeted = !tweet.retweeted
  tweet.retweets += tweet.retweeted ? 1 : -1
}
</script>

<template>
  <div
    class="max-w-2xl mx-auto space-y-4 overflow-y-auto divide-y divide-(--ui-border)"
  >
    <!-- Compose New Tweet -->
    <div class="p-4">
      <div class="flex gap-3">
        <UAvatar
          size="md"
          :src="currentUser? currentUser.avatar : ''"
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
          <div class="flex items-center justify-end mt-3">
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-500"
                >{{ newTweet.length }}/280</span
              >
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
    </div>

    <!-- Tweet Feed -->
    <Post
      v-for="tweet in tweets"
      :key="tweet.id"
      :tweet="tweet"
      @retweet="toggleRetweet"
    />
  </div>
</template>
