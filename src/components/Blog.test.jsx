import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

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
		const div = component.querySelector('.whenHidden')
		expect(div).toHaveTextContent('Test title Test author')
	})

	test('renders content after clicking view button', () => {
		const component = render(<Blog blog={blog} user={user} />).container
		const button = screen.getByText('view')
		userEvent.click(button)

		const div = component.querySelector('.whenShown')
		expect(div).toHaveTextContent('http://test.url')
		expect(div).toHaveTextContent('likes: 0')
	})
})
