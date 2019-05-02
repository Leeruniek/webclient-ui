// @flow

const debug = require("debug")("Leeruniek:LUTextHighlight")

import * as React from "react"
import { replace, isEmpty } from "@leeruniek/functies"

import css from "./text-highlight.module.css"

type LUTextHighlightPropsType = {
  query?: string,
  value: string,
}

export const LUTextHighlight = React.memo<LUTextHighlightPropsType>(
  ({ query = "", value }) =>
    isEmpty(query) ? (
      value
    ) : (
      <span
        dangerouslySetInnerHTML={{
          __html: replace(
            query,
            `<span class="${css.highlight}">${query}</span>`
          )(value),
        }}
      />
    )
)
