import React from "react";
import { connect } from "react-redux";
import flvjs from "flv.js";
import { fetchStream } from "../../actions";

class ShowStream extends React.Component {
  constructor(props) {
    super(props);

    this.mainVideo = React.createRef();
  }
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (!this.props.stream) {
      return;
    }
    const { id } = this.props.match.params;

    this.player = flvjs.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.mainVideo.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    } else {
      const { title, description } = this.props.stream;
      return (
        <div>
          <video
            style={{ width: "100%" }}
            controls={true}
            ref={this.mainVideo}
          />
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(ShowStream);
