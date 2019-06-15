import { storiesOf } from '@storybook/react';

import introduction from './introduction';
import uiComponents from './introduction/ui-components';
import scopes from './introduction/scopes';
import arrayForm from './introduction/array-form';
import formRenderProps from './introduction/form-render-props';

import withRedux from './form-examples/with-redux';
import nextServerRendering from './form-examples/next-server-rendering';
import universalValidation from './form-examples/universal-validation';
import reactNative from './form-examples/react-native';

import apiForFormStateProvider from './api/form-state-provider';
import apiForForm from './api/form';
import apiForScope from './api/scope';
import apiForField from './api/field';
import apiForHooks from './api/hooks';

storiesOf('Introduction', module)
.add('A Simple Form', introduction)
.add('Writting UI Components', uiComponents)
.add('Adding Scopes', scopes)
.add('Field Arrays', arrayForm)
.add('Form Render Props', formRenderProps);

storiesOf('Form Examples', module)
.add('With Redux', withRedux)
.add('Next Server Rendering', nextServerRendering)
.add('Universal Validation', universalValidation)
.add('React Native', reactNative);

storiesOf('Api', module)
.add('FormStateProvider', apiForFormStateProvider)
.add('Form', apiForForm)
.add('Scope', apiForScope)
.add('Field', apiForField)
.add('Hooks', apiForHooks);