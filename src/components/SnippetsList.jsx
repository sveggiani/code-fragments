import React, { Component, PropTypes } from 'react'
import APP_CONFIG from '../config'
import axios from 'axios';
import {List, ListItem} from 'material-ui/List'
import IconButton from 'material-ui/IconButton';
import ActionCached from 'material-ui/svg-icons/action/cached';


export default class SnippetList extends Component {

  static propTypes = {
    username: PropTypes.string.isRequired
  }

  static defaultProps = {
    username: ''
  }


  constructor (props) {
    super (props)
    this.state = {
      snippets: []
    }
    this.getSnippetsList = this.getSnippetsList.bind(this);
  }


  componentDidMount() {
    this.getSnippetsList()
  }


  getSnippetsList() {
    // define endpoint
    const source = `${APP_CONFIG.github.endpoint}/users/${this.props.username}/gists`
    // try to get snippets
    this.serverRequest = axios.get(
      source,
      {
        headers: {
          'Accept': APP_CONFIG.github.parameters.accept
        }
      }
    )
    .then( response => {
      // filter code-fragment gists
      this.setState({
        snippets: response.data.filter(snippet => {
          return snippet.description.includes('#code-fragments')
        })
      })
    })
    .catch( (error) => {
      // TODO: show a message using SnackBar component
    })
  }


  render() {
    // create snippet list components
    let snippets = this.state.snippets.length
      ? this.state.snippets.map(listItem => {
          // if snippet doesn't have description use first filename instead
          let description = listItem.description
            ? listItem.description
            : Object.keys(listItem.files)[0];
          return <ListItem key={listItem.id} primaryText={description} />
        })
      : <ListItem primaryText='No snippets available' disabled />

    return (
      <div>
        <List style={{width: '33%'}}>
          {snippets}
        </List>
        <IconButton onClick={this.getSnippetsList}>
          <ActionCached />
        </IconButton>
      </div>
    )
  }
}
