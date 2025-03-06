export interface RouteMiddlewareData {
    unauthenticatedOnly?: boolean,
    requiresAuth?: boolean,
    navigateTo?: string  
}
export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()
  const { currentUser } = storeToRefs(userStore)
  const router = useRouter()
  console.log("Middleware de rutas", currentUser.value, to.path)
  
  if (!currentUser.value) {
    try {
      userStore.initialize()
    } catch {
      
    }
  }

  const authConfig: RouteMiddlewareData = to.meta.auth || {}

  if (authConfig?.unauthenticatedOnly && currentUser.value) {
    router.push(authConfig?.navigateTo || '/')
    // return navigateTo(authConfig?.navigateTo || '/', {replace: true})
  }

  if (authConfig?.requiresAuth && !currentUser.value) {
    return navigateTo(authConfig?.navigateTo || '/login', {replace: true})
  }

})
