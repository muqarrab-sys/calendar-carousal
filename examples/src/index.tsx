import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppointmentCalenderProvider } from 'appointment-calendar-carousal'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <AppointmentCalenderProvider>
      <App />
    </AppointmentCalenderProvider>
  </React.StrictMode>,
)
