import { useState } from 'react'
import { TamboProvider } from '@tambo-ai/react'
import { tamboConfig } from './config/tambo'
import Home from './pages/Home'

function App() {
    return (
        <TamboProvider config={tamboConfig}>
            <div className="min-h-screen bg-neutral-50">
                <Home />
            </div>
        </TamboProvider>
    )
}

export default App
