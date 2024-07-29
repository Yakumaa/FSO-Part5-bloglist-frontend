const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlPasswordChange,
  handleSubmit
  }) => {
  return (
  <div>
  <h2>log in to application</h2>
  <form onSubmit={handleSubmit}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlPasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
  </div>
)}

export default LoginForm