import React from "react";
import { Field, reduxForm } from "redux-form";

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = "Please enter title for your stream";
  }
  if (!values.description) {
    errors.description = "Please enter description for your stream";
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  const className = `field ${error && touched ? "error" : ""}`;

  return (
    <div className={className}>
      <label>{label}</label>
      <div>
        <div>
          <input {...input} placeholder={label} type={type} />
        </div>

        {touched && error && (
          <div className="ui negative message">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

class StreamForm extends React.Component {
  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.props.handleSubmit}>
          <div className="field">
            <label htmlFor="title">Title</label>
            <Field name="title" component={renderField} type="text" />
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <Field name="description" component={renderField} type="text" />
          </div>
          <button className="ui button primary" type="submit">
            {this.props.buttonName}
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: "streams", validate })(StreamForm);
