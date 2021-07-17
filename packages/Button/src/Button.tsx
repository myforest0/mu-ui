import * as React from 'react'

interface IButton {
  text?: string
  children?: JSX.Element
}

export default function Button(props: IButton) {
  const { text, children } = props

  return (
    <div>
      <button>{text || children}</button>
    </div>
  )
}
