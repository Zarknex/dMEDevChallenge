import './assets/main.css'

import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className="flex flex-col min-h-screen">
    <BrowserRouter>
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </div>
)
