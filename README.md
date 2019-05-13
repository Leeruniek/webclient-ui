# webclient-ui

> Pure UI components

[![Coverage Status](https://coveralls.io/repos/github/Leeruniek/webclient-ui/badge.svg?branch=master)](https://coveralls.io/github/Leeruniek/webclient-ui?branch=master)

---

<!-- MarkdownTOC levels="1,2,3" autolink="true" indent="  " -->

- [Install](#install)
- [Use](#use)
- [Develop](#develop)
- [Changelog](#changelog)
  - [0.2.0 - 13 December](#020---13-december)

<!-- /MarkdownTOC -->

## Docs

Check our [storybook](https://leeruniek.github.io/webclient-ui/) to see components that we use.

## Install

```bash
npm i eslint @leeruniek/webclient-ui --save-dev
```

## Use 

```js
import { LUCheckbox } from "@leeruniek/webclient-ui"

render() {
  return <LUCheckbox label="UI component from separate repo"/>
}
```

## Develop

```bash
git clone git@github.com:leeruniek/webclient-ui.git && \
  cd webclient-ui && \
  npm run setup

# run tests (any `*.test.js`) once
npm test

# watch `src` folder for changes and run test automatically
npm run tdd
```

## Changelog

History of all changes in [CHANGELOG.md](CHANGELOG.md)

## [0.3.17] - 13 May 2019

### Fix
- Fix styles for LUButton
