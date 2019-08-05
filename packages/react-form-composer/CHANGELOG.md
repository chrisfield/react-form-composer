# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
No unreleased changes for you to be aware of.

## [2.5.14] - 2019-08-5
### Fixed
- Fix bug in Scope causing none-scoped fieldnames to be prefixed with undefined

## [2.5.13] - 2019-08-4
### Fixed
- Refactor useScope adding an optional field-name param.

## [2.5.12] - 2019-08-4
### Fixed
- Update Checkbox and Radio ui-components so they no longer pass touched and error props to the dom input.

## [2.5.11] - 2019-08-4
### Fixed
- The ValidationMessage ui-component now calls the useScope hook so it can do things like find validation messages in ArrayFields that add a Scope.

## [2.5.10] - 2019-08-3
### Fixed
- Readme/docs no code changes.

## [2.5.9] - 2019-08-3
### Fixed
- Checkbox ui-component

## [2.5.8] - 2019-08-3
### Fixed
- Prevent console warning for Radio and Checkbox ui-components - was accidently passing handleBlur to the dom element
- Prevent console warning on Select ui-component

## [2.5.7] - 2019-08-2
### Fixed
- Update ValidationMessage to include render prop and function-as-child 

## [2.5.6] - 2019-08-2
### Fixed
- The ValidationMessage ui-component now looks from formErrors as well as fieldStatus errors.
- Improve docs.

## [2.5.5] - 2019-08-2
### Fixed
- Set default to false on ui-components/Checkbox.

## [2.5.4] - 2019-08-2
### Fixed
- Refactor ui-components to separate files.

## [2.5.3] - 2019-08-2
### Fixed
- Improve docs.

## [2.5.2] - 2019-08-1
### Fixed
- Update Text ui-component so when type='number' the state is converted to Number.

## [2.5.1] - 2019-08-1
### Fixed
- Pass ref to built-in ui components: Radio Checkbox. 

## [2.5.0] - 2019-08-1
### Added
- Built-in ui components: Text, TextArea, RadioGroup, Radio Checkbox, Select, ValidationMessage. 

## [2.4.6] - 2019-07-6
### Fixed
- No need to scroll to first error if it is already visible. 

## [2.4.5] - 2019-07-5
### Fixed
- Bug in scroll to first error scrolling too long after the form error happens. 

## [2.4.4] - 2019-07-5
### Fixed
- Scroll to first error on submit is now smooth 
### Added
- onSubmitError prop to Form in case you want to replace the scroll to error behaviour

## [2.4.3] - 2019-07-5
### Fixed
- Correct URL in README - no code change

## [2.4.2] - 2019-07-5
### Added
- Add getFields to the formApi object (the one passed to onMount, onSubmitSuccess etc).
- Add code for CRUD example to README

## [2.4.1] - 2019-07-4
### Added
- Update README - no code changes. 

## [2.4.0] - 2019-07-4
### Added
- Add onMount and onUnmount props to Form 

## [2.3.3] - 2019-07-3
### Added
- Update README - no code changes. 

## [2.3.2] - 2019-07-1
### Added
- Remove unused variable in Form

## [2.3.1] - 2019-06-30
### Added
- Remove an accidental console.log

## [2.3.0] - 2019-06-30
### Added
- I've spilt Form-Context-Provider out from Form. This allows Form-Context-Provider to be used as a kind of placeholder container for Fields that are not yet in a Form. See the  introduction/row-editor for for an example.

## [2.2.8] - 2019-06-28
### Fixed
- Update Field to overwite undefined state with the Fields default value. This was mainly an issue after dispatching an updateFields action to clear fields which wiped out the fieldValues in state.

## [2.2.7] - 2019-06-27
### Fixed
- Dispatching updateFields action now resets the state.fieldValues using the rendered fields 

## [2.2.6] - 2019-06-27
### Added
- defaultValue prop to Field

## [2.2.5] - 2019-06-25
### Fixed
- Allow nested Scopes. Scope now prefixes it's name with the name of its parent Scope (if there is one).

## [2.2.4] - 2019-06-24
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
