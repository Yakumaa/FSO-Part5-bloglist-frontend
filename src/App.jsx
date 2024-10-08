import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const Notification = ({ message, type }) => {
	if (message === null) {
		return null
	}

	let className = 'success'
	if (type === 'error') {
		className = 'error'
	}

	return (
		<>
			<div id="notification" className={className}>
				{message}
			</div>
		</>
	)
}

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)
	const [messageType, setMessageType] = useState('')
	const [loginVisible, setLoginVisible] = useState(false)
	const [refreshBlog, setRefreshBlog] = useState(false)

	useEffect(() => {
		blogService.getAll().then((blogs) => {
			console.log(blogs)
			setBlogs(sortBlogs(blogs))
		})
	}, [refreshBlog])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			console.log(user)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const addBlog = (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility()
			blogService.create(blogObject).then((returnedBlog) => {
				setBlogs(blogs.concat(returnedBlog))
				setMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
				setMessageType('success')
				setRefreshBlog(!refreshBlog)
				setTimeout(() => {
					setMessage(null)
				}, 5000)
			})
		} catch (exception) {
			setMessage(`Error adding blog: ${exception}`)
			setMessageType('error')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const updateBlog = async (id, blogObject) => {
		try {
			const returnedBlog = await blogService.edit(id, blogObject)
			setBlogs(sortBlogs(blogs.map((blog) => (blog.id !== id ? blog : { ...returnedBlog, user: blog.user }))))
			setRefreshBlog(!refreshBlog)
		} catch (exception) {
			setMessage(`Error updating blog: ${exception}`)
			setMessageType('error')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const deleteBlog = async (id) => {
		try {
			await blogService.deleteBlog(id)
			setBlogs(sortBlogs(blogs.filter((blog) => blog.id !== id)))
			setRefreshBlog(!refreshBlog)
			setMessage('Blog deleted')
			setMessageType('success')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch (exception) {
			setMessage(`Error deleting blog: ${exception}`)
			setMessageType('error')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			console.log('Wrong credentials')
			setMessage('Wrong username or password')
			setMessageType('error')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const loginForm = () => {
		const hideWhenVisible = { display: loginVisible ? 'none' : '' }
		const showWhenVisible = { display: loginVisible ? '' : 'none' }

		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setLoginVisible(true)}>Login</button>
				</div>

				<div style={showWhenVisible}>
					<LoginForm
						username={username}
						password={password}
						handleUsernameChange={({ target }) => setUsername(target.value)}
						handlePasswordChange={({ target }) => setPassword(target.value)}
						handleSubmit={handleLogin}
					/>
					<button onClick={() => setLoginVisible(false)}>cancel</button>
				</div>
			</div>
		)
	}

	const blogFormRef = useRef()

	const blogFrom = () => (
		<Togglable buttonLabel="new blog" ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	)

	const sortBlogs = (blogs) => {
		return blogs.sort((a, b) => b.likes - a.likes)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={message} type={messageType} />
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>{user.name} logged-in</p>
					<button id="logout" onClick={handleLogout}>
						logout
					</button>
					{blogFrom()}

					{blogs.map(
						(blog) => {
							console.log(blog)
							return <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
						}

						// <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
					)}
				</div>
			)}
		</div>
	)
}

export default App
