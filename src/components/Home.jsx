import React, { Component, PropTypes } from 'react'
import APP_CONFIG from '../config'
import AppBar from 'material-ui/AppBar'
import SnippetsList from './SnippetsList'


export default class Home extends Component {

  static propTypes = {
    appName: PropTypes.string.isRequired
  }

  static defaultProps = {
    appName: APP_CONFIG.name
  }

  render() {
    return (
      <section className="app-container">
        <AppBar
          className='app'
          title={this.props.appName}
        />
        <SnippetsList username={APP_CONFIG.github.username} />
      </section>
    )
  }
}
