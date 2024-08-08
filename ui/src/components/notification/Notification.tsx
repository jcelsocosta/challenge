import React from 'react'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import styles from './Notification.module.css'

export interface INotificationProps extends React.ComponentPropsWithoutRef<'div'> {}

export function notifySuccess(text: string): void {
  toast.success(text)
}

export function notifyError(text: string): void {
  toast.error(text)
}

export function notifyWarn(text: string): void {
  toast.warn(text)
}

export function notifyInfo(text: string): void {
  toast.info(text)
}

export function notifyDefault(text: string): void {
  toast(text, {
    theme: 'dark',
    progressClassName: styles['progress-bar-custom']
  })
}

export default function Notification({}: INotificationProps) {
  return (
    <div className="block">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className={'z-60'}
      />
    </div>
  )
}
