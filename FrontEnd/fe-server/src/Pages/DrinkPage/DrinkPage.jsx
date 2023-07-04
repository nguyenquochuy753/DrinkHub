import React , {useEffect , useState} from 'react'
import "./DrinkPage.css"
import axios from "axios"

function DrinkPage() {
  const [drinkList, setDrinkList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [numberPage , setNumberPage] = useState(0)

  useEffect(() => {
    axios
      .get('http://localhost:8000/v1/drink/getAllDrink')
      .then((res) => {
        setDrinkList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get('http://localhost:8000/v1/drink/countPage')
      .then((res) => {
        setNumberPage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  return (
    <div className="drink-container">
      {drinkList.map((drink) => {
        const image = 'http://localhost:8000/' + drink.img_url;
        return (
          <div key={drink.id} className="drink-card">
            <img src={image} alt={drink.name} className="drink-image" />
            <h2>{drink.name}</h2>
            <p>{drink.des}</p>
            <p>Price: {drink.price}đ</p>
            <div className="quantity-container">
              <button className="quantity-button" onClick={handleDecreaseQuantity}>
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button className="quantity-button" onClick={handleIncreaseQuantity}>
                +
              </button>
            </div>
            <button>Thêm vào giỏ hàng</button>
          </div>
        );
      })}
      <div className="add-button-container">
        <button className="add-button">+</button>
      </div>
      <div className="pagination">
        {Array.from({ length: numberPage }, (_, index) => (
          <button key={index} className="pagination-button">{index + 1}</button>
        ))}
      </div>
    </div>
  );
}

export default DrinkPage
