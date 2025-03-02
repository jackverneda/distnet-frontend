export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()
  const { currentUser } = storeToRefs(userStore)

  // If user isn't loaded yet, try to fetch
  if (!currentUser.value) {
    try {
      await userStore.fetchCurrentUser()
    } catch {
      // Ignore errors here, handled in the store
    }
  }

  const authConfig = to.meta.auth || {}

  if (authConfig.unauthenticatedOnly && currentUser.value) {
    return navigateTo(authConfig.navigateAuthenticatedTo || '/')
  }

  if (authConfig.requiresAuth && !currentUser.value) {
    return navigateTo(authConfig.navigateUnauthenticatedTo || '/login')
  }
})
