import Sidebar from "./Components/Sidebar/Sidebar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrinkPage from "./Pages/DrinkPage/DrinkPage";
import OrderPage from "./Pages/OrderPage/OrderPage";
import "./App.css"
import CartPage from "./Pages/CartPage/CartPage";

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<DrinkPage />} />
            <Route path="/drinkpage" element={<DrinkPage />} />
            <Route path="/orderpage" element={<OrderPage />} />
            <Route path="/cartpage" element={<CartPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
