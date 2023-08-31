import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {ImageLoaderProvider, MessageStateProvider} from "./Utils/Context.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <MessageStateProvider>
                <ImageLoaderProvider>
                    <App/>
                </ImageLoaderProvider>
            </MessageStateProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
