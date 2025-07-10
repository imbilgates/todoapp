import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TodoProvider } from './context/TodoContext'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
    <TodoProvider>
        <Toaster richColors position="top-right" />
        <App />
    </TodoProvider>
)

