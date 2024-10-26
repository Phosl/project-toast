import React from 'react'
import { ToastContext } from '../ToastProvider'
import Button from '../Button'
import styles from './ToastPlayground.module.css'
import ToastShelf from '../ToastShelf'

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error']

function ToastPlayground() {
  const {createToast} = React.useContext(ToastContext)
  const [variant,setVariant] = React.useState(VARIANT_OPTIONS[0])
  const [message,setMessage] = React.useState('')


  function handleCreateToast(event) {
    event.preventDefault()

    createToast(message,variant)
    setMessage('')
    setVariant(VARIANT_OPTIONS[0])
  }



  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

        <ToastShelf></ToastShelf>
      <form className={styles.controlsWrapper} onSubmit={handleCreateToast}>
        <div className={styles.row}>
          <label htmlFor="message"  className={styles.label} style={{alignSelf: 'baseline'}}>
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" value={message}
            onChange={(event)=> setMessage(event.target.value)}
            className={styles.messageInput} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`
              return (
                <label key={id} htmlFor={id}>
                  <input id={id} type="radio" name="variant" value={option}
                  checked={option === variant}
                  onChange={(event)=> setVariant(option)}
                  />
                  {option}
                </label>,
              )
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>
            Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ToastPlayground
