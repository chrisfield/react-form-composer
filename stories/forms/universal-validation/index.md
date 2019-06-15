# Next.js and Universal Validation

The main point of the [universal-validation example ](https://github.com/chrisfield/react-form-composer/tree/master/examples/universal-validation) is to show separation of the validation/formatting from the rendering of the form. The defined validation/formatting is then used in two places
- In the client browser (eg. for the client browser to validate fields with onChange events)
- On the server (eg the form-data-handler validates sets of submitted data)

A secondary point is that the example has been written to allow data to be posted in two ways:
- JSON content - eg when the form is submitted asyncronously using 'Send' button (postman would work too)
- form-urlencoded content - eg when client JS is disabled or using 'Standard Submit (no client JS) button' 

Whichever way data is sent it will be validated/formatted consistently because the same code has been used.

Try tuning javascript off: Messages for errors that would have been caught on the client are now displayed when the form is redisplayed after submission to the server.

Run the example and in the chrome dev-tools network tab choose the slow-3g option. While the javascript is downloading you will be able to use the server rendered html-form.