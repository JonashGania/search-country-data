import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './route/root'
import Home from './pages/Home'
import CountryPage from './pages/CountryPage'
import ErrorPage from './pages/ErrorPage'
import { ThemeProvider } from './context/ThemeContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "country/:countryCode",
        element: <CountryPage />,
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
        <RouterProvider router={router}/>
      </ThemeProvider>
  </StrictMode>,
)
