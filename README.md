# webclient-ui

> Pure UI components

---

<!-- MarkdownTOC levels="1,2,3" autolink="true" indent="  " -->

- [Install](#install)
- [Use](#use)
- [Develop](#develop)
- [Changelog](#changelog)
  - [0.1.1 - 12 December](#011---12-december)

<!-- /MarkdownTOC -->

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

### 0.1.1 - 12 December

Make components usable (with styles) in other projects

#### Add

- Install [`postcss-cli`](https://github.com/postcss/postcss-cli) and compiling css before npm publish

#### Change

- Cleanup [`variables.css`](src/styles/variables.css)
- Rework [`checkbox.css`](src/checkbox/checkbox.css) to use only existing variables
