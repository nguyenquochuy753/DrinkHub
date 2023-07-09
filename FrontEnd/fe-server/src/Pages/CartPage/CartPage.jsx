import React , {useEffect , useState} from 'react'
import "./CartPage.css"
import axios from "axios"

function CartPage() {
    const [productInCart , setProductInCart] = useState({})
    useEffect(()=>{
        axios.get('http://localhost:8000/v1/user/getProductInCart/64a6bb7a28bcd31519fb9f7a')
        .then((res)=>setProductInCart(res.data))
        .catch((err)=>console.log(err))
    },[])
    const products = productInCart.cart_id?.id_product_add_cart

    let totalPrice = 0;
    products?.forEach((product) => {
        totalPrice += product.id_product.price * product.SL;
    });
  return (
    <div className="cart-container">
        <h2>Giỏ hàng của tôi</h2>  
        {
            products?.map((product , key)=>{
                const image = 'http://localhost:8000/' + product.id_product.img_url
                return (
                    <div className="cart-item" key={key}>
                        <img className="cart-item-image" src={image} alt="" />
                        <div className="cart-item-details">
                            <h3 className="cart-item-name">{product.id_product.name}</h3>
                            <p className="cart-item-price">{product.id_product.price}<b>đ</b></p>
                            <p className="cart-item-quantity">SL : {product.SL}</p>
                        </div>
                        <span className="cart-item-remove">Remove</span>
                    </div>
                )
            })
        }
        <div className='payment-container'>
            <div className="total-price">Tổng tiền : {totalPrice}<b>đ</b></div>
            <button className="payment-button">Thanh toán</button>
        </div>
    </div>
  )
}

export default CartPage
