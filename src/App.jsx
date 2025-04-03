import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import PublicLayout from './page/layouts/PublicLayout'
import HomeView from './page/HomeView'
import ProductView from './page/ProductView'
import OrderView from './page/OrderView'
import CartView from './page/CartView'
import RegisterView from './page/auth/RegisterView'
import LoginView from './page/auth/LoginView'
import DetailProduct from './page/DetailProduct'
import CreateProductView from './page/CreateProductView'
import EditProductView from './page/EditProductView'


//loader
import { loader as HomeLoader } from './page/HomeView'
import { loader as ProductLoader } from './page/ProductView'
import { loader as CheckoutLoader } from './page/CheckoutView'
import { loader as OrderLoader } from './page/OrderView'
import { loader as CreateProductLoader } from './page/CreateProductView'


//action
import { action as LoginAction } from './page/auth/LoginView'
import { action as RegisterAction } from './page/auth/RegisterView'

//store
import { store } from './store'
import CheckoutView from './page/CheckoutView'

//error component
import ErrorView from './page/ErrorView'

function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <PublicLayout />,
      errorElement: <ErrorView />,
      children: [
        {
          index: true,
          element: <HomeView />,
          loader: HomeLoader
        },
        {
          path: "products",
          element: <ProductView />,
          loader: ProductLoader
        },
        {
          path: "product/create",
          element: <CreateProductView />,
          loader: CreateProductLoader(store)
        },
        {
          path: "product/:id/edit",
          element: <EditProductView />,
        },
        {
          path: "product/:id",
          element: <DetailProduct />
        },
        {
          path: "order",
          element: <OrderView />,
          loader: OrderLoader(store)
        },
        {
          path: "cart",
          element: <CartView />,
        }, {
          path: "checkout",
          element: <CheckoutView />,
          loader: CheckoutLoader(store)
        }
      ]
    },
    {
      path: '/register',
      element: <RegisterView />,
      action: RegisterAction(store)
    },
    {
      path: '/login',
      element: <LoginView />,
      action: LoginAction(store)

    }
  ])
  return (
    <RouterProvider router={router} />

  )
}

export default App
