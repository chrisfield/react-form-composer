import ExtendableError from "es6-error";

class SubmissionError extends ExtendableError {
  errors: object;
  constructor(errors: object) {
    super("Submit Validation Failed");
    this.errors = errors;
  }
}

export default SubmissionError;