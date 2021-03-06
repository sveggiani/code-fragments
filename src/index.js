import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MainWindow from './components/MainWindow'

import './styles/main.scss';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <AppContainer>
      <MainWindow />
    </AppContainer>
  </MuiThemeProvider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./components/MainWindow', () => {
    ReactDOM.render(
      <AppContainer
        component={require('./components/MainWindow')}
      />,
      document.getElementById('root')
    )
  })
}
