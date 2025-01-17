import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchStream } from '../../actions';
import flv from 'flv.js';

class StreamShow extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }
  componentWillUnmount() {
    this.player.destroy();
  }
  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const {id} = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://192.168.1.133:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    const {title, description} = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} styple={{ width: '100$' }} controls/>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {fetchStream})(StreamShow);
