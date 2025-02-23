<template>
    <UCard class="hover:bg-gray-50 transition-colors cursor-pointer">
      <template #header>
        <div class="flex items-center gap-3">
          <UAvatar
            :src="tweet.user.avatar"
            :alt="tweet.user.name"
            size="md"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-semibold">{{ tweet.user.name }}</span>
              <span class="text-gray-500">@{{ tweet.user.handle }}</span>
              <span class="text-gray-500">·</span>
              <UTooltip :text="formatTime(tweet.timestamp)">
                <span class="text-gray-500 hover:underline">{{ timeAgo(tweet.timestamp) }}</span>
              </UTooltip>
            </div>
          </div>
        </div>
      </template>
  
      <p class="whitespace-pre-line">{{ tweet.content }}</p>
  
      <template #footer>
        <div class="flex items-center justify-between text-gray-500">
          <div class="flex items-center gap-1 hover:text-primary-500">
            <UButton
              icon="i-heroicons-chat-bubble-oval-left"
              variant="ghost"
              size="sm"
            />
            <span class="text-sm">{{ tweet.replies }}</span>
          </div>
          <div class="flex items-center gap-1 hover:text-green-500">
            <UButton
              icon="i-heroicons-arrow-path"
              variant="ghost"
              size="sm"
              :color="tweet.retweeted ? 'green' : 'gray'"
              @click="$emit('retweet', tweet)"
            />
            <span class="text-sm">{{ tweet.retweets }}</span>
          </div>
          <div class="flex items-center gap-1 hover:text-red-500">
            <UButton
              icon="i-heroicons-heart"
              variant="ghost"
              size="sm"
              :color="tweet.liked ? 'red' : 'gray'"
              @click="$emit('like', tweet)"
            />
            <span class="text-sm">{{ tweet.likes }}</span>
          </div>
        </div>
      </template>
    </UCard>
  </template>
  
  <script setup>
  import { formatDistanceToNow } from 'date-fns'
  
  const props = defineProps({
    tweet: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['like', 'retweet'])
  
  const timeAgo = (date) => {
    return formatDistanceToNow(date, { addSuffix: true })
  }
  
  const formatTime = (date) => {
    return date.toLocaleString()
  }
  </script>