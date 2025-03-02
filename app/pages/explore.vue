<script setup lang="ts">
import { user } from '#build/ui-pro'
import PostSK from '~/components/Post/PostSK.vue'
import { postService } from '~/services/post.service'

const postsStore = usePostStore()
const userStore = useUserStore()
const currentUser = computed(() => userStore.currentUser)

const feed = ref([])
const loading = ref(true)

onMounted(async () => {
  userStore.initialize()
  refresh()
})

async function refresh() {
  try {
    await userStore.fetchCurrentUser()

    const feedResponse = await postService().getFeed(currentUser.value.user_id)
    feed.value = feedResponse.data
    console.log('Posts:', feed.value)
  } catch (error) {
    console.error('Error fetching profile data:', error)
  } finally {
    loading.value = false
  }
}

const newTweet = ref('')

function postTweet() {
  console.log('Posting tweet:', newTweet.value)
  postsStore.createPost(newTweet.value.trim())
  newTweet.value = ''
  refresh()
}

function toggleRetweet(tweet) {
  tweet.retweeted = !tweet.retweeted
  tweet.retweets += tweet.retweeted ? 1 : -1
}
</script>

<template>
  <UDashboardPanel id="settings" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UDashboardNavbar title="Settings">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div
        class="w-full mx-auto space-y-4 overflow-y-auto divide-y divide-(--ui-border)"
      >
        <div class="mt-8" v-if="loading">
          <PostSK v-for="i in 3" :key="i" />
        </div>
        <!-- Tweet Feed -->
        <Post
          v-else
          v-for="tweet in feed"
          :key="tweet.id"
          :tweet="tweet"
          @retweet="toggleRetweet"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
