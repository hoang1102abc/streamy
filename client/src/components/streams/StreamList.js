import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderStreamsList = () => {
    let streamList = [];

    for (let [key, value] of Object.entries(this.props.streams)) {
      const list = { id: key, ...value };
      streamList.push(list);
    }

    return streamList.map(item => {
      return (
        <div className="item" key={item.id}>
          <div className="ui tiny image">
            <i style={{ width: "100%" }} className="grey huge video icon"></i>{" "}
          </div>
          <div className="content">
            {item.userId !== this.props.userId ? null : (
              <>
                <Link
                  to={`/streams/delete/${item.id}`}
                  className="ui red right floated button"
                >
                  Delete
                </Link>
                <Link
                  to={`/streams/edit/${item.id}`}
                  className="ui teal right floated button"
                >
                  Edit
                </Link>
              </>
            )}

            <Link to={`/streams/show/${item.id}`} className="header">
              {item.title}
            </Link>
            <div className="description">
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <h2>Current Streams</h2>

        <div className="ui items">{this.renderStreamsList()}</div>
        {this.props.userId === null ? null : (
          <Link to="/streams/new" className="ui right floated button primary">
            Create a New Stream
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { streams: state.streams, userId: state.auth.userId };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
