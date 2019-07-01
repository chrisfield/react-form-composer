import { storiesOf } from '@storybook/react';

import introduction from './introduction';
import uiComponents from './introduction/ui-components';
import scopes from './introduction/scopes';
import arrayForm from './introduction/array-form';
import validation from './introduction/validation';
import asyncSubmission from './introduction/async-submission';
import dynamicFields from './introduction/dynamic-fields';
import RowEditor from './introduction/row-editor';
import optimization from './introduction/optimization';


import withRedux from './form-examples/with-redux';
import nextServerRendering from './form-examples/next-server-rendering';
import universalValidation from './form-examples/universal-validation';
import reactNative from './form-examples/react-native';

import apiForFormStateProvider from './api/form-state-provider';
import apiForFormContextProvider from './api/form-context-provider';
import apiForForm from './api/form';
import apiForScope from './api/scope';
import apiForField from './api/field';
import apiForSpyAndHooks from './api/spy-and-hooks';

import moreInfoFaq from './more-info/faq';
import moreInfoFormRenderProps from './more-info/form-render-props';

storiesOf('Introduction', module)
.add('A Simple Form', introduction)
.add('Writing UI Components', uiComponents)
.add('Adding Scopes', scopes)
.add('Field Arrays', arrayForm)
.add('Dynamic Fields', dynamicFields)
.add('Validation', validation)
.add('Async Submission', asyncSubmission)
.add('Row Editor', RowEditor)
.add('Optimization', optimization);

storiesOf('Form Examples', module)
.add('With Redux', withRedux)
.add('Next Server Rendering', nextServerRendering)
.add('Universal Validation', universalValidation)
.add('React Native', reactNative);

storiesOf('Api', module)
.add('FormStateProvider', apiForFormStateProvider)
.add('FormContextProvider', apiForFormContextProvider)
.add('Form', apiForForm)
.add('Scope', apiForScope)
.add('Field', apiForField)
.add('Spy and Hooks', apiForSpyAndHooks);

storiesOf('More Info', module)
.add('Form Render Props', moreInfoFormRenderProps)
.add('FAQs (changelog)', moreInfoFaq)