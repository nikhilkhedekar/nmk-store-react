import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import {
  Home,
  Error,
  Register,
  Login,
  VerifyPage,
  Dashboard,
  ForgotPassword,
  ResetPassword,
  UpdatePassword,
  UpdateUser,
  ProductDetails,
  AllProducts,
  AllReviews,
  GetSingleReview,
  StripeSuccess,
  StripeCancel,
  CurrentUserOrders,
  OrderDetails,
  CurrentUserCart,
  CartItemDetails,
  CartCheckoutForm,
  Assistant,
  CartCheckoutFormEnc
} from './pages/index';
import Header from './components/Header';
import Footer from './components/Footer';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/** ====================================================================== */}
        {/* admin routes */}

        {/* admin user routes */}
        {/* <Route path='/all-users' element{< />} /> */}

        {/* admin product route */}
        {/* <Route path='/create-product' element={} /> */}
        {/* <Route path='/products/:id' element={updateproduct} /> */}
        {/* <Route path='/products/:id' element={deleteproduct} /> */}

        {/* admin order routes */}
        {/* <Route path='/order' element={getallorders} /> */}

        {/* admin cart routes */}
        {/* <Route path="/" element={getallusercartitems} /> */}

        {/* admin assistant route */}
        {/* <Route path="" element={<adminassistantroute />} /> */}
        {/** ====================================================================== */}

        {/** ====================================================================== */}
        {/* user routes */}
        <Route path='/dashboard' element={<Dashboard />} />
        {/* <Route path='/user-details' element={get other user details} /> */}
        <Route path='/update-user' element={<UpdateUser />} />
        {/* not working */}
        <Route path='/update-user-password' element={<UpdatePassword />} />
        {/** ====================================================================== */}

        {/** ====================================================================== */}
        {/* product routes */}
        <Route path='/products' element={<AllProducts />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        {/** ====================================================================== */}

        {/** ====================================================================== */}
        {/* product review routes */}
        {/* <Route path="/products/:id/reviews" element={review-count} /> */}
        <Route path="/reviews" element={<AllReviews />} />
        <Route path="/reviews/:id" element={<GetSingleReview />} />
        {/** ====================================================================== */}

        {/** ====================================================================== */}
        {/* product order routesk */}
        <Route path="/stripe/success" element={<StripeSuccess />} />
        <Route path="/stripe/cancel" element={<StripeCancel />} />
        <Route path="/orders/user-orders" element={<CurrentUserOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        {/** ====================================================================== */}

        {/** ====================================================================== */}
        {/* auth routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/user/verify-email' element={<VerifyPage />} />
        <Route path='/user/reset-password' element={<ResetPassword />} />
        {/** ====================================================================== */}

        {/** ====================================================================== */}
        {/* cart routes */}
        <Route path="/cart" element={<CurrentUserCart />} />
        <Route path="/cart/:id" element={<CartItemDetails />} />
        <Route path="/cart/checkout" element={<CartCheckoutFormEnc />} />
        {/** ====================================================================== */}

        {/** ====================================================================== */}
        {/* assistant routes */}
        <Route path="/assistant" element={<Assistant />} />
        {/** ====================================================================== */}

        <Route path='*' element={<Error />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
