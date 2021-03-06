import { storiesOf } from '@storybook/react';

import introduction from './introduction';
import writingUiComponents from './introduction/writing-ui-components';
import scopes from './introduction/scopes';
import arrayForm from './introduction/array-form';
import validation from './introduction/validation';
import asyncSubmission from './introduction/async-submission';
import dynamicFields from './introduction/dynamic-fields';
import RowEditor from './introduction/row-editor';
import RowEditor2 from './introduction/row-editor2';
import optimization from './introduction/optimization';

import apiForForm from './api/form';
import apiForScope from './api/scope';
import apiForField from './api/field';
import apiForSpyAndHooks from './api/spy-and-hooks';

import moreInfoFaq from './more-info/faq';
import moreInfoFormRenderProps from './more-info/form-render-props';

storiesOf('Introduction', module)
.add('A Simple Form', introduction)
.add('Writing UI Components', writingUiComponents)
.add('Adding Scopes', scopes)
.add('Field Arrays', arrayForm)
.add('Dynamic Fields', dynamicFields)
.add('Validation', validation)
.add('Async Submission', asyncSubmission)
.add('Row Editor', RowEditor)
.add('Row Editor2', RowEditor2)
.add('Optimization', optimization);

storiesOf('Api', module)
.add('Form', apiForForm)
.add('Scope', apiForScope)
.add('Field', apiForField)
.add('Spy and Hooks', apiForSpyAndHooks);

storiesOf('More Info', module)
.add('Form Render Props', moreInfoFormRenderProps)
.add('FAQs (changelog)', moreInfoFaq)