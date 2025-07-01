import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import './index.css'
import App from './App.jsx'

=======
import App from './App.jsx'

import './index.css'; // ✅ Harus ada ini!

>>>>>>> master
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
