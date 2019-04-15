// @flow

const debug = require("debug")("Leeruniek:LUSection")

import * as React from "react"
import cx from "classnames"
import Scrollbars from "react-custom-scrollbars"
import { isEmpty, is } from "@leeruniek/functies"

import { LUProgressBar } from "../progress-bar/progress-bar"
import { LUActions } from "../actions/actions"
import { LUErrorBoundary } from "../error-boundary/error-boundary"
import { LULoaderOverlay } from "../loader-overlay/loader-overlay"

import css from "./section.module.css"

import type { ActionType } from "../actions/actions"

type LUSectionPropsType = {|
  className?: string,
  title?: string | React.Node,
  icon?: string,
  children: React.Node[] | React.Node,
  actions?: ActionType[],
  actionsClassName?: string,
  errorMsg?: string,

  scrollBarAutoHeight?: boolean,
  scrollBarAutoHeightMax?: string,

  isSubsection?: boolean,
  isLoading?: boolean,
  isDisabled?: boolean,
  hasScrollbar?: boolean,
|}

export const LUSection = ({
  className,
  title,
  icon,
  children,
  actions,
  actionsClassName,
  errorMsg = "Er is een probleem opgetreden. Ververs de pagina of neem contact met ons op via de feedback-knop. Wij helpen je graag weer verder!",
  scrollBarAutoHeight = false,
  scrollBarAutoHeightMax = "200px",
  isSubsection = false,
  isLoading = false,
  isDisabled = false,
  hasScrollbar = false,
}: LUSectionPropsType): React.Node => (
  <section
    className={cx(css.section, {
      [className]: !!className,
      [css["sub-section"]]: isSubsection,
      [css["section--disabled"]]: isDisabled,
    })}>
    <LUProgressBar
      className={css.progress}
      mode="indeterminate"
      isVisible={isLoading}
    />

    <LULoaderOverlay isTransparent={isLoading} isVisible={isLoading} />

    {is(title) ? (
      <div className={css.section__title}>
        {is(icon) ? <i className={cx("fa", css.section__icon, icon)} /> : null}
        {title}
        {!isEmpty(actions) ? (
          <React.Fragment>
            <span className={css.separator} />
            <LUActions
              className={cx(css.section__actions, actionsClassName)}
              actions={actions}
              isBlock={false}
              hasSeparator={true}
              hasSeparatorLine={false}
            />
          </React.Fragment>
        ) : null}
      </div>
    ) : null}

    <div
      className={cx(css.section__content, {
        [css["section__content--no-title"]]: isEmpty(title),
      })}>
      <LUErrorBoundary message={errorMsg}>
        {hasScrollbar ? (
          <Scrollbars
            autoHeight={scrollBarAutoHeight}
            autoHeightMax={scrollBarAutoHeightMax}>
            {children}
          </Scrollbars>
        ) : (
          children
        )}
      </LUErrorBoundary>
    </div>
  </section>
)
