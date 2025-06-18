import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Header from './components/Header';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import LandingPage from './pages/LandingPage';
import Orders from './pages/Orders';
import PrivateRoute from './components/PrivateRoute';

function AppRoutes() {
  const location = useLocation();

  // Hide header on landing, signup, signin pages
  const hideHeader = ["/", "/signup", "/signin"].includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
