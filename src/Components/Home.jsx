import React from "react";
import { BsPerson, BsThreeDots } from "react-icons/bs";

const Home = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between px-5">
          <img src="/header-img.png" alt="" />
          <div>
            <div className="p-3 text-xl text-black rounded-full flex gap-2 shadow-2xl">
              <BsPerson /> Log In
            </div>
            <button>
              {" "}
              <BsThreeDots />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
