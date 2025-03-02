export const useApi = () => {
  const baseURL = useRuntimeConfig().public.apiBase || '/api'
  const authToken = useCookie('authToken')

  const fetchOptions = (method: string, body?: any) => {
    const headers: HeadersInit = {}
    const isFormData = body instanceof FormData
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json'
    }
    
    if (authToken.value) {
      headers['Authorization'] = `Bearer ${authToken.value}`
    }
    
    return {
      method,
      headers,
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined
    }
  }

  const handleError = (error: any) => {
    const errorMessage = error.data?.message || 
                        error.message || 
                        'Error de conexión'
    return {
      status: 'error',
      message: errorMessage,
      ok: false,
      data: null
    }
  }

  const wrapper = async (path: string, options: any) => {
    try {
      const response = await $fetch<string>(path, {
        baseURL,
        ...options,
        parseResponse: (txt) => txt,
      })

      const isJSON = options?.headers?.['Content-Type'] === 'application/json'
      
      return {
        status: 'success',
        data: isJSON ? JSON.parse(response) : response,
        ok: true
      }
    } catch (error: any) {
      return handleError(error)
    }
  }

  return {
    get: (url: string, params?: Record<string, any>) => 
      wrapper(url, {
        ...fetchOptions('GET'),
        query: params
      }),

    post: (url: string, body?: any, params?: Record<string, any>) =>
      wrapper(url, {
        ...fetchOptions('POST', body),
        query: params
      }),

    put: (url: string, body?: any, params?: Record<string, any>) =>
      wrapper(url, {
        ...fetchOptions('PUT', body),
        query: params
      }),

    delete: (url: string) =>
      wrapper(url, fetchOptions('DELETE'))
  }
}
