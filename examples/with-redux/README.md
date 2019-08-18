# Example with-redux form

## How to use

Download the example [or clone the repo](https://github.com/chrisfield/react-form-composer):

```bash
curl https://codeload.github.com/chrisfield/redux-form-composer/tar.gz/master | tar -xz --strip=2 "react-form-composer"-master/examples/with-redux
cd with-redux
```

Install it and run:

```bash
npm install
npm start
# or
yarn install
yarn start
```

## The idea behind the example
Redux-form-composer normally uses standard react state. This example shows how you can use Redux to store form state simply by calling 

```
const FormStateProvider = reduxFormStateProvider(connect);
```

The relevant code is all in [index.js](src/index.js)