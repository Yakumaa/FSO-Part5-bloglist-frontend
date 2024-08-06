import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
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

	const addLike = () => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		updateBlog(blog.id, updatedBlog)
	}

	const removeBlog = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			deleteBlog(blog.id)
		}
	}

	return (
		<div style={blogStyle}>
			<div style={hideWhenVisible} className="blog">
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>view</button>
			</div>
			<div style={showWhenVisible}>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>hide</button> <br />
				<p>{blog.url}</p>
				<p>
					likes: {blog.likes}
					<button onClick={addLike}>like</button> <br />
				</p>
				<p>{blog.user?.name}</p>
				{blog.user?.username === user.username && <button onClick={removeBlog}>remove</button>}
			</div>
		</div>
	)
}

export default Blog
