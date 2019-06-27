// @flow

import * as React from "react"
import { Snackbar } from "react-toolbox/lib/snackbar/Snackbar"

import css from "./snackbar.module.css"

type LUSnackbarPropsType = {|
  type?: "accept" | "warning" | "cancel",
  label: string,
  timeout?: number,
  isActive?: boolean,
  onClick?: Function,
  onTimeout?: Function,
|}

export const LUSnackbar = ({
  type = "accept",
  label,
  timeout = 3000,
  isActive = false,
  onClick,
  onTimeout,
}: LUSnackbarPropsType): React.Node => (
  <Snackbar
    type={type}
    label={label}
    timeout={timeout}
    active={isActive}
    theme={css}
    onClick={onClick}
    onTimeout={onTimeout}
  />
)
