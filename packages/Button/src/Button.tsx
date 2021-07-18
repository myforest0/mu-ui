import * as React from 'react'
import './index.less'

interface IButton {
  text?: string
  children?: JSX.Element
}

export default function Button(props: IButton) {
  const { text, children } = props

  return (
    <div className="rs-button">
      <button>{text || children}</button>
    </div>
  )
}
