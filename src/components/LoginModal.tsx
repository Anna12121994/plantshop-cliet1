import { useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: () => void
  showMessage: (text: string, type: 'success' | 'error') => void
}

function LoginModal({ isOpen, onClose, onLoginSuccess, showMessage }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const response = await fetch('http://anna0604-001-site1.ktempurl.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      showMessage('Невірний логін або пароль', 'error')
      return
    }

    const rawToken = await response.text()
    const token = rawToken.replace(/^"|"$/g, '')

    localStorage.setItem('token', token)

    showMessage('Вхід успішний', 'success')
    onLoginSuccess()
    onClose()

    setEmail('')
    setPassword('')
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="close-btn" onClick={onClose}>×</button>
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

        <button className="modal-action-btn" onClick={handleLogin}>
          Увійти
        </button>
      </div>
    </div>
  )
}

export default LoginModal