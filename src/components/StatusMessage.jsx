import React, { Component, PropTypes } from 'react'
import Snackbar from 'material-ui/Snackbar';


export default class StatusMessage extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    updateStatus: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleRequestClose = () => {
    // update parent Message state
    this.props.updateStatus({
      open: false
    })
    // update component open state
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <section className="status-message">
        <Snackbar
          open={this.props.open}
          message={this.props.message}
          autoHideDuration={this.props.duration}
          onRequestClose={this.handleRequestClose}
        />
      </section>
    )
  }
}
