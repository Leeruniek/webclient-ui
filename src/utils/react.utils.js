const debug = require("debug")("Leeruniek:ReactUtils")

import React from "react"
import PropTypes from "prop-types"
import { map, has, ifThen, all } from "@leeruniek/functies"

/**
 * Transform plain text new line char to html P
 *
 * @param  {string}            input  Plain text
 *
 * @return {ReactComponent[]}
 */
export const nlToP = input =>
  input.split("\n").map((item, key) => <p key={key}>{item}</p>)

/**
 * Transform plain text new line char to html BR
 *
 * @param  {string}  input  Plain text
 *
 * @return {string}
 */
export const nlToBR = input =>
  input
    .split("\n")
    .map(item => `${item}<br/>`)
    .join("")

/**
 * { item_description }
 */
export const listShape = {
  items: PropTypes.array.isRequired,
  errors: PropTypes.array.isRequired,

  creatingItem: PropTypes.object.isRequired,

  updatingIds: PropTypes.array.isRequired,
  deletingIds: PropTypes.array.isRequired,
  lastLoadAt: PropTypes.instanceOf(Date),

  isLoading: PropTypes.bool.isRequired,
  isReloading: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool.isRequired,
}

export const isOfComponentType = types => child =>
  Array.isArray(child)
    ? all(_ => _ === true)(map(isOfComponentType(types))(child))
    : has(
        typesHasElm =>
          child.type.prototype instanceof typesHasElm ||
          child.type === typesHasElm
      )(types)

export const oneOfComponentType = ({ types, errorMessage }) => props =>
  props.children
  |> map(isOfComponentType(types))
  |> ifThen(all(_ => _ === true), () => null, () => new Error(errorMessage))
