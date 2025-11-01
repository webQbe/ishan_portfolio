import { BrowserRouter, Routes, Route } from 'react-router-dom' // Import routing components
/* Import route/page components */
import Home from './components/Home'
import About from './components/About'
import SinglePost from './components/SinglePost'
import Demo from './components/Demo'
import Project from './components/Project'
import NavBar from './components/NavBar'

import './App.css'

function App() {

  return (
    <BrowserRouter> {/* Wrap the app with router */}
    <NavBar /> {/* Render Nav bar on all pages */}
      <Routes> {/*  Define specific routes  */}
        <Route element={ <Home /> } path='/' />
        <Route element={ <About /> } path='/about'/>
        <Route element={ <SinglePost /> } path='/post/:slug'/>
        <Route element={ <Demo /> } path='/demo'/>
        <Route element={ <Project /> } path='/project'/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
