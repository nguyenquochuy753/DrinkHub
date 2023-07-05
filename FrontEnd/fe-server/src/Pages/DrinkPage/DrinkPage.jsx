import React , {useEffect , useState} from 'react'
import "./DrinkPage.css"
import axios from "axios"
import Modal from "react-modal"

Modal.setAppElement('#root')

function DrinkPage() {
  // Nơi chứa các biến
  const [drinkList, setDrinkList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [numberPage , setNumberPage] = useState(0)
  const [quantityDrinks , setQuantityDrinks] = useState()
  const [showPopup, setShowPopup] = useState(false)
  const [newDrink, setNewDrink] = useState({
    name: '',
    description: '',
    price: 0,
    image: null,
  });

  //Nơi chứa Hàm
  const handleShowPopup = () => {
    setShowPopup(true)
  }
  const handleClosePopup = () => {
    setShowPopup(false)
  }
  const paginationHandle = (page)=>{
    axios
      .get('http://localhost:8000/v1/drink/drinkPaging/'+page)
      .then((res) => {
        setDrinkList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get('http://localhost:8000/v1/drink/drinkPaging/1')
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
    axios.get('http://localhost:8000/v1/drink/countDrink')
    .then((res)=>{
      setQuantityDrinks(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }, []);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDrink((prevDrink) => ({
      ...prevDrink,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setNewDrink((prevDrink) => ({
      ...prevDrink,
      image: file,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newDrink)
    handleClosePopup()
  };

  return (
    <div className='drink-page'>
      <div className='quantity-drink'>Số lượng : <b>{quantityDrinks}</b></div>
      <div className="drink-container">
        {drinkList.map((drink,key) => {
          const image = 'http://localhost:8000/' + drink.img_url;
          return (
            <div key={key} className="drink-card">
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
        {/* Nút để mở popup thêm nước */}
        <div className="add-button-container">
          <button className="add-button" onClick={()=>handleShowPopup()}>+</button>
        </div>
        {/* Nút qua trang */}
        <div className="pagination">
          {Array.from({ length: numberPage }, (_, index) => (
            <button 
            key={index}
            className="pagination-button" 
            onClick={()=>paginationHandle(index+1)}
            >{index + 1}
            </button>
          ))}
        </div>
      </div>
      <Modal
        isOpen={showPopup}
        onRequestClose={handleClosePopup}
        contentLabel='Thêm nước uống'
        className='custom-modal'
        overlayClassName='custom-overlay'
      >
        <div className='modal-header'>
          <h2 className='modal-title'>Thêm nước uống</h2>
          <button className='modal-close' onClick={handleClosePopup}>
            &times;
          </button>
        </div>
        <form className='modal-form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Tên nước uống:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={newDrink.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='description'>Mô tả:</label>
            <textarea
              id='description'
              name='description'
              value={newDrink.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor='price'>Giá:</label>
            <input
              type='number'
              id='price'
              name='price'
              value={newDrink.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='image'>Hình ảnh:</label>
            <input type='file' id='image' name='image' onChange={handleImageUpload} />
          </div>
          <div className='modal-actions'>
            <button type='submit'>Thêm</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default DrinkPage
