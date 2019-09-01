import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PrivacyPolicy } from './components/PrivacyPolicy'
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import * as serviceWorker from './serviceWorker';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import config from "./auth_config.json";
import DateFnsUtils from '@date-io/date-fns';
import { TermsOfService } from './components/TermsOfService'
import { Auth0Provider } from "./react-auth0-wrapper";

const onRedirectCallback = (appState: any) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience={config.audience}
    scope={"update:current_user_metadata,read:current_user,read_users,user_metadata"}
  >
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {window.location.pathname === "/privacy_policy" ? <PrivacyPolicy /> :
          window.location.pathname === "/terms" ? <TermsOfService /> :
            <App />}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
