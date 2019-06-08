import { configure , addDecorator, addParameters } from '@storybook/react';
import { addReadme } from 'storybook-readme';

addDecorator(addReadme);
addParameters({
  options: {
    name: 'react-form-composer',
    url: 'https://www.npmjs.com/package/react-form-composer',
    showPanel: false,
    panelPosition: 'right'
  }
});


// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}


configure(loadStories, module);

