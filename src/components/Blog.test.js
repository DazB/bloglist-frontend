import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders blog title and author', () => {
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

    const component = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={jest.fn()}
        handleRemove={jest.fn()}
      />
    )

    const blogShown = component.container.querySelector('.visibleContent')
    const blogHidden = component.container.querySelector('.hiddenContent')

    expect(blogShown).not.toHaveStyle('display: none')
    expect(blogHidden).toHaveStyle('display: none')
  })
})
