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
