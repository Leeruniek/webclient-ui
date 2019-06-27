// @flow

import * as React from "react"
import { pipe, map, has, ifThen, all } from "@leeruniek/functies"

/**
 * Transform plain text new line char to html P
 *
 * @param  {string}            input  Plain text
 *
 * @return {ReactComponent[]}
 */
export const nlToP = (input: string): React.Node[] =>
  input.split("\n").map((item, key): React.Node => <p key={key}>{item}</p>)

/**
 * Transform plain text new line char to html BR
 *
 * @param  {string}  input  Plain text
 *
 * @return {string}
 */
export const nlToBR = (input: string): string =>
  input
    .split("\n")
    .map((item: string): string => `${item}<br/>`)
    .join("")

export const isOfComponentType = <T>(types: T): Function => (
  child: React.Node
): boolean =>
  Array.isArray(child)
    ? all(_ => _ === true)(map(isOfComponentType(types))(child))
    : has(
        typesHasElm =>
          child.type.prototype instanceof typesHasElm ||
          child.type === typesHasElm
      )(types)

export const oneOfComponentType = ({ types, errorMessage }) => props =>
  pipe(
    map(isOfComponentType(types)),
    ifThen(all(_ => _ === true), () => null, () => new Error(errorMessage))
  )(props.children)

export function usePrevious(value) {
  const ref = React.useRef(value)

  return ref.current
}
