import React from 'react'
import Base from "../core/Base"
import AdminRoute from '../auth/helper/AdminRoutes'
import {isAutheticated} from "../auth/helper/index"
import { Link } from 'react-router-dom'

const Admindashbord = () => {
    const {
        user: {name,email,role}
    } = isAutheticated();

const adminLeftSide = () =>{
    return (
        <div className="card">
            <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/create/category" className="nav-link text-info">Create Categories</Link>
                </li>
            </ul>

            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/categories" className="nav-link text-info">Manage Categories</Link>
                </li>
            </ul>

            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/create/product" className="nav-link text-info">Create product</Link>
                </li>
            </ul>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/products" className="nav-link text-info">manage products</Link>
                </li>
            </ul>
            

            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/orders" className="nav-link text-info">manage order</Link>
                </li>
            </ul>
        </div>
    )

}

const adminRightSide = () =>{
    return (
        <div className="card mb-4">
            <h4 className="card-header">Admin Inforamation</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Name:</span>{name}
                </li>
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Email:</span>{email}
                </li>
                <li className="list-group-item">
                    <span className="badge badge-danger">admin area</span>
                </li>
            </ul>
            
        </div>
    )

}
    return (
        <Base title="Welcome to admin area" decripation="manage all of your products here " className="continer bg-info p-4">
           
           <div className="row">
                <div className="col-3">{adminLeftSide()}</div>
                <div className="col-9">{adminRightSide()}</div>
            </div>   
        </Base>
    )
}


export default Admindashbord;