// @flow

import * as React from "react"
import cx from "classnames"
import Ripple from "../../node_modules/react-toolbox/lib/ripple"

import css from "./tabs.module.css"
import { is } from "@leeruniek/functies"

type LUTabsItemPropsTypes = {
  className?: string,
  id: number | string,
  label: string,
  icon?: string,
  iconActive?: string,
  isActive?: boolean,
  onClick?: Function,
}

// eslint-disable-next-line
const NavItem = Ripple( { spread: 1 } )( props => {
  const { children } = props

  return <li {...props}>{children}</li>
})

export const LUTabsItem = ({
  className,
  id,
  label,
  icon,
  iconActive,
  isActive = false,
  onClick,
}: LUTabsItemPropsTypes): React.Node => {
  const [spamClickCount, setSpamClickCount] = React.useState(0)
  const [isHover, setHover] = React.useState(false)
  const [shouldBlink, setBlink] = React.useState(false)

  React.useEffect(() => {
    if (shouldBlink) {
      const blinkTimer = setTimeout(() => {
        setBlink(false)
      }, 400)

      clearTimeout(blinkTimer)
    }
  }, [shouldBlink])

  const handleClick = () => {
    // if spamming same button just blink
    if (isActive) {
      setBlink(true)
      setSpamClickCount(spamClickCount + 1)
    }
    onClick && !isActive && onClick(id)
  }

  return (
    <NavItem
      className={cx(className, css.tab, {
        [css["tab--active"] || ""]: isActive,
        [css["tab--blink"] || ""]: shouldBlink,
      })}
      onClick={handleClick}>
      <div className={css.tab__label} title={label}>
        {is(icon) ? (
          <i
            className={cx("fa", icon, css.tab__icon, {
              [css["tab__icon--active"] || ""]: isActive,
              [iconActive || ""]: isActive && iconActive,
            })}
          />
        ) : null}
        {label}
      </div>
    </NavItem>
  )
}
