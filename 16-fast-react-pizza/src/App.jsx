import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import Cart from './features/cart/Cart';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu'; // rename loader to menuLoader
import CreateOrder from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as createOrderAction } from './features/order/CreateOrder';
import { action as updateOrderAction } from './features/order/UpdateOrder';
// React Router will actually start fetching the data at the same time as it starts rendering the correct route.
// imperative way of router
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />, // when we go wrong route this error will be showed

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        // now whenever there will be a new form submission on this route right here, so on this path, then this action that we specified here will be called.
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
