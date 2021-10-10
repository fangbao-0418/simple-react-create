type Method = 'get' | 'post' | 'delete' | 'put'

export const http = (url: string, method: Method, data?: any) => {

  const body = data ? JSON.stringify(data) : undefined

  return fetch(url, {
    method,
    headers: {
      'content-type': 'application/json'
    },
    body
  }).then((r) => r.json())
}
