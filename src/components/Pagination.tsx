type Props = {
  page: number
  totalPages: number
  setPage: (value: number) => void
}

function Pagination({ page, totalPages, setPage }: Props) {
  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Назад
      </button>

      <span>Сторінка {page} з {totalPages}</span>

      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        Далі
      </button>
    </div>
  )
}

export default Pagination