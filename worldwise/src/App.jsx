import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';

/* import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout'; */

// lazy load will split the bundle in to many chunks and when the user will go to a particular route the server will load only this particular page to reduce bundle size which will make app faster
const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

// dist/assets/index-d01679d4.css   31.30 kB │ gzip:   5.23 kB
// dist/assets/index-f21cedf4.js   528.94 kB │ gzip: 150.90 kB

// whenever we route to another url, the previous route will be suspensed and in the mean time SpinnerFullPage will be shown
function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <Suspense fallback={<SpinnerFullPage />}>
            <BrowserRouter>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />

                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="cities" />} />

                  <Route path="cities" element={<CityList />} />

                  <Route path="cities/:id" element={<City />} />

                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}

// we don't need to include parent path like /app/cities because router is smart enough to combine them
// index is like a default route if none of the nested routes match then it will navigate to cities
// replace = go back from /cities
// Navigate will directly navigate url to /app/navigate
// AppLayout is a parent page of a whole application

export default App;
