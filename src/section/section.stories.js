import React from "react"
import { storiesOf } from "@storybook/react"
import { LUSection } from "./section"

const SectionContent = () => (
  <div>
    <b>Guard:</b> <span>Halt! Who goes there?</span>
    <br />
    <b>King Arthur:</b>{" "}
    <span>
      It is I, Arthur, son of Uther Pendragon, from the castle of Camelot. King
      of the Britons, defeater of the Saxons, Sovereign of all England!
    </span>
    <br />
    <b>Guard:</b> <span>Pull the other one!</span>
    <br />
    <b>King Arthur:</b>{" "}
    <span>
      I am, and this is my trusty servant Patsy. We have ridden the length and
      breadth of the land in search of knights who will join me in my court at
      Camelot. I must speak with your lord and master.
    </span>
    <br />
    <b>Guard:</b> <span>What, Ridden on a horse?</span>
    <br />
    <b>King Arthur:</b> <span>Yes!</span>
    <br />
    <b>Guard:</b> <span>You're using coconuts!</span>
    <br />
    <b>King Arthur:</b> <span>What?</span>
    <br />
    <b>Guard:</b>{" "}
    <span>
      You've got two empty halves of coconuts and your bangin' 'em together.
    </span>
  </div>
)

const actions = [
  {
    label: "action 1",
    isPrimary: true,
    isRaised: true,
    isVisible: true,
    onClick: () => {},
  },
  {
    label: "action 2",
    isPrimary: true,
    isRaised: true,
    isVisible: true,
    onClick: () => {},
  },
]

storiesOf("LUSection", module)
  .add("LUSection", () => (
    <LUSection>
      <SectionContent />
    </LUSection>
  ))
  .add("LUSection with title", () => (
    <LUSection title="LUSection">
      <SectionContent />
    </LUSection>
  ))
  .add("LUSection with actions", () => (
    <LUSection title="LUSection" actions={actions}>
      <SectionContent />
    </LUSection>
  ))
  .add("LUSection is loading", () => (
    <LUSection isLoading={true}>
      <div />
    </LUSection>
  ))
  .add("LUSection as sub section", () => (
    <LUSection isSubsection={true}>
      <SectionContent />
    </LUSection>
  ))
