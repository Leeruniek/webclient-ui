// @flow

const debug = require("debug")("Leeruniek:LUActions")

import * as React from "react"
import cx from "classnames"
import { isEmpty } from "@leeruniek/functies"

import { LUButton } from "../button/button"

import css from "./actions.module.css"

export type ActionType = {|
  label: string,
  icon?: string,
  isPrimary?: boolean,
  isRaised?: boolean,
  isVisible?: boolean,
  onClick: Function,
|}

type LUActionsType = {|
  className?: string,
  actions: ActionType[],
  type?: "default" | "small",
  align?: "left" | "right",
  isBlock?: boolean,
  hasSeparator?: boolean,
  hasSeparatorLine?: boolean,
|}

export const LUActions = React.memo<LUActionsType>(
  ({
    className,
    actions,
    type = "default",
    align = "left",
    isBlock = true,
    hasSeparator = true,
    hasSeparatorLine = true,
  }: LUActionsType): React.Node => {
    const visibleActions = actions.filter(action => action.isVisible !== false)

    return isEmpty(visibleActions) ? null : (
      <span
        className={cx(
          className,
          css[`actions--${align}`],
          css[`actions--${type}`],
          {
            [css["actions--block"] || ""]: isBlock,
          }
        )}>
        {visibleActions.map((action, idx) => (
          <React.Fragment>
            <LUButton
              key={`actions-button-${action.label}-${idx}`}
              {...Object.assign({}, action, { type })}
            />
            {hasSeparator && idx !== visibleActions.length - 1 ? (
              <span
                className={cx({
                  [css[`actions__separator--${type}`]]: hasSeparator,
                  [css.actions__separator__line]: hasSeparatorLine,
                })}
              />
            ) : null}
          </React.Fragment>
        ))}
      </span>
    )
  }
)
