import { Routes, Route } from 'react-router-dom'
import Layout from './components/Templates/Layout'
import routes from './config/routes'
import 'tailwindcss/tailwind.css'
// import AutoComplete from './components/AutoComplete/AutoComplete'

const App = () => {
  return (
    <Layout>
      <Routes>
        {/* TODO: Add props to send more info to paths (rooms etc..) */}
        {routes().map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Layout>
  )
}

export default App
