# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
No unreleased changes for you to be aware of.

## [2.0.1] - 2019-06-16
### Changed
- Update README to include build-status badge from travis-ci.com.

## [2.0.0] - 2019-06-16
### Changed
- Form onSubmit prop functions should now return an errors object rather than than throwing a submission-error.
- Rename the Field useTargetCondition prop to ignoreTargetValueUnless

## [1.1.1] - 2019-06-15
### Fixed
- Remove dependency on is-promise and lodash.topath

## [1.1.0] - 2019-06-14
### Added
- New Scope component that can be used to group the state of related fields.

## [1.0.1] - 2019-06-13
### Fixed
- Tidy up code for field-array.

## [1.0.0] - 2019-06-13
### Added
- Initial release. This is a rename/rebrand of [redux-formkit](https://www.npmjs.com/package/redux-formkit).
