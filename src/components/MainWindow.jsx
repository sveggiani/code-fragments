import React, { Component, PropTypes } from 'react'
import AppConfig from '../config'
import AppBar from 'material-ui/AppBar'
import SnippetsList from './SnippetsList'
import StatusMessage from './StatusMessage'


export default class MainWindow extends Component {

  static propTypes = {
    appName: PropTypes.string.isRequired
  }

  static defaultProps = {
    appName: AppConfig.name
  }

  constructor(props) {
    super(props)
    // define default values
    this.defaultStatusMessageDuration = 5000
    this.defaultStatusMessageText = ''
    // set initial state
    this.state = {
      statusMessage: {
        open: false,
        message: this.defaultStatusMessageText,
        duration: this.defaultStatusMessageDuration
      }
    }
  }

  updateStatusMessage = message => {
    // update Message status. if no message or duration specified use defaults
    this.setState({
      statusMessage: {
        open: message.open,
        message: message.message
          ? message.message
          : this.defaultStatusMessageText,
        duration: message.duration
          ? message.duration
          : this.defaultStatusMessageDuration
      }
    })
  }


  render() {
    return (
      <section className="app-container">
        <AppBar
          className='app'
          title={this.props.appName}
        />

        <SnippetsList
          updateStatus={this.updateStatusMessage}
        />

        <StatusMessage
          open={this.state.statusMessage.open}
          message={this.state.statusMessage.message}
          duration={this.state.statusMessage.duration}
          updateStatus={this.updateStatusMessage}
        />
      </section>
    )
  }
}
