// import { useEffect } from 'react';
import './styles/App.css'
import AppRoutes from './Routes';
import store from "./store.js";
import { Provider } from "react-redux";
import Menu from '~/src/UI-shared/Organisms/Menu/index.js';

function App() {
    return <Provider store={store}>
        {window.location.pathname !== '/' && <Menu/>}
        <AppRoutes/>
    </Provider> 
}

export default App
