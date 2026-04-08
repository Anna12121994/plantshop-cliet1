type Props = {
  search: string
  setSearch: (value: string) => void
  category: string
  setCategory: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  onCartClick: () => void
}

function Toolbar({
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
  onCartClick
}: Props) {
  return (
    <div className="toolbar">
      <input
        type="text"
        placeholder="Пошук рослини..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Усі категорії</option>
        <option value="Сукуленти">Сукуленти</option>
        <option value="Квітучі">Квітучі</option>
        <option value="Декоративно-листяні">Декоративно-листяні</option>
        <option value="Кактуси">Кактуси</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Без сортування</option>
        <option value="price_asc">Ціна ↑</option>
        <option value="price_desc">Ціна ↓</option>
        <option value="name_asc">Назва А-Я</option>
        <option value="name_desc">Назва Я-А</option>
      </select>

      <button className="cart-btn" onClick={onCartClick}>
        🛒 Кошик
      </button>
    </div>
  )
}

export default Toolbar