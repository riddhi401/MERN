import React from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from "./core/Home"
import signup from './user/Signup'
import signin from './user/Signin'
import AdminRoute from "./auth/helper/AdminRoutes";
import  PrivateRoutes from "./auth/helper/PrivateRoutes";
import Userdashbord from "./user/UserDashBoard"
import AdminDashBoard from "./user/AdminDashBoard"
import  AddCategory from "./admin/AddCategory"
import  AddProduct from "./admin/AddProduct"
import ManageProducts from "./admin/ManageProducts"
import Orders from "./admin/Orders"
import ManageCategories from "./admin/ManageCategories"
import UpdateProduct from "./admin/UpdateProduct"
import Cart from './core/Cart'



const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signup" exact component={signup}/>
            <Route path="/signin" exact component={ signin }/>
            <Route path="/Cart" exact component={ Cart }/>


            <PrivateRoutes path="/user/dashbord" exact component={Userdashbord} />
            <AdminRoute path="/admin/dashbord" exact component={AdminDashBoard} />
            <AdminRoute path="/admin/create/category" exact component={ AddCategory} />
            <AdminRoute path="/admin/create/product" exact component={AddProduct} />
            <AdminRoute path="/admin/products" exact component={ManageProducts} />
            <AdminRoute path="/admin/orders" exact component={Orders} />
            <AdminRoute path="/admin/categories" exact component={ManageCategories} />
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />

        </Switch>
        </BrowserRouter>
    )
}

export default Routes;