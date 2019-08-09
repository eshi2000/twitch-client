import React, {Component} from "react";
import Modal from "../Modal";
import history from '../../history';
import {Link} from 'react-router-dom';
import { fetchStream, deleteStream } from "../../actions";
import {connect} from "react-redux";

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  renderActions() {
    const {id} = this.props.match.params;

    return (
      <React.Fragment>
        <button className="ui button negative" onClick={() => this.props.deleteStream(id)}>Delete</button>
        <Link to="/"className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent = () => {
    return this.props.stream ? `Are you sure you want to delete this stream with title: ${this.props.stream.title}` : 
      "Are you sure you want to delete this stream";
  }
  render() {
    return (
      <Modal 
        title="Delete Stream" 
        content={this.renderContent()}
        onDismiss={() => history.push('/')}
        actions={this.renderActions()} />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};
export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
