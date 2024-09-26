import ReactDom from "react-dom/client"
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor ,store } from './Redux/Store.jsx'
import { PersistGate } from 'redux-persist/integration/react'

// createRoot(document.getElementById('root')).render(
//     <Provider store={store}>
//          <App />
//     </Provider>
   
// )

ReactDom.createRoot(document.getElementById('root')).render(
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            <App/>
        </Provider>

    </PersistGate>
)