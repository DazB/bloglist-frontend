import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('BlogForm updates state and calls event handler', () => {
    const titleText = 'Hello'
    const authorText = 'There'
    const urlText = 'www.bum.com'

    const addBlog = jest.fn()

    const component = render(<BlogForm createBlog={addBlog} />)

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const blogForm = component.container.querySelector('.blogForm')

    fireEvent.change(titleInput, {
      target: { value: titleText },
    })

    fireEvent.change(authorInput, {
      target: { value: authorText },
    })

    fireEvent.change(urlInput, {
      target: { value: urlText },
    })
    fireEvent.submit(blogForm)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(titleText)
    expect(addBlog.mock.calls[0][0].author).toBe(authorText)
    expect(addBlog.mock.calls[0][0].url).toBe(urlText)
  })
})
