const BACKEND_URL = 'http://localhost:3000'

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BACKEND_URL}/userLogin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // 👈 important
    },
    body: JSON.stringify({ email, password })
  })
  const data = await response.json()
  return data
}

export const signupUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${BACKEND_URL}/userSignup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // 👈 important
    },
    body: JSON.stringify({ username, email, password })
  })
  const data = await response.json()
  return data
}
