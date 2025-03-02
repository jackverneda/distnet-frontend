async function requestOptions(method, body) {
  const headers = new Headers()

  const isFormData = body instanceof FormData

  if (!isFormData) {
    headers.append('Content-Type', 'application/json')
  }

  const token = await getToken()

  if (token) {
    headers.append('Authorization', `Bearer ${token}`)
  }

  return {
    method: method,
    headers: headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : null
  }
}

async function handleResponse(response) {
  try {
    if (!response.ok) {
      const contentType = response.headers.get('Content-Type')

      if (contentType && contentType.includes('application/json')) {
        try {
          const errorData = await response.json()
          throw new Error(errorData.message || errorData || 'Algo salió mal')
        } catch {
          // Si la respuesta no es un JSON válido, intentamos manejarla como texto plano
          const errorText = await response.text()
          const errorMessage = extractErrorMessage(errorText)
          throw new Error(errorMessage || 'Algo salió mal')
        }
      } else {
        const errorText = await response.text()
        const errorMessage = extractErrorMessage(errorText)
        throw new Error(errorMessage || 'Algo salió mal')
      }
    }

    const contentType = response.headers.get('Content-Type')
    if (contentType?.includes('application/json')) {
      const responseData = await response.json()
      return {
        status: 'success',
        data: responseData,
        ok: true
      }
    } else if (contentType?.includes('text') || contentType === null) {
      const responseData = await response.text()
      return {
        status: 'success',
        data: responseData,
        ok: true
      }
    } else {
      throw new Error('Tipo de contenido no compatible')
    }
  } catch (error) {
    return {
      message: error.message,
      status: 'error',
      ok: false
    }
  }
}

function extractErrorMessage(errorText) {
  const match = errorText.match(/System\.Exception:\s*(.*?)(\n|$)/)
  return match ? match[1] : null
}

async function get(url, params = {}) {
  try {
    const queryParams = params ? new URLSearchParams(params).toString() : ''
    const requestUrl = queryParams ? `${url}?${queryParams}` : url

    const requestOption = await requestOptions('GET', null)

    const response = await fetch(requestUrl, requestOption)
    return handleResponse(response)
  } catch {
    return {
      message: 'Error con la conexion a internet',
      status: 'error',
      ok: false
    }
  }
}

async function post(url, body, params = null) {
  try {
    const queryParams = params ? new URLSearchParams(params).toString() : ''
    const requestUrl = queryParams ? `${url}?${queryParams}` : url

    const requestOption = await requestOptions('POST', body)
    const response = await fetch(requestUrl, requestOption)
    return handleResponse(response)
  } catch (error) {
    return {
      message: error.message,
      status: 'error',
      ok: false
    }
  }
}

async function put(url, body, params = null) {
  try {
    const queryParams = params ? new URLSearchParams(params).toString() : ''
    const requestUrl = queryParams ? `${url}?${queryParams}` : url

    const requestOption = await requestOptions('PUT', body)
    const response = await fetch(requestUrl, requestOption)
    return handleResponse(response)
  } catch {
    return {
      message: 'Error con la conexion a internet',
      status: 'error',
      ok: false
    }
  }
}

async function del(url) {
  const requestOption = await requestOptions('DELETE', null)
  const response = await fetch(url, requestOption)
  return handleResponse(response)
}

async function getToken() {
  const authToken = useCookie('authToken').value
  return authToken ?? false
}

export const api = {
  get,
  post,
  put,
  delete: del
}
