import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { MetaMaskProvider } from "@metamask/sdk-react";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={true}
      sdkOptions={{
          dappMetadata: {
              name: "Example React Dapp",
              url: window.location.href,
          },
          infuraAPIKey: process.env.REACT_APP_INFURA_API_KEY,
          // Other options
      }}
    >
    <Theme appearance="dark" accentColor="lime" grayColor="slate" radius="large">
      <App />
    </Theme>
    </MetaMaskProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
