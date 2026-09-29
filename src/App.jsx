import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Components
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

//import pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomizePage from "./pages/CustomizePage";
import Designer from "./pages/Designer";
import Error from "./components/Error";
import CartPage from "./pages/CartPage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import SuccessPayment from "./pages/SuccessPayment";
import UserProfile from "./pages/UserProfile";
import AboutUs from "./pages/AboutUs";
import ScrollToTop from "./components/ScrollToTop";
import HelpFAQs from "./pages/HelpFaqs";
import ContactUs from "./pages/ContactUs";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 100,
    },
  },
});

function App() {
  return (
    <div className="relative ">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>
            <BrowserRouter>
              <ScrollToTop />
              {/* Conditionally render Navbar and Footer */}
              <Routes>
                <Route
                  path="/success-payment"
                  element={
                    <ProtectedRoute>
                      <SuccessPayment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <>
                      <Navbar className="sticky top-0 z-50" />
                      <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route
                          path="/products"
                          element={<ProductsPage />}
                        />
                        <Route
                          path="/customize"
                          element={<CustomizePage />}
                        />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route
                          path="/Designer/:id"
                          element={<Designer />}
                        />
                        <Route
                          path="/products"
                          element={<ProductsPage />}
                        />
                        <Route
                          path="/customize"
                          element={<CustomizePage />}
                        />
                        <Route
                          path="/Designer/:id"
                          element={<Designer />}
                        />
                        <Route
                          path="/product-details/:id"
                          element={<ProductDetails />}
                        />
                        <Route
                          path="/sign-up"
                          element={
                            <ProtectedRoute isAuth={false}>
                              <Registration />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/login"
                          element={
                            <ProtectedRoute isAuth={false}>
                              <Login />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/user-profile"
                          element={
                            <ProtectedRoute>
                              <UserProfile />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/cart"
                          element={
                            <ProtectedRoute>
                              <CartPage />
                            </ProtectedRoute>
                          }
                        />

                        <Route path="/help" element={<HelpFAQs />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route
                          path="/forget-password"
                          element={
                            <ProtectedRoute isAuth={false}>
                              <ForgetPassword />
                            </ProtectedRoute>
                          }
                        />


                        <Route
                          path="/reset-password/:token"
                          element={
                            <ProtectedRoute isAuth={false}>
                              <ResetPassword />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="*" element={<Error />} />
                      </Routes>
                      <Footer />
                    </>

                  }
                />
              </Routes>
            </BrowserRouter>
            <Toaster
              position="top-right"
              gutter={12}
              containerStyle={{ margin: '8px' }}
              toastOptions={{
                success: {
                  duration: 2000
                },
                error: {
                  duration: 2000
                },
                style: {
                  fontSize: '16px',
                  maxWidth: '500px',
                  padding: '16px 24px',
                  backgroundColor: 'white',
                  color: 'black'
                }
              }} />
          </UserProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
