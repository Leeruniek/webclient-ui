import React from "react"
import { storiesOf } from "@storybook/react"
import { LUButton } from "./button"

const handleClick = () => {
  alert("Hi, I'm LUButton")
}

storiesOf("LUButton", module)
  .add("Simple button", () => (
    <LUButton label="LUButton" onClick={handleClick} />
  ))
  .add("LU app style button", () => (
    <LUButton
      label="LUButton"
      isPrimary={true}
      isNeutral={true}
      hasRipple={true}
      isRaised={true}
      onClick={handleClick}
    />
  ))
  .add("props: {isPrimary: true}", () => (
    <LUButton label="LUButton" isPrimary={true} onClick={handleClick} />
  ))
  .add("props: {isNeutral: true}", () => (
    <React.Fragment>
      <LUButton label="LUButton" isNeutral={true} onClick={handleClick} />
    </React.Fragment>
  ))
  .add("props: {hasRipple: true}", () => (
    <React.Fragment>
      <LUButton label="LUButton" hasRipple={true} onClick={handleClick} />
    </React.Fragment>
  ))
  .add("props: {isRaised: true}", () => (
    <React.Fragment>
      <LUButton label="LUButton" isRaised={true} onClick={handleClick} />
    </React.Fragment>
  ))
  .add("Button with color scheme", () => (
    <React.Fragment>
      <LUButton
        label="yellow"
        color="yellow"
        isPrimary={true}
        isNeutral={true}
        hasRipple={true}
        isRaised={true}
        onClick={handleClick}
      />
      <LUButton
        label="red"
        color="red"
        isPrimary={true}
        isNeutral={true}
        hasRipple={true}
        isRaised={true}
        onClick={handleClick}
      />
      <LUButton
        label="purple"
        color="purple"
        isPrimary={true}
        isNeutral={true}
        hasRipple={true}
        isRaised={true}
        onClick={handleClick}
      />
    </React.Fragment>
  ))
