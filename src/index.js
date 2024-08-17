import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'


const Container = document.getElementById('root')
const Root = createRoot(Container)
Root.render(<App/>)