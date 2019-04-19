// @flow

const debug = require("debug")("Leeruniek:LUTabs")

import * as React from "react"
import cx from "classnames"
import { isEmpty, map } from "@leeruniek/functies"

import { LUTabsItem } from "./tabs-item"

import css from "./tabs.module.css"

type LUTabsPropsType = {
  className?: string,
  type?: "default" | "small",
  tabs: {
    id: string | number,
    label: string,
    icon?: string,
    iconActive?: string,
  }[],
  selectedId?: number,
  addTabLabel?: string,
  newTabName?: string,
  hasAdd?: boolean,
  isAdding?: boolean,
  onAddClick?: Function,
  onChange: Function,
}

export const LUTabs = React.memo<LUTabsPropsType>(({
    className = "",
    type = "default",
    tabs,
    selectedId,
    addTabLabel,
    newTabName = "",
    hasAdd = false,
    isAdding = false,
    onAddClick,
    onChange,
  }: LUTabsPropsType) => {
    const handleTabClick = id => {
      !isEmpty(id) && onChange && onChange(id)
    }

    return (
      <nav className={cx(css.tabs, className)}>
        <ul>
          {map(tab => (
            <LUTabsItem
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              iconActive={tab.iconActive}
              isActive={tab.id === selectedId}
              onClick={handleTabClick}
            />
          ))(tabs)}
          {hasAdd && !isAdding ? (
            <LUTabsItem
              className={css["tab--add"]}
              id=""
              label={addTabLabel}
              icon="fa-plus-circle"
              isActive={false}
              onClick={onAddClick}
            />
          ) : null}
          {isAdding ? (
            <LUTabsItem
              className={css["tab--adding"]}
              id=""
              label={isEmpty(newTabName) ? "..." : newTabName}
              icon="fa-plus-circle"
              isActive={true}
            />
          ) : null}
        </ul>
      </nav>
    )
  }
)

// export class LUTabs extends React.Component {
//   static propTypes = {
//     className: PropTypes.string,
//     type: PropTypes.oneOf(["default", "small"]),
//     tabs: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//           .isRequired,
//         label: PropTypes.string.isRequired,
//         icon: PropTypes.string,
//         iconActive: PropTypes.string,
//       })
//     ).isRequired,
//     selectedId: PropTypes.number,

//     // add
//     addTabLabel: PropTypes.string,
//     newTabName: PropTypes.string,
//     hasAdd: PropTypes.bool,
//     isAdding: PropTypes.bool,
//     onAddClick: PropTypes.func,

//     onChange: PropTypes.func.isRequired,
//   }

//   // Defaults for non-required props
//   static defaultProps = {
//     className: "",
//     type: "default",
//     selectedId: null,
//     addTabLabel: null,
//     newTabName: "",
//     hasAdd: false,
//     isAdding: false,
//     onAddClick: null,
//   }

//   /**
//    * This function will be called internally with next values of props, state
//    * and object. Developer can use those to verify that the change requires a
//    * re-render or not and return false to prevent the re-rendering from
//    * happening. In other case, you are expected to return true.
//    *
//    * DO
//    *  - use for increasing performance of poor performing Components
//    *
//    * DON’T
//    *  - cause any side effects (AJAX calls etc.)
//    *  - call this.setState
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
//   render() {
//     const {
//       className,
//       tabs,
//       selectedId,
//       addTabLabel,
//       newTabName,
//       hasAdd,
//       isAdding,
//       onAddClick,
//     } = this.props

//     return (
//       <nav className={cx(css.tabs, className)}>
//         <ul>
//           <For each="tab" index="index" of={tabs}>
//             <LUTabsItem
//               key={tab.id}
//               id={tab.id}
//               label={tab.label}
//               icon={tab.icon}
//               iconActive={tab.iconActive}
//               isActive={tab.id === selectedId}
//               onClick={this.handleTabClick}
//             />
//           </For>
//           <If condition={hasAdd && !isAdding}>
//             <LUTabsItem
//               className={css["tab--add"]}
//               id=""
//               label={addTabLabel}
//               icon="fa-plus-circle"
//               isActive={false}
//               onClick={onAddClick}
//             />
//           </If>
//           <If condition={isAdding}>
//             <LUTabsItem
//               className={css["tab--adding"]}
//               id=""
//               label={isEmpty(newTabName) ? "..." : newTabName}
//               icon="fa-plus-circle"
//               isActive={true}
//             />
//           </If>
//         </ul>
//       </nav>
//     )
//   }

//   /**
//    * { lambda_description }
//    *
//    * @param  {integer|string}  id  Tab id
//    *
//    * @return {undefined}
//    */
//   handleTabClick = id => {
//     const { onChange } = this.props

//     !isEmpty(id) && onChange && onChange(id)
//   }
// }
