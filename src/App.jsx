import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import "./index.css";
import Register from "./Components/Register";
import VerifyOtp from "./Components/Verify";
import VerificationSuccessful from "./Components/VerificationSuccessfully";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route
          path="/verify-successfull"
          element={<VerificationSuccessful />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
