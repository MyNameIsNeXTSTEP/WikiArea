import './styles/App.css'
import AppRoutes from './Routes';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; // Import the store and persistor

function App() {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {/* @todo: double menu bug */}
            <AppRoutes/>
        </PersistGate>
    </Provider> 
}

export default App
