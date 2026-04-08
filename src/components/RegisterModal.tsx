import { useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  showMessage: (text: string, type: 'success' | 'error') => void
}

function RegisterModal({ isOpen, onClose, showMessage }: Props) {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    const response = await fetch('https://localhost:7016/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, email, password })
    })

    if (!response.ok) {
      showMessage('Помилка реєстрації', 'error')
      return
    }

    showMessage('Реєстрація успішна', 'success')
    onClose()
    setUserName('')
    setEmail('')
    setPassword('')
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Реєстрація</h2>

        <input
          type="text"
          placeholder="Ім’я"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

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

        <button className="modal-action-btn" onClick={handleRegister}>
          Зареєструватися
        </button>
      </div>
    </div>
  )
}

export default RegisterModal