import { storiesOf } from '@storybook/react';

import introduction from './introduction';
import simpleForm from './introduction/simple-form';

import arrayForm from './forms/array-form';
import renderProps from './forms/render-props';
import nextServerRendering from './forms/next-server-rendering';
import reactNative from './forms/react-native';

import apiForFormStateProvider from './api/form-state-provider';
import apiForForm from './api/form';
import apiForField from './api/field';
import apiForHooks from './api/hooks';

storiesOf('Introduction', module)
.add('Getting Started', introduction)
.add('Simple Form', simpleForm);

storiesOf('Forms', module)
.add('Array Form', arrayForm)
.add('Render Props', renderProps)
.add('Next Server Rendering', nextServerRendering)
.add('React Native', reactNative);

storiesOf('Api', module)
.add('FormStateProvider', apiForFormStateProvider)
.add('Form', apiForForm)
.add('Field', apiForField)
.add('Hooks', apiForHooks);