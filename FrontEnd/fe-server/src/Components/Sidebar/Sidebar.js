import React from 'react'
import "./Sidebar.css"
import logo from "../../image/logo_DrinkHub-removebg-preview.png"
import {Link} from "react-router-dom"

function Sidebar() {
  return (
    <div className="sidebar">
        <div className="logo">
            <img className='logo_img' src={logo} alt='Logo'/>
        </div>
        <ul className="navigation">
            <li>
                <Link to="/drinkpage">Đồ uống & Bánh mì</Link>
            </li>
            <li>
                <Link to="/orderpage">Đơn đặt hàng</Link>
            </li>
            <li>
                <Link to="/drinkpage">Giỏ hàng</Link>
            </li>
            <li>
                <Link to="/drinkpage">Doanh thu</Link>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar
