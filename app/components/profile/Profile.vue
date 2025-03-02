<template>
  <div class="max-w-2xl mx-auto">
    <ProfileHeader
      :user="user"
      :is-following="isFollowee"
      :is-current-user="isCurrentUser"
      :posts="posts"
      @follow="handleFollow"
    />
    <UTabs
      :items="links"
      class="mt-4"
      :ui="{ wrapper: 'border-b border-gray-200' }"
      @change="changeTab"
    >
      <template #item="{ item }">
        <div class="flex items-center gap-1 relative py-4">
          <UIcon :name="item.icon" class="w-12 h-12 mx-auto opacity-50" />
          <span>{{ item.label }}</span>
        </div>
      </template>
    </UTabs>

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

    <div v-if="activeTab === 'following'" class="divide-y divide-gray-200">
      <Preview
        v-for="follow in following"
        :key="follow.user_id"
        :user="follow"
        @retweet="$emit('retweet', post)"
      />

      <div v-if="following.length === 0" class="p-8 text-center text-gray-500">
        No users following yet
      </div>
    </div>

    <div v-if="activeTab === 'followers'" class="divide-y divide-gray-200">
      <Preview
        v-for="follower in followers"
        :key="follower.user_id"
        :user="follower"
        @retweet="$emit('retweet', post)"
      />

      <div v-if="following.length === 0" class="p-8 text-center text-gray-500">
        No followers yet
      </div>
    </div>
  </div>
</template>

<script setup>
import { userService } from '~/services/user.service'
import Preview from './Preview.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  posts: {
    type: Array,
    default: () => [],
  },
})

const userStore = useUserStore()
const followers = ref([])
const following = ref([])
const loading = ref(true)

onMounted(async () => {
  userStore.initialize()
  refresh()
})

const isFollowee = computed(() => userStore.isFollowee(props.user.user_id))
const isCurrentUser = computed(
  () => userStore.currentUser.user_id === props.user.user_id,
)

async function refresh() {
  try {
    await userStore.fetchCurrentUser()
    const followersData = await userService.getFollowers(props.user?.user_id)
    followers.value = followersData.data

    const followingData = await userService.getFollowing(props.user?.user_id)
    following.value = followingData.data
  } catch (error) {
    console.error('Error fetching profile data:', error)
  } finally {
    loading.value = false
  }
}

const links = [
  [
    {
      label: 'Posts',
      key: 'posts',
      icon: 'i-lucide-message-circle-more',
    },
    {
      label: 'Following',
      key: 'following',
      icon: 'i-lucide-users',
      to: '/settings/members',
    },
    {
      label: 'Followers',
      key: 'followers',
      icon: 'i-lucide-users',
    },
  ],
]

const emit = defineEmits(['like', 'retweet', 'follow', 'unfollow'])

const activeTab = ref('posts')

function handleFollow() {
  emit('follow', props.user)
}

function handleUnfollow() {
  emit('unfollow', props.user)
}

function changeTab(key) {
  activeTab.value = key
}
</script>
