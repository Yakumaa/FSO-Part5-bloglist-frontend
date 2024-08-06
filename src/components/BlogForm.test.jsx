import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'vitest'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const createBlog = vi.fn()
	const user = userEvent.setup()

	render(<BlogForm createBlog={createBlog} />)

	const title = screen.getByPlaceholderText('write title here')
	const author = screen.getByPlaceholderText('write author here')
	const url = screen.getByPlaceholderText('write url here')
	const sendButton = screen.getByText('create')

	await user.type(title, 'Test title')
	await user.type(author, 'Test author')
	await user.type(url, 'http://test.url')
	await user.click(sendButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('Test title')
	expect(createBlog.mock.calls[0][0].author).toBe('Test author')
	expect(createBlog.mock.calls[0][0].url).toBe('http://test.url')
})
