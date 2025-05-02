import { Routes, Route } from "react-router-dom";
import Orders from "../pages/Orders";
import Recommendations from "../pages/Recommendations";
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import { Navigate } from "react-router-dom";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Orders />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
