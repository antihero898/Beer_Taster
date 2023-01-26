import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


// 1. attempt to integrate WebSQL, AWS Lambda (AWS DynamoDB), and MongoDB

// TODO: eventually integrate typescript
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);  