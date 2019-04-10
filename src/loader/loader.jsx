// @flow

const debug = require("debug")("Leeruniek:LULoader")

import * as React from "react"

import css from "./loader.module.css"

export const LULoader = ({
  isLoading,
  children,
}: {
  isLoading: boolean,
  children: React.Node,
}): React.Node =>
  isLoading ? (
    <div className={css.loader}>
      <div className={css.loader__spinner1} />
      <div className={css.loader__spinner2} />
    </div>
  ) : (
    children
  )
