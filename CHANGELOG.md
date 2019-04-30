<!-- markdownlint-disable no-duplicate-header line-length -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.10] - 30 April 2019

### Change
- Remove [minimization](webpack/webpack.config.js#L50) for build


## [0.3.9] - 29 April 2019

### Fixed
- Fix typos in [externals in webpack build](webpack/webpack.config.js#L49)

## [0.3.8] - 29 April 2019

### Change
- Add react and react-dom to [externals in webpack build](webpack/webpack.config.js#L49)

## [0.3.7] - 29 April 2019

### Change
- Remove stories files from build production
- Export [LULoaderOverlay](src/components.js#L25) component

## [0.3.6] - 26 April 2019

### Change
- Replace react, react-dom, etc. from dependencies to devDependencies


## [0.3.5] - 25 April 2019

### Fixed
- Fixed colors for LUTable, LUSwitch

## [0.3.4] - 25 April 2019

### Fixed
- Fix webpack build result

## [0.3.3] - 25 April 2019

### Change
- Use webpack to build dist

## [0.3.2] - 25 April 2019

### Change
- Update corejs version

## [0.3.1] - 25 April 2019

### Fixed
- Fixed build configuration for css files

## [0.3.0] - 24 April 2019

### Add

- Add simple pure components from webclient:
  - LULoader
  - LUProgressBar
  - LUActions
  - LUDialog
  - LUErrorBoundary
  - LULegend
  - LUMessage
  - LURadio
  - LURadioGroup
  - LURadioSeparator
  - LUSection
  - LUSelect
  - LUSnackbar
  - LUSwitch
  - LUTableCell
  - LUTable
  - LUTabsItem
  - LUTabs
  - LUTag
  - LUInput

### Change
 - Build configuration for css files

## [0.2.0] - 13 December 2018

### Add

- Render LUCheckboxGroupHeader when passing label props to LUCheckboxGroup

## [0.1.2] - 13 December 2018

### Change

- Export [LUCheckboxGroupHeader](src/components.js#L4) component


## [0.1.1] - 12 December 2018

Make components usable (with styles) in other projects

### Add

- Install [`postcss-cli`](https://github.com/postcss/postcss-cli) and compiling css before npm publish

### Change

- Cleanup [`variables.css`](src/styles/variables.css)
- Rework [`checkbox.css`](src/checkbox/checkbox.css) to use only existing variables

## [0.1.0] - 12 December 2018

First

[Unreleased]: https://github.com/leeruniek/webclient-ui/compare/v0.2.0...HEAD

[0.2.0]: https://github.com/leeruniek/webclient-ui/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/leeruniek/webclient-ui/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/leeruniek/webclient-ui/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/leeruniek/webclient-ui/compare/v0.1.0
