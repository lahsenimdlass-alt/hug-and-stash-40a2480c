import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Catalogue from "./pages/Catalogue";
import Equipements from "./pages/Equipements";
import Consommables from "./pages/Consommables";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Distributeurs from "./pages/Distributeurs";
import Promotions from "./pages/Promotions";
import SAV from "./pages/SAV";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStats from "./pages/AdminStats";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminPromotions from "./pages/AdminPromotions";
import AdminSlides from "./pages/AdminSlides";
import AdminCategoryImages from "./pages/AdminCategoryImages";
import AdminCategories from "./pages/AdminCategories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/equipements" element={<Equipements />} />
            <Route path="/equipements/:slug" element={<CategoryProducts />} />
            <Route path="/consommables" element={<Consommables />} />
            <Route path="/consommables/:slug" element={<CategoryProducts />} />
            <Route path="/produit/:id" element={<ProductDetail />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/distributeurs" element={<Distributeurs />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/sav" element={<SAV />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />}>
              <Route index element={<AdminStats />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="promotions" element={<AdminPromotions />} />
              <Route path="slides" element={<AdminSlides />} />
              <Route path="category-images" element={<AdminCategoryImages />} />
              <Route path="categories" element={<AdminCategories />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;