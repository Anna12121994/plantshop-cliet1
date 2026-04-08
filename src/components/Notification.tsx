type Props = {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

function Notification({ message, type, onClose }: Props) {
  if (!message) return null

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  )
}

export default Notification