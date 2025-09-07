// const BACKEND_URL = import.meta.env.VITE_API_URL
// const BACKEND_URL = "http://localhost:3000/api"
const BACKEND_URL = "/api"

export const saveDocument = async (
  document: string,
  username: string,
  documentName: string
) => {
  const response = await fetch(`${BACKEND_URL}/createDocument`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: document, username, title: documentName })
  })

  const data = await response.json()
  return data
}

export const getDocuments = async (email: string) => {
  const response = await fetch(`${BACKEND_URL}/getDocuments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
  const data = await response.json()
  return data
}