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
  <div
    class="max-w-2xl mx-auto space-y-4 overflow-y-auto divide-y divide-(--ui-border)"
  >
    <!-- Compose New Tweet -->
    <div class="p-4">
      <div class="flex gap-3">
        <UAvatar
          size="md"
          :src="currentUser ? currentUser.avatar : ''"
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
                label="Post"
                color="primary"
                :disabled="newTweet.length === 0 || newTweet.length > 280"
                @click="postTweet"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

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
