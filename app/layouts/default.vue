<script setup lang="ts">
import { postService } from '~/services/post.service'
import { userService } from '~/services/user.service'
import type { User, UserCore } from '~/types/user'
import Preview from '~/components/profile/Preview.vue'
import PreviewSK from '~/components/profile/PreviewSK.vue'

const route = useRoute()
const toast = useToast()

const userStore = useUserStore()
const currentUser = computed(() => userStore.currentUser)

const loading = ref(false)
const searchQuery = ref('')
const searchResults = ref<UserCore[]>([])

const links = computed(() => [
  [
    {
      label: 'Feed',
      icon: 'i-lucide-house',
      to: '/',
    },
    // {
    //   label: 'Explore',
    //   icon: 'i-lucide-search',
    //   to: '/explore',
    // },
    // {
    //   label: 'Customers',
    //   icon: 'i-lucide-users',
    //   to: '/customers',
    // },
    {
      label: 'Profile',
      icon: 'i-lucide-user',
      to: `/profile/${currentUser.value?.user_id}`,
    },
    // {
    //   label: 'Settings',
    //   to: '/settings',
    //   icon: 'i-lucide-settings',
    //   defaultOpen: true,
    //   children: [
    //     {
    //       label: 'General',
    //       to: '/settings',
    //       exact: true,
    //     },
    //     {
    //       label: 'Members',
    //       to: '/settings/members',
    //     },
    //     {
    //       label: 'Security',
    //       to: '/settings/security',
    //     },
    //   ],
    // },
  ],
])

await callOnce('user', () => userStore.initialize())
onMounted(async () => {
  await userStore.fetchCurrentUser()
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title:
      'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [
      {
        label: 'Accept',
        color: 'neutral',
        variant: 'outline',
        onClick: () => {
          cookie.value = 'accepted'
        },
      },
      {
        label: 'Opt out',
        color: 'neutral',
        variant: 'ghost',
      },
    ],
  })
})

watch(
  searchQuery,
  useDebounceFn(async (query) => {
    loading.value = true
    console.log(searchQuery)
    if (query.trim()) {
      try {
        const response = await userService().searchUsers(query.trim())
        searchResults.value = response?.data || []
        console.log('Data', searchResults.value)
      } catch {
        console.log('Failed fetching users in search')
      } finally {
        loading.value = false
      }
    } else {
      searchResults.value = []
    }
  }, 300),
)
</script>

<template>
  <UDashboardGroup>
    <!-- <UDashboardLayout> -->
    <!-- <UDashboardSearch :groups="groups" /> -->
    <!-- <UDashboardPanel> -->
    <UDashboardSidebar
      collapsible
      class="bg-(--ui-bg-elevated)/25"
      :ui="{ footer: 'lg:border-t lg:border-(--ui-border)' }"
    >
      <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>
    <!-- </UDashboardPanel> -->
    <div class="flex-1">
      <div class="flex flex-row">
        <div class="flex-1">
          <slot />
        </div>

        <div class="w-1/3">
          <div class="px-4 py-3 w-full">
            <UInput
              v-model="searchQuery"
              placeholder="Buscar usuarios..."
              icon="i-lucide-search"
              autocomplete="off"
              class="w-full"
            />
          </div>
          <div class="p-4 space-y-4">
            <UCard>
              <div v-if="searchQuery" class="flex flex-col">
                <ul
                  v-if="loading"
                  role="list"
                  class="divide-y divide-(--ui-border)"
                >
                  <PreviewSK v-for="i in 5" />
                </ul>
                <ul
                  v-else-if="searchResults.length > 0"
                  role="list"
                  class="divide-y divide-(--ui-border)"
                >
                  <Preview v-for="result in searchResults" :user="result" />
                </ul>
                <div v-else class="text-center text-gray-500 py-8">
                  <UIcon
                    name="i-lucide-circle-alert"
                    class="w-12 h-12 mx-auto opacity-50"
                  />
                  <p class="mt-4">No se encontraron coincidencias</p>
                </div>
              </div>
              <div v-else class="text-center text-gray-500 py-8">
                <UIcon
                  name="i-lucide-search"
                  class="w-12 h-12 mx-auto opacity-50"
                />
                <p class="mt-4">Busca usuarios</p>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </div>
    <!-- </UDashboardLayout> -->
  </UDashboardGroup>
</template>
