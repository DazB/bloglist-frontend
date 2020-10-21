import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
    <div style={blogStyle} className="blog">
      <div className="visibleContent">
        {blog.title} {blog.author}{' '}
        <button id="button-view" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible} className="hiddenContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{' '}
          <button id="button-like" onClick={() => handleLike(blog)}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <div style={showIfUserLoggedIn}>
          <button id="button-remove" onClick={() => handleRemove(blog)}>
            remove
          </button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
