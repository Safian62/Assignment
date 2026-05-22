import React from "react";
import { BsPerson, BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: 1,
    name: "Pre-Travel Check",
    url: "good.png",
    icon: "->",
  },
  {
    id: 2,
    name: "Video Consultation",
    url: "video.png",
    icon: "->",
  },
  {
    id: 3,
    name: "Documentation Support",
    url: "good.png",
    icon: "->",
  },
];
const Home = () => {

    const navigate = useNavigate()
  return (
    <div>
      <div>
        <div className="flex justify-between items-center px-5">
          <img src="/header-img.png" alt="" />
          <div className="flex gap-2">
            <div
              className="px-2 py-1 h-fit text-xl cursor-pointer text-black rounded-full flex items-center justify-center gap-2 shadow-md border border-gray-200"
              onClick={() => navigate("/login")}
            >
              <BsPerson /> Log In
            </div>
            <button>
              {" "}
              <BsThreeDots />{" "}
            </button>
          </div>
        </div>
        <div className="px-20">
          <h2 className="text-4xl font-bold text-blue-800">Enjoy Dubai.</h2>
          <h3 className="text-3xl font-bold mt-2 text-gray-900">
            We'll Handle The Meds!
          </h3>
        </div>
        <div className="flex justify-center  gap-2 mt-10">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center gap-4 bg-blue-200 rounded-2xl px-4"
            >
              <h2>{item.name}</h2>
              <div className="flex justify-center gap-2 items-center">
                <img src={item.url} className="h-20 w-20" alt={item.name} />
                <span>{item.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
