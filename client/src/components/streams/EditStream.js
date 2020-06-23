import React from "react";
import { fetchStream, editStream } from "../../actions";
import { connect } from "react-redux";
import StreamForm from "./StreamForm";

class EditStream extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderInitialValues = () => {
    if (!this.props.stream) {
      return null;
    } else {
      const { title, description } = this.props.stream;

      return { title, description };
    }
  };

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    return (
      <div>
        <h2>Edit Your Stream Details</h2>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={this.renderInitialValues()}
          buttonName="Edit"
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  EditStream
);
