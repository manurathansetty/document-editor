import express, { Request, Response } from 'express'
import pool from './db'
import cors from 'cors'
// import { genAiAssistant } from './aiAssistant'

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: '*',
    credentials: true
  })
)
const port = process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }))

// Test DB connection
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    console.log('Connected to DB')
    const result = await pool.query('SELECT * FROM users')
    return res.json({ users: result.rows })
  } catch (err) {
    console.error(err)
    return res.json({ success: false, error: err })
  }
})

app.post('/api/userLogin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const emailclean = email.toLowerCase()
    console.log(email, password)
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [emailclean, password]
    )
    const user = result.rows[0]
    if (!user) {
      return res.json({
        success: false,
        message: 'User not found, please sign up!'
      })
    }

    const documents = await pool.query(
      'SELECT * FROM documents WHERE username = $1',
      [user.email]
    )

    return res.json({
      success: true,
      user: user.username,
      documents: documents.rows
    })
  } catch (err) {
    console.error(err)
    return res.json({ success: false, error: err })
  }
})

app.post('/api/userSignup', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body
    const emailclean = email.toLowerCase()
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [
      emailclean
    ])
    if (existing.rows.length > 0) {
      return res.json({ success: false, message: 'User already exists' })
    }

    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, emailclean, password]
    )
    return res.json({ success: true, user: result.rows[0].username })
  } catch (err) {
    console.error(err)
    return res.json({ success: false, error: err })
  }
})

app.post('/api/createDocument', async (req: Request, res: Response) => {
  try {
    const { username, title, content } = req.body

    // Resolve provided username to the stored email used in documents table
    const userResult = await pool.query('SELECT email FROM users WHERE username = $1', [username])
    const userEmail = userResult.rows?.[0]?.email
    if (!userEmail) {
      return res.json({ success: false, message: 'User not found' })
    }

    // Check if a document already exists for this user with the same title
    const docCheck = await pool.query(
      'SELECT 1 FROM documents WHERE username = $1 AND title = $2 LIMIT 1',
      [userEmail, title]
    )

    if (docCheck.rows.length > 0) {
      await pool.query(
        'UPDATE documents SET content = $1 WHERE username = $2 AND title = $3',
        [content, userEmail, title]
      )
      return res.json({ success: true, message: 'Document updated', document: { title, content } })
    }

    const insertResult = await pool.query(
      'INSERT INTO documents (username, title, content) VALUES ($1, $2, $3) RETURNING *',
      [userEmail, title, content]
    )
    return res.json({ success: true, message: 'Document saved successfully', document: insertResult.rows[0] })
  } catch (err) {
    console.error(err)
    return res.json({ success: false, error: err })
  }
})

app.post('/api/getDocuments', async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const emailclean = email.toLowerCase()
    const result = await pool.query('SELECT * FROM documents WHERE username = $1', [email])
    return res.json({ success: true, documents: result.rows })
  } catch (err) {
    console.error(err)
    return res.json({ success: false, error: err })
  }
})

// app.post('/api/getAIAssistant', async (req: Request, res: Response) => {
//   const { prompt } = req.body
//   try {
//     const htmlContent = await genAiAssistant(prompt)
//     res.json({ success: true, html: htmlContent })
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to generate HTML' })
//   }
// })

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
