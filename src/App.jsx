import { BrowserRouter, Routes, Route } from "react-router-dom"
import Products from "./pages/products/Products"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import { CustomToast } from "./components/CustomToast"
import Home from "./pages/home/Home"
import Checkout from "./pages/checkout/Checkout"
import { CartProvider } from "./context/CartContext"
import { AurisProvider } from "./context/AurisContext"
import FaqsSubscription from "./pages/faqsSubscription/FaqsSubscription"




function App() {

  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-[#212121] transition-colors duration-300">
      <BrowserRouter> 
        <AurisProvider>
          <CartProvider> 
            <Navbar />
            {/* hace q el footer quede abajo siempre */}
            <main className="flex-1">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/Faqs' element={<FaqsSubscription />} />
                <Route path='/checkout' element={<Checkout />} />
              </Routes>
            </main>
          </CartProvider>
        </AurisProvider>
        <Footer />
        <CustomToast />
      </BrowserRouter>
    </div>
  )
}

export default App
