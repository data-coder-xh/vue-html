const BASE_URL = '/api/news'

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    const message = errorBody.message ?? '请求失败'
    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export function getNewsList() {
  return request(BASE_URL)
}

export function getNewsById(id) {
  return request(`${BASE_URL}/${id}`)
}

export function createNews(payload) {
  return request(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export function updateNews(id, payload) {
  return request(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })
}

export function deleteNews(id) {
  return request(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })
}
