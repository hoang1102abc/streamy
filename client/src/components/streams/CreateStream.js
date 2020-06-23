import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class CreateStream extends React.Component {
  submit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h2>Create a New Stream</h2>
        <StreamForm buttonName="Create" onSubmit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(CreateStream);
