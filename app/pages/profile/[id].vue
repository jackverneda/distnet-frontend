<template>
  <div class="min-h-screen">
    <ProfileSK v-if="loading" />
    <Profile
      v-else
      :user="user"
      :posts="posts"
      :is-current-user="true"
      @like="handleLike"
      @retweet="handleRetweet"
    />
  </div>
</template>

<script setup>
import ProfileSK from '~/components/profile/ProfileSK.vue'
import { postService } from '~/services/post.service'
import { userService } from '~/services/user.service'

const route = useRoute()
const id = route.params.id

// const { getUserById } = userService
// const { getPostsByUserId } = postService

// const userStore = useUserStore()
// const postStore = usePostStore()

const user = ref(null)
const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const userResponse = await userService().getUser(id)
    user.value = userResponse.data
    console.log('User:', user.value)

    const postsResponse = await postService().getPostsByUserId(id)
    posts.value = postsResponse.data
    console.log('Posts:', posts.value)
  } catch (error) {
    console.error('Error fetching profile data:', error)
  } finally {
    loading.value = false
  }
})

function handleLike(tweet) {
  // Handle like logic
}

function handleRetweet(tweet) {
  // Handle retweet logic
}
</script>
