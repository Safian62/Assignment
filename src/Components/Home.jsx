import React, { useEffect, useState } from "react";
import { BsPerson, BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getCookie, clearAccessToken } from "../utils/cookies";

const data = [
  {
    id: 1,
    name: "Pre-Travel Check",
    url: "good.png",
    icon: "->",
    color: "#C3EBE5",
  },
  {
    id: 2,
    name: "Video Consultation",
    url: "video.png",
    icon: "->",
    color: "#FFF0A6",
  },
  {
    id: 3,
    name: "Documentation Support",
    url: "good.png",
    icon: "->",
    color: "#C4DAEA",
  },
];
const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!getCookie("accessToken"));
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div className="flex justify-between items-center px-5">
          <img src="/header-img.png" alt="" />
          <div className="flex gap-2">
            {loggedIn ? (
              <div
                className="px-2 py-1 h-fit text-xl cursor-pointer text-black rounded-full flex items-center justify-center gap-2 shadow-md border border-gray-200"
                onClick={() => {
                  clearAccessToken();
                  setLoggedIn(false);
                  navigate("/");
                }}
              >
                Logout
              </div>
            ) : (
              <div
                className="px-2 py-1 h-fit text-xl cursor-pointer text-black rounded-full flex items-center justify-center gap-2 shadow-md border border-gray-200"
                onClick={() => navigate("/login")}
              >
                <BsPerson /> Log In
              </div>
            )}
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
        <div className="flex justify-center gap-20 mt-10">
          {data.map((item) => (
            <div
              key={item.id}
              style={{ backgroundColor: item.color }}
              className={`flex items-center justify-center gap-4 rounded-2xl px-4`}
            >
              <h2>{item.name}</h2>
              <div className="flex justify-center gap-2 items-center">
                <img src={item.url} className="h-20 w-20" alt={item.name} />
                <span>{item.icon}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full p-20 bg-blue-400 mt-10 text-center">
          <h2 className="text-4xl text-white font-bold">Enjoy Dubai</h2>
          <h1 className="text-4xl text-white font-bold">
            We'll handle the meds
          </h1>
          <div className="h-100 w-100 mx-auto">
            <img src="/group.png" className="h-full bg-contain w-full" alt="" />
          </div>
          <div className="flex gap-5 justify-center flex-wrap lg:flex-nowrap px-5">
            <div className="bg-blue-700 rounded-xl py-8 px-6 text-center flex flex-col items-center justify-center min-h-[400px] max-w-[350px]">
              <h2 className="text-3xl text-white font-bold mb-4">
                Is my prescription
              </h2>
              <div className="h-[180px] w-[180px] mx-auto mb-4">
                <img
                  src="pricription.png"
                  alt="Prescription"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-3xl text-blue-200 font-bold mb-6">
                legal here?
              </h2>
              <p className="text-sm font-semibold text-white leading-relaxed">
                Healthcare laws in the UAE are strict. Some common painkillers,
                anxiety medications, and ADHD treatments that are legal back
                home may be controlled or restricted in Dubai.
              </p>
            </div>

            <div className="bg-blue-700 rounded-xl py-8 px-6 text-center flex flex-col items-center justify-center min-h-[400px] max-w-[350px]">
              <h2 className="text-3xl text-white font-bold">Don't guess.</h2>
              <h2 className="text-3xl text-blue-200 font-bold mb-6">
                Know for sure.
              </h2>
              <p className="text-sm font-semibold text-white leading-relaxed mb-6">
                We translate complex UAE medication regulations into clear
                guidance—so you can travel, live, and refill prescriptions
                safely and legally.
              </p>
              <div className="h-[180px] w-[180px] mx-auto">
                <img
                  src="female.png"
                  alt="Healthcare professional"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
