import { storiesOf } from '@storybook/react';

import introduction from './introduction';
import simpleForm from './introduction/simple-form';

import arrayForm from './forms/array-form';
import renderProps from './forms/render-props';

storiesOf('Introduction', module)
.add('Getting Started', introduction)
.add('Simple Form', simpleForm);

storiesOf('Forms', module)
.add('Array Form', arrayForm)
.add('Render Props', renderProps);
