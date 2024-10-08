import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title,
			author,
			url,
		})

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit={addBlog}>
				<div>
					title:
					<input
						id="title"
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
						placeholder="write title here"
					/>
				</div>
				<div>
					author:
					<input
						id="author"
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
						placeholder="write author here"
					/>
				</div>
				<div>
					url:
					<input
						id="url"
						type="text"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
						placeholder="write url here"
					/>
				</div>
				<button id="create-blog" type="submit">
					create
				</button>
			</form>
		</div>
	)
}

export default BlogForm
