import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<h1>Home</h1>} />
        <Route path='/login' element= {<h1>Login</h1>} />
        <Route path='/register' element= {<h1>Registro</h1>} />
        <Route path='/profile' element= {<h1>Perfil</h1>} />
        <Route path='/product' element= {<h1>Producto</h1>} />
        <Route path='/cart' element= {<h1>Carrito</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App