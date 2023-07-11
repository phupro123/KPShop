import React from "react";
import { render } from 'react-dom'
window.React = React
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { UserProvider } from "./context/UserContext";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={1500} />
      <PersistGate loading={null} persistor={persistor}>
        <UserProvider>
          <App />
        </UserProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
