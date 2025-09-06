<<<<<<< HEAD
const BACKEND_URL = import.meta.env.VITE_API_URL
=======
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
>>>>>>> 13c6a2593b8890e0608e5c13eae81d1e645745a1

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
