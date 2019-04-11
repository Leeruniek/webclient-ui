// @flow

const debug = require("debug")("Leeruniek:LUMessage")

import * as React from "react"
import cx from "classnames"
import { isEmpty } from "@leeruniek/functies"

import css from "./message.module.css"

export const LUMessage = ({
  className,
  type = "info",
  content,
  children,
  hideAfter,
}: {
  className?: string,
  type?: "success" | "info" | "error",
  content?: string,
  children?: React.Node,
  hideAfter?: number,
}): React.Node => {
  const [isHidden, setHidden] = React.useState(false)

  const hide = () => {
    !isHidden &&
      setTimeout(() => {
        setHidden(true)
      }, hideAfter)
  }

  React.useEffect(() => {
    hideAfter && hide()
  }, [])

  React.useEffect(
    () => {
      if (hideAfter) {
        hide()
      }
    },
    [hideAfter]
  )

  return (
    <div
      className={cx(css[`message--${type}`], {
        [className || ""]: !isEmpty(className),
        [css["message--hidden"]]: isHidden,
      })}>
      <i
        className={cx("fa", css.icon, {
          "fa-check": type === "success",
          "fa-info-circle": type === "info",
          "fa-exclamation-triangle": type === "error",
        })}
      />
      {children || content}
    </div>
  )
}
