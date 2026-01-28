import { Link, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const EmailVerify = () => {

  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const { getUserData, isLoggedIn, userData, backendURL } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    e.target.value = value;
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    paste.forEach((digit, i) => {
      if (inputRef.current[i]) {
        inputRef.current[i].value = digit;
      }
    });
    const next = paste.length < 6 ? paste.length : 5;
    inputRef.current[next].focus();
  }

  const handleVerify = async () => {
    const otp = inputRef.current.map(input => input.value).join("");
    if (otp.length !== 6) {
      toast.error("Please enter your 6 digit OTP!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(backendURL + "/verify-otp", { otp });
      if (response.status === 200) {
        toast.success("OTP Verified Successfully!");
        getUserData();
        navigate("/");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedIn, userData]);

  return (
    <div className="email-verify-container d-flex align-items-center justify-content-center vh-100 position-relative"
      style={{ background: "linear-gradient(90deg, #ffffff, #000000)", borderRadius: "none" }}
    >
      <Link to="/" className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2 text-decoration-none"
      >
        <img src={assets.logo} alt="logo" height={52} width={52} />
        <span className="fs-4 fw-semibold text-dark">Mr Authy</span>
      </Link>

      <div className="p-5 rounded-4 shadow bg-white" style={{ width: "400px" }}>
        <h4 className="text-center fw-bold mb-2">Email Verify OTP</h4>
        <p className="text-center-text-white-50 mb-4">
          Please enter the 6-digit code sent to you email
        </p>
        <div className="d-flex justify-content-between gap-2 mb-4 text-center text-white-50 mb-2">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="form-control text-center fs-4 otp-input"
              ref={(el) => (inputRef.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              style={{
                border: "2px solid black",
                outline: "none",
                boxShadow: "none",
              }}
              onFocus={(e) => {
                e.target.style.border = "2px solid black"
                e.target.style.boxShadow = "0 0 0 2px rgba(0,0,0,0.2)"
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "none"
              }}
            />

          ))}
        </div>

        <button className="btn text-white w-100 fw-semibold"
          disabled={loading}
          onClick={handleVerify}
          style={{
            background: "linear-gradient(90deg, #111111, #dcdcdc)",
            border: "none"
          }}>
          {loading ? "Verifying..." : "verify email"}
        </button>
      </div>
    </div>
  )
}

export default EmailVerify