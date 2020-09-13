import React from "react";
import Menu from "./Menu";
import { withRouter } from "react-router-dom";

const Base = ({
    title ="My Title",
    decripation = "This Is A Sigup For A User",
    className = "bg-dark text-white p-4",
    children

}) => (
    <div>
<div className="continer-fluid">
    <Menu/>
    <div className="jumbotron bg-dark table-white text-center">
    <h2 className="display-4">{title}</h2>
    <p className="lead">{decripation}</p>
    </div>        
    <div className={className}>{children}</div>
    </div>

    
    <footer className="footer bg-dark mt-auto p3">
        <div className="continer-fluid bg-success text-white text-center py-3">
            <h4>if you any question </h4>
            <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="continer"></div>
        <span className="text-muted">
            an ammmmm <span className="table-black">mern</span>sooooooooo
        </span>

    </footer>
    </div>
)



export default Base;