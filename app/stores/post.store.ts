import { defineStore } from 'pinia'
import { postService } from '~/services/post.service'
import type { Post } from '~/types/post'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    hasMore: true
  }),

  actions: {
    async createPost(content: string, media?: File[]) {
      try {
        this.loading = true
        const newPost = await postService.createPost(content, media)
        this.posts.unshift(newPost.data)
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

        this.posts = [...this.posts, ...newPosts.data]
        this.currentPage++
      } catch (error) {
        this.error = error.message || 'Failed to fetch posts'
        throw error
      } finally {
        this.loading = false
      }
    },

    async toggleLike(post: Post) {
      try {
        if (post.isLiked) {
          await postService.unlikePost(post.id)
          post.likesCount--
        } else {
          await postService.likePost(post.id)
          post.likesCount++
        }
        post.isLiked = !post.isLiked
      } catch (error) {
        this.error = error.message || 'Failed to toggle like'
        throw error
      }
    },

    async deletePost(postId: string) {
      try {
        await postService.deletePost(postId)
        this.posts = this.posts.filter(post => post.id !== postId)
      } catch (error) {
        this.error = error.message || 'Failed to delete post'
        throw error
      }
    }
  }
})
