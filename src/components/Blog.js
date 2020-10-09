import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showIfUserLoggedIn = {
    display: user.username === blog.user.username ? '' : 'none',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{' '}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={showIfUserLoggedIn}>
          <button onClick={() => handleRemove(blog)}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
