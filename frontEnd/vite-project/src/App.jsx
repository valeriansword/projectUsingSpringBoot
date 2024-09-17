import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Products from './Components/Products'
import AddProduct from './Components/AddProduct'
import { AppProvider } from './Context/AppContext'
import UpdateProduct from './Components/UpdateProduct'

function App() {
  

  return (
    <AppProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<Products />} />
        <Route path='/products/addProducts' element={<AddProduct />} />
        <Route path='/products/updateProducts/:id' element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
    </AppProvider>
  )
}

export default App
