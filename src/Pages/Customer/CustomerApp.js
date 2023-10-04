import React from "react";
import { Box, Container} from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./Category";
import Home from "./Home";
import ProductList from "./Product/List";
import ProductView from "./Product/View";
import Submit from "./Submit";
import Login from "./Login";
import Cart from "./Cart";
import Purchase from "./Purchase";
import ShopInfo from "./ShopInfo";

const CustomerApp = () => {
    return (
        // <Container maxW={'container.sm'} bgColor={'gray.200'} h={'100%'}>
                <BrowserRouter>
          <Routes>
            <Route path='/customer' element={<Home />} />
            <Route path='/customer/category' element={<Category />} />
            <Route path='/customer/product/*' element={<ProductList/>} />
            <Route path='/customer/product/view/*' element={<ProductView/>} />
            <Route path='/customer/submit' element={<Submit/>} />
            <Route path='/customer/login' element={<Login/>} />
            <Route path='/customer/cart' element={<Cart/>} />
            <Route path='/customer/purchase' element={<Purchase/>} />
            <Route path='/customer/shopinfo' element={<ShopInfo/>} />
          </Routes>
        </BrowserRouter>
        // </Container>
    )
}
export default CustomerApp;