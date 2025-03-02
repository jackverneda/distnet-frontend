<template>
  <div class="min-h-screen bg-gray-50">
    <Profile
      :user="currentUser"
      :is-current-user="true"
      @like="handleLike"
      @retweet="handleRetweet"
    />
  </div>
</template>

<script setup>
const currentUser = ref({
  name: 'John Doe',
  handle: 'johndoe',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  bio: 'Full-stack developer | Vue enthusiast | Open source contributor',
  followers: 2458,
  following: 342,
  joined: '2019-03-01',
  tweets: [
    {
      id: 6,
      user: {
        name: 'John Doe',
        handle: 'johndoe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      content: 'Shoutout to my team for crushing the latest sprint! 🚀\n\nNext stop: production deployment! #agile #devops',
      likes: 15,
      retweets: 3,
      replies: 2,
      liked: false,
      retweeted: false,
      timestamp: new Date(Date.now() - 900000) // 15 minutos
    }
  ]
})

function handleLike(tweet) {
  // Handle like logic
}

function handleRetweet(tweet) {
  // Handle retweet logic
}
</script>
