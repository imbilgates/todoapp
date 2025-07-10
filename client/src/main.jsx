import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TodoProvider } from './context/TodoContext'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
    <TodoProvider>
        <Toaster
            position="top-center"
            closeButton
            duration={3000}
            richColors
            expand
            visibleToasts={5}
        />

        <App />
    </TodoProvider>
)

