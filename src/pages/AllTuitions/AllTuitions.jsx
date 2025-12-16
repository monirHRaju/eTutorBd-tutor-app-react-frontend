import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Card from "../../components/Home/Card";
import Container from "../../components/Shared/Container";

const AllTuitions = () => {
  const axiosInstance = useAxios();
  const [tuitions, setTuitions] = useState([])
  const [totalTuitions, setTotalTuitions] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const limit = 5;


  useEffect(() => {
    axiosInstance.get(`all-accepted-tuitions-client?limit=${limit}&skip=${currentPage * limit}`)
    .then((res) => {
      setTuitions(res.data.tuitions)
      setTotalTuitions(res.data.total)
      const page = Math.ceil(res.data.total / limit)
      setTotalPage(page)
    })
  }, [currentPage])


  const handleSelect = (e) => {
    // console.log(e.target.value);
    // const sortText = e.target.value;
    // setsort(sortText.split("-")[0]);
    // setOrder(sortText.split("-")[1]);
  };

  const handleSearch = (e) => {
    // setSearchText(e.target.value);
    // setCurrentPage(0);
  };


  return (
    <div className="my-10">
      <Container>
        <h1 className="text-4xl font-bold mt-10 mb-6 text-center">
        All Tuitions
      </h1>

       {/* Search and Count */}
      <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row gap-5 items-start justify-between lg:items-end mt-10">
        <div>
          <h2 className="text-lg underline font-bold">
            ({totalTuitions}) Tuitions Found
          </h2>
        </div>

        <form>
          <label className="input max-w-[300px] w-[300px] input-secondary">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={handleSearch}
              type="search"
              className=""
              placeholder="Search Apps"
            />
          </label>
        </form>

        <div className="">
          <select onChange={handleSelect} className="select bg-white">
            <option disabled={true}>
              Sort by Budget / Date
            </option>
            <option value={"budget-desc"}>Budget : High - Low</option>
            <option value={"budget-asc"}>Budget : Low - High</option>
            <option value={"size-desc"}>Date : Descending</option>
            <option value={"size-asc"}>Date : Ascending</option>
         </select>
        </div>
      </div>
      

        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tuitions.map((tuition, index) => (
            <Card key={index} tuition={tuition} />
          ))}
        </div>
        <div className="flex justify-center flex-wrap gap-3 my-10">
          
          {
            currentPage > 1 && <button onClick={() => setCurrentPage(currentPage - 1 )} className="btn">Prev</button>
          }
          
          
          {
            [...Array(totalPage).keys()].map(i => <button onClick={()=> setCurrentPage(i)} className={`btn ${currentPage === i && "btn-primary"}`} >{i+1}</button>)
          }

         {
            currentPage < totalPage-1 && <button onClick={() => setCurrentPage(currentPage + 1 )} className="btn">Next</button>
          }
        </div>
      </Container>
    </div>
  );
};

export default AllTuitions;
