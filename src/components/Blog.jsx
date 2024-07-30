import { useState } from 'react'

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	return (
		<div style={blogStyle}>
			<div style={hideWhenVisible}>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>view</button>
			</div>
			<div style={showWhenVisible}>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>hide</button> <br />
				<p>{blog.url}</p>
				<p>
					likes: {blog.likes}
					<button>like</button> <br />
				</p>
				<p>{blog.user?.name}</p>
			</div>
		</div>
	)
}

export default Blog
