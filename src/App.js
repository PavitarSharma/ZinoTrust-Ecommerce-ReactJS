import "./App.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom"

//Components
import { Header, Footer } from "./components" 

//pages
import { Home, Contact, Cart, Admin, OrderHistory } from "./pages"

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App