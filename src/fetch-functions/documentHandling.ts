const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

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
