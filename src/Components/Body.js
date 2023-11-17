import React, { useEffect, useRef,useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useDispatchCart, useCart} from "./ContextReducer"

export default function Body(props) {
  const dispatch=useDispatchCart();
  let navigate = useNavigate();
  let data=useCart();
  const priceRef=useRef();
  const [qty,setQty]=useState(1)
  const [size, setSize]=useState("")
  let options=props.options;
  let priceOptions= Object.keys(options);
  const foodItem=props.food_iteams;

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    console.log(food);
    console.log(new Date());

    if (food.length !== 0) {
      // Check if the array is not empty
      if 
        (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price:finalPrice,
          qty: qty,
        });
        return;
      } else if 
        (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    // setBtnEnable(true)
  };

let finalPrice = qty * parseInt(options[size]);
useEffect(()=>{
  setSize(priceRef.current.value)
},[])

  return (
    <div>
      <div
        className="card mt-3"
        style={{ margin: "10px", width: "18rem", maxHeight: "360px" }}
      >
        <img
          src={props.foodItem.img}
          className="body-img-top"
          alt="..."
          style={{ height: "120px", objectfit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  bg-success rounded" ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className={"bt btn-success justify-center ms-2"}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
