'use client'

interface ConfirmDeleteButtonProps {
  id: string
  confirmMessage: string
}

export default function ConfirmDeleteButton({ id, confirmMessage }: ConfirmDeleteButtonProps) {
  return (
    <button
      id={id}
      type="submit"
      onClick={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault()
      }}
      className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
    >
      حذف
    </button>
  )
}
