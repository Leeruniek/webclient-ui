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

// export class LUActions extends React.Component {
//   static propTypes = {
//     className: PropTypes.string,
//     actions: PropTypes.arrayOf(
//       PropTypes.shape({
//         ...LUButton.propTypes,
//         isVisible: PropTypes.bool,
//       })
//     ).isRequired,
//     type: PropTypes.oneOf(["default", "small"]),
//     align: PropTypes.oneOf(["left", "right"]),
//     isBlock: PropTypes.bool,
//     hasSeparator: PropTypes.bool,
//     hasSeparatorLine: PropTypes.bool,
//   }

//   // Default values for non-required props
//   static defaultProps = {
//     className: null,
//     type: "default",
//     align: "left",
//     isBlock: true,
//     hasSeparator: true,
//     hasSeparatorLine: true,
//   }

//   /**
//    * Invoked before rendering when new props or state are being received.
//    * Defaults to true. This method is not called for the initial render or when
//    * forceUpdate() is used.
//    *
//    * Use shouldComponentUpdate() to let React know if a component’s output is
//    * not affected by the current change in state or props. The default
//    * behavior is to re-render on every state change, and in the vast majority
//    * of cases you should rely on the default behavior.
//    *
//    * @param  {Object}  nextProps  The next properties
//    * @param  {Object}  nextState  The next state
//    *
//    * @return {boolean}
//    */
//   shouldComponentUpdate(nextProps, nextState) {
//     const hasPropsChanged = !isDeepEqual(this.props, nextProps)
//     const hasStateChanged = !isDeepEqual(this.state, nextState)

//     return hasPropsChanged || hasStateChanged
//   }

//   /**
//    * When called, it should examine this.props and this.state and return a
//    * single React element. This element can be either a representation of a
//    * native DOM component, such as <div />, or another composite component
//    * that you've defined yourself.
//    *
//    * @return {Component}
//    */
//   render = () => {
//     // overwrite button type with actions.type
//     const {
//       className,
//       actions,
//       type,
//       align,
//       isBlock,
//       hasSeparator,
//       hasSeparatorLine,
//     } = this.props

//     const visibleActions = actions.filter(action => action.isVisible !== false)

//     return isEmpty(visibleActions) ? null : (
//       <span
//         className={cx(
//           className,
//           css[`actions--${align}`],
//           css[`actions--${type}`],
//           {
//             [css["actions--block"]]: isBlock,
//           }
//         )}>
//         <For index="idx" each="action" of={visibleActions}>
//           <LUButton
//             key={`actions-button-${action.label}-${idx}`}
//             {...Object.assign({}, action, { type })}
//           />

//           <If condition={hasSeparator && idx !== visibleActions.length - 1}>
//             <span
//               className={cx({
//                 [css[`actions__separator--${type}`]]: hasSeparator,
//                 [css.actions__separator__line]: hasSeparatorLine,
//               })}
//             />
//           </If>
//         </For>
//       </span>
//     )
//   }
// }
