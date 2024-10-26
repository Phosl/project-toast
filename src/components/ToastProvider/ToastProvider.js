import React from 'react'

export const ToastContext = React.createContext()

function ToastProvider({children}) {
  const [toasts, setToasts] = React.useState([
    {
      message: 'hello',
      variant: 'notice',
      id: crypto.randomUUID(),
    },
    {
      message: 'Success!',
      variant: 'success',
      id: crypto.randomUUID(),
    },
  ])
  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        message,
        variant,
        id: crypto.randomUUID(),
      },
    ]
    setToasts(nextToasts)
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id
    })
    setToasts(nextToasts)
  }

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToasts([])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <ToastContext.Provider value={{toasts, createToast, dismissToast}}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
