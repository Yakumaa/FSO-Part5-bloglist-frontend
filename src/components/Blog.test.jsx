import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component tests', () => {
	let blog = {
		title: 'Test title',
		author: 'Test author',
		url: 'http://test.url',
		likes: 0,
	}

	let user = {
		username: 'testuser',
		name: 'Test User',
	}

	test('renders content', () => {
		const component = render(<Blog blog={blog} user={user} />).container
		const div = component.querySelector('.blog')
		expect(div).toHaveTextContent('Test title Test author')
	})
})
