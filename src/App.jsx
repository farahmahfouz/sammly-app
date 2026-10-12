import { lazy, Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

// Components (loaded immediately: they appear on every page)
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Spinner from "./components/Spinner";
import ErrorPage from "./components/Error";

// Home is NOT lazy so the LCP is not delayed
import Home from "./pages/Home";

// Lazy pages (each one becomes its own chunk)
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CustomizePage = lazy(() => import("./pages/CustomizePage"));
const Designer = lazy(() => import("./pages/Designer"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const SuccessPayment = lazy(() => import("./pages/SuccessPayment"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const HelpFAQs = lazy(() => import("./pages/HelpFaqs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute (was 60 * 100 = 6 seconds)
    },
  },
});

// Fallback keeps a minimum height so the Footer doesn't jump (CLS)
function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner />
    </div>
  );
}

// Layout with Navbar + <main> + Footer
function MainLayout() {
  return (
    <>
      <Navbar className="sticky top-0 z-50" />
      <main>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="relative">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Without Navbar / Footer */}
                <Route
                  path="/success-payment"
                  element={
                    <main>
                      <Suspense fallback={<PageFallback />}>
                        <ProtectedRoute>
                          <SuccessPayment />
                        </ProtectedRoute>
                      </Suspense>
                    </main>
                  }
                />

                {/* With Navbar / Footer */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/customize" element={<CustomizePage />} />
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/Designer/:id" element={<Designer />} />
                  <Route
                    path="/product-details/:id"
                    element={<ProductDetails />}
                  />
                  <Route path="/help" element={<HelpFAQs />} />
                  <Route path="/contact" element={<ContactUs />} />

                  {/* Guests only */}
                  <Route
                    path="/sign-up"
                    element={
                      <ProtectedRoute isAuth={false}>
                        <SignUp />
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

                  {/* Logged-in users only */}
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

                  <Route path="*" element={<ErrorPage />} />
                </Route>
              </Routes>
            </BrowserRouter>

            <Toaster
              position="top-right"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: { duration: 2000 },
                error: { duration: 2000 },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            />
          </UserProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;