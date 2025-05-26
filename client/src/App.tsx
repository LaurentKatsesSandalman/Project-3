import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


  return (
    <>
      {/* si on a un context, il faudra mettre le provider là */}
      <TopBar /> {/* les noms sont provisoires*/}
      <main>
        <Outlet />
      </main>

    </>
  )
}

export default App
