import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import './App/Layout/Styles.css'
import 'semantic-ui-css/semantic.min.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { store, StoreContext } from './App/stores/Store'
import { RouterProvider } from 'react-router-dom'
import { router } from './App/router/Routes'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<StoreContext.Provider value={store}>
		<RouterProvider router={router}/>
	</StoreContext.Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
