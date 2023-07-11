import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { DropdownProvider } from './components/Dropdown';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <StrictMode>
        <Provider store={store}>
            <ToastContainer autoClose={1500} />
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
            <DropdownProvider />
        </Provider>
    </StrictMode>,
);
