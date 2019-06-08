import { configure , addDecorator, addParameters } from '@storybook/react';
import { addReadme } from 'storybook-readme';

addParameters({
  name: 'react-form-composer',
  url: 'https://chrisfield.github.io/react-form-composer',
  options: {
    showPanel: false,
    panelPosition: 'right'
  }
});

addDecorator(addReadme);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}


configure(loadStories, module);

