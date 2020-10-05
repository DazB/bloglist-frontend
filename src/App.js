import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
const storageKey = 'loggedBlogappUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({
    text: null,
    type: '',
    timeout: null,
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(storageKey)
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const notifyWith = (message, type = 'success') => {
    clearTimeout(notification.timeout)
    setNotification({
      message,
      type,
      timeout: setTimeout(() => {
        setNotification({
          text: null,
          type: '',
        })
      }, 5000),
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(storageKey, JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notifyWith('login success', 'success')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const blogFormRef = useRef()

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      notifyWith(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success'
      )
    } catch (exception) {
      notifyWith('error adding blog', 'error')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <Notification notification={notification} />
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button
          onClick={() => {
            setUser(null)
            window.localStorage.removeItem(storageKey)
          }}
        >
          logout
        </button>
      </p>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
