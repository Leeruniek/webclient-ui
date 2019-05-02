// @flow

const debug = require("debug")("Leeruniek:LULoader")

import * as React from "react"

import css from "./loader.module.css"

type LULoaderPropsType = {
  isLoading: boolean,
  children: React.Node,
}

export const LULoader = ({
  isLoading,
  children,
}: LULoaderPropsType): React.Node =>
  isLoading ? (
    <div className={css.loader}>
      <div className={css.loader__spinner1} />
      <div className={css.loader__spinner2} />
    </div>
  ) : (
    children
  )
