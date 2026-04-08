type Props = {
  onOpenLogin: () => void
  onOpenRegister: () => void
  onLogout: () => void
  isLoggedIn: boolean
}

function Header({ onOpenLogin, onOpenRegister, onLogout, isLoggedIn }: Props) {
  return (
    <header className="header">
      <div className="header-top">
        {!isLoggedIn ? (
          <div className="auth-buttons">
            <button onClick={onOpenLogin}>Вхід</button>
            <button onClick={onOpenRegister}>Реєстрація</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={onLogout}>Вихід</button>
          </div>
        )}
      </div>

      <div className="header-content">
        <h1>Магазин кімнатних рослин у горщиках</h1>
      </div>
    </header>
  )
}

export default Header