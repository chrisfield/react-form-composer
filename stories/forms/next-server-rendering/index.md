# Next.js Server Rendering

`React-form-composer` has some features that make it work really well with next js:

* It is easy to pre-populate your form with values by passing initialState to `FormStateProvider`. This means your form will arrive at the client browser fully rendered and populated with data.

* The Field component includes code to re-initialize the form-state with the latest value on the page. In this way, even on a slow connection, standard html elements are immediately usable and formatting etc will kick in as soon as the Javascript download completes.

Checkout the [with-next](https://github.com/chrisfield/react-form-composer/tree/master/examples/with-next) example.

Run the example and in the chrome dev-tools network tab choose the slow-3g option. While the javascript is downloading you will be able to use the server rendered html-form.