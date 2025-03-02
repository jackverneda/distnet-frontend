import { defineStore } from 'pinia'
import { feedService } from '~/services/feed.service'
import { postService } from '~/services/post.service'
import type { Post } from '~/types/post'
import type { KeyMap } from '~/types/utils'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as {} as KeyMap<Post>,
    loading: false,
    error: null as string | null,
    currentPage: 1,
    hasMore: true,
    feed: [] as Post[]
  }),

  actions: {
    async createPost(content: string) {
      try {
        this.loading = true
        const newPost = await postService.createPost(content)
        this.posts.value[newPost.data.post_id] = newPost.data
        this.feed.unshift(newPost.data)
      } catch (error) {
        this.error = error.message || 'Failed to create post'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchPosts() {
      try {
        if (!this.hasMore) return

        this.loading = true
        const newPosts = await postService.getPosts(this.currentPage)

        if (newPosts.data.length === 0) {
          this.hasMore = false
          return
        }

        // this.posts = [...this.posts, ...newPosts.data]
        this.currentPage++
      } catch (error) {
        this.error = error.message || 'Failed to fetch posts'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchFeed() {
      try {
        this.loading = true
        const feed = await feedService.getFeed(this.currentPage)

        if (feed.data.length === 0) {
          this.hasMore = false
          return
        }

        this.feed = [...this.feed, ...feed.data]
        this.currentPage++
      } catch (error) {
        this.error = error.message || 'Failed to fetch feed'
        throw error
      }

    },

    // async toggleLike(post: Post) {
    //   try {
    //     if (post.isLiked) {
    //       await postService.unlikePost(post.id)
    //       post.likesCount--
    //     } else {
    //       await postService.likePost(post.id)
    //       post.likesCount++
    //     }
    //     post.isLiked = !post.isLiked
    //   } catch (error) {
    //     this.error = error.message || 'Failed to toggle like'
    //     throw error
    //   }
    // },

    // async deletePost(postId: string) {
    //   try {
    //     await postService.deletePost(postId)
    //     this.posts = this.posts.filter(post => post.id !== postId)
    //   } catch (error) {
    //     this.error = error.message || 'Failed to delete post'
    //     throw error
    //   }
    // }
  }
})
