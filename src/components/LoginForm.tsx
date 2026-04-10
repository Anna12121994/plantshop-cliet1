import { useState } from 'react'

type Props = {
  onLoginSuccess: () => void
}

function LoginForm({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const response = await fetch('http://anna0604-001-site1.ktempurl.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    if (!response.ok) {
      alert('Невірний логін або пароль')
      return
    }

    const token = await response.text()
    localStorage.setItem('token', token)

    alert('Вхід успішний')
    onLoginSuccess()
  }

  return (
    <div className="login-form">
      <h2>Вхід</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Увійти</button>
    </div>
  )
}

export default LoginForm