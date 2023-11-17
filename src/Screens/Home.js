import React,{useEffect,useState} from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Body from "../Components/Body";


export default function Home() {
  const[search, setSearch]=useState('');
  const [foodCat,setFoodCat]=useState([]);
  const [fooditem, setFoodItem] = useState([]);

  const loadData= async()=>{
    let response = await fetch("http://localhost:4000/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    });
    response=await response.json();
    setFoodItem(response[0])
    setFoodCat(response[1])
    //console.log(response[0],response[1])
  }
   useEffect(()=>{
    loadData()
   },[])



    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            style={{ objectFit: "contain !important" }}
          >
            <div className="carousel-inner w-100" id="carousal">
              <div
                className="carousal-caption"
                style={{
                  position: "absolute",
                  top: "85%",
                  left: "50%",
                  width: "1000px",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              >
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e)=>{
                      setSearch(e.target.value)
                    }}
                    style={{ background: "white" }}
                  />
                  {/* <button
                    className="btn btn-outline-success text-white bg-success"
                    type="submit"
                  >
                    Search
                  </button> */}
                </div>
              </div>
              <div className="carousel-item active">
                <img
                  src="https://source.unsplash.com/random/1000x800/?burger"
                  className="d-block w-100"
                  style={{ filter: "brightness(30%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/1000x800/?pizza"
                  className="d-block w-100"
                  style={{ filter: "brightness(30%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/1000x800/?barbeque"
                  className="d-block w-100"
                  style={{ filter: "brightness(30%)" }}
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="container ">
          {foodCat != []
            ? foodCat.map((data) => {
                return (
                  <div className="row mb-3">
                    <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                    </div>
                    <hr />
                    {fooditem != [] ? (
                      fooditem
                        .filter(
                          (item) =>
                            item.CategoryName === data.CategoryName &&
                            item.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((filterItems) => {
                          return (
                            <div
                              key={filterItems._id}
                              className="col-12 col-md-6 col-lg-3"
                            >
                              <Body
                                foodItem={filterItems}
                                options={filterItems.options[0]}
                                
                              />
                            </div>
                          );
                        })
                    ) : (
                      <div>No Data Found</div>
                    )}
                  </div>
                );
              })
            : ""}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
}
