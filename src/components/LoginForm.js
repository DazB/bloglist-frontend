import React from 'react'
import Notification from './Notification'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  notification,
  username,
  password,
}) => (
  <form onSubmit={handleLogin}>
    <h2>Log in to application</h2>
    <Notification notification={notification} />
    <div>
      username
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button id="login-button" type="submit">
      login
    </button>
  </form>
)

export default LoginForm
