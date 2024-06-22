import { createRoot } from 'react-dom/client'
import App from './App'
import HrmContext from './Context/HrmContext'
createRoot(document.getElementById('root')).render(
    <HrmContext>
        <App>

        </App>
    </HrmContext>

)
