// @flow

const debug = require("debug")("Leeruniek:LUDialog")

import React from "react"
import cx from "classnames"
import { Dialog } from "react-toolbox/lib/dialog/Dialog"
import { is } from "@leeruniek/functies"

import { LUProgressBar } from "../progress-bar/progress-bar"
import { LUActions } from "../actions/actions"
import { usePrevious } from "../utils/react.utils"

import css from "./dialog.module.css"

import type { ActionType } from "../actions/actions"

export const LUDialog = ({
  title,
  color,
  icon,
  children,
  actions = [],
  isLoading = false,
  isVisible,
  onCancel,
  onOpen
} : {
  title: string | React.Node | React.Node[],
  color?: "yellow" | "red",
  icon?: string,
  children: React.Node,
  actions?: ActionType[],
  isLoading?: boolean,
  isVisible: boolean,
  onCancel: Function,
  onOpen?: Function
}) => {

  const handleOpen = ({ wasVisible, isVisible } : {wasVisible: boolean, isVisible: boolean}):void => {
    onOpen && isVisible && !wasVisible && onOpen()
  }

  React.useEffect(() => {
    handleOpen({
      wasVisible: false,
      isVisible: isVisible,
    })
  }, [])

  const prevIsVisibleProp = usePrevious({ isVisible })

  React.useEffect(() => {
    handleOpen({
      wasVisible: prevIsVisibleProp.isVisible,
      isVisible: isVisible,
    })
  }, [isVisible])

  return (
    <Dialog
      className={cx({
        [css[`dialog--${color}`] || ""]: is(color),
      })}
      active={isVisible}
      onEscKeyDown={onCancel}
      onOverlayClick={onCancel}
      theme={css}>
      <LUProgressBar
        isVisible={isLoading}
        color={color}
        className={css.dialog__progress}
        mode="indeterminate"
      />

      <h6 className={css.title}>
        {is(icon)? <i className={cx("fa", icon, css.dialog__icon)} /> : null}
        {title}
        <span className={css.dialog__close} onClick={onCancel} />
      </h6>
      <div className={css.dialog__content}>{children}</div>
      <nav className={css.dialog__navigation} role="navigation">
        <LUActions
          actions={actions}
          align="right"
          hasSeparator={true}
          hasSeparatorLine={false}
        />
      </nav>
    </Dialog>
  )
}
