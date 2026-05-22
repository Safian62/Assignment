import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const VerificationSuccessful = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-6xl w-full grid grid-cols-2 items-stretch gap-8 min-h-[82vh]">
        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-white shadow-xl">
          <img
            src="/successfull.png"
            className="w-full h-full object-cover"
            alt="account created"
          />
        </div>

        <div className="h-full bg-white rounded-3xl -translate-x-20 shadow-lg p-10 relative">
          <button
            className="absolute cursor-pointer left-5 top-5 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
            onClick={() => navigate("/")}
          >
            <CgClose className="text-blue-600" />
          </button>

          <div className="max-w-md mx-auto text-center">
            <p className="text-blue-600 text-sm font-semibold mb-4">
              Account Created
            </p>
            <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-3xl">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl">
                <img src="/verify-success.png" alt="" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Account Created Successfully
            </h1>
            <p className="text-sm text-slate-500 leading-7">
              Welcome to Expat Cares. Your account has been securely created,
              and you can now access consultations, prescription services, and
              personalized healthcare support.
            </p>
          </div>

          <div
            className="mt-10 max-w-sm mx-auto"
            onClick={() => navigate("/login")}
          >
            <button className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-full text-base font-semibold">
              Continue To Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccessful;
