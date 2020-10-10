import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const title = 'Blog title'
  const author = 'Blog author'
  const user = {
    name: 'daz',
    username: 'daz',
  }

  const blog = {
    title,
    author,
    likes: 100,
    url: 'www.blog.com',
    user,
  }

  const handleLike = jest.fn()
  const handleRemove = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={handleLike}
        handleRemove={handleRemove}
      />
    )
  })

  test('at start shows blog title and author and not url, author, likes', () => {
    const blogShown = component.container.querySelector('.visibleContent')
    const blogHidden = component.container.querySelector('.hiddenContent')

    expect(blogShown).not.toHaveStyle('display: none')
    expect(blogHidden).toHaveStyle('display: none')
  })

  test('shows content when view button clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const blogShown = component.container.querySelector('.visibleContent')
    const blogHidden = component.container.querySelector('.hiddenContent')

    expect(blogShown).not.toHaveStyle('display: none')
    expect(blogHidden).not.toHaveStyle('display: none')
  })

  test('if like button is clicked twice, the like event handler is called twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
