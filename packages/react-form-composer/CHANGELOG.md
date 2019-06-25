# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
No unreleased changes for you to be aware of.

## [2.2.3] - 2019-06-24
### Fixed
- Fix bug in Field (from v2.2.3) that stopped server rendered forms refreshing the store value from the page on initial load.

## [2.2.3] - 2019-06-24
### Fixed
- Optimize Field so it dispatches a setFieldError only when the error (or valueToValidate) change

## [2.2.2] - 2019-06-24
### Fixed
- Updated docs/README. No code changes.

## [2.2.1] - 2019-06-22
### Fixed
- Optimize FieldArray to eliminate unnecessary rendering. Before this every Field in a FieldArray would rerender when any Field in the FieldArray changed.

## [2.2.0] - 2019-06-22
### Added
- Add FormSpy component for more efficient rendering of components using state. Use it to make ArrayField more efficient.

## [2.1.0] - 2019-06-20
### Added
- Additional logic to useField to allow the Field name prop to be omitted for Fields in a Scope. This allows a Scope to be used as a way to create a set of radio-buttons which all have the same name.

## [2.0.4] - 2019-06-19
### Fixed
- Tidy up the public interface for formApi improve docs for it.

## [2.0.3] - 2019-06-18
### Fixed
- Add getForm() to fieldInterface and getState, getDispatch to formApi.

## [2.0.2] - 2019-06-17
### Fixed
- Refactor to simplify internal details of field.getInterface()

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
