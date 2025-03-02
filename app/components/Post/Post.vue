<template>
  <div
    class="hover:bg-gray-50 transition-colors cursor-pointer flex flex-col p-4"
  >
    <div>
      <div class="flex items-center gap-3">
        <NuxtLink
          :to="`/profile/${tweet.user.name}`"
          class="block rounded-full focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <UAvatar :src="tweet.user.avatar" :alt="tweet.user.name" size="md" />
        </NuxtLink>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="font-semibold">{{ tweet.user.name }}</span>
            <span class="text-gray-500">@{{ tweet.user.username }}</span>
            <span class="text-gray-500">·</span>
            <UTooltip :text="formatTime(tweet.created_at)">
              <span class="text-gray-500 hover:underline">{{
                timeAgo(tweet.created_at)
              }}</span>
            </UTooltip>
          </div>
        </div>
        <div
          class="flex items-center gap-1 text-gray-500 hover:text-green-500 self-end"
        >
          <UButton
            icon="i-heroicons-arrow-path"
            variant="ghost"
            size="sm"
            :color="tweet.retweeted ? 'green' : 'gray'"
            @click="$emit('retweet', tweet)"
          />
        </div>
      </div>
    </div>

    <p class="whitespace-pre-line">
      {{ tweet.content }}
    </p>
  </div>
</template>

<script setup>
import { formatDistanceToNow } from 'date-fns'
import { link } from '#build/ui'

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['like', 'retweet'])

const timeAgo = (date) => {
  return formatDistanceToNow(date, { addSuffix: true })
}

const formatTime = (date) => {
  return date.toLocaleString()
}
</script>
