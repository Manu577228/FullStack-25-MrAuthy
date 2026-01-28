import { Link, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { useContext, useRef, useState } from "react"
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {

  const inputRef = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const { getUserData, isLoggedIn, userData, backendURL } = useContext(AppContext);

  axios.defaults.withCredentials = true;

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
    const otpValue = inputRef.current.map(input => input.value).join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter your 6 digit OTP!");
      return;
    }
    setOtp(otpValue);
    setIsOtpSubmitted(true);
  }

  const onSubmitEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(backendURL + `/send-reset-otp?email=${email}`);

      if (response.status === 200) {
        toast.success("Password reset OTP sent successfully!");
        setIsEmailSent(true);
      } else {
        toast.error("Something went wrong, please try again!");
      }
    } catch (error) {
      console.error("Error sending reset OTP:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP. Please try again!");
    } finally {
      setLoading(false);
    }
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error("Please enter a new password!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(backendURL + "/reset-password", {
        email,
        otp,
        newPassword
      });

      if (response.status === 200) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error("Failed to reset password. Please try again!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password. Please try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 position-relative"
      style={{ background: "linear-gradient(90deg, #dcdcdc, #111111)", border: "none" }}
    >
      <Link
        to="/"
        className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2 text-decoration-none"
      >
        <img src={assets.logo} alt="logo" height={52} width={52} />
        <span className="fs-4 fw-semibold text-dark">Mr Authy</span>
      </Link>

      {!isEmailSent && (
        <div
          className="rounded-4 p-5 text-center bg-white"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h4 className="mb-2">Reset Password</h4>
          <p className="mb-4">Please enter your registered email address</p>

          <form onSubmit={onSubmitEmail}>
            <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
              <span className="input-group-text bg-transparent border-0 ps-4">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control bg-transparent border-0 text-dark ps-1 pe-4"
                placeholder="Enter your email address"
                style={{ height: "50px", outline: "none", boxShadow: "none" }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <button
              type="submit"
              className="btn text-white w-100 fw-semibold"
              style={{ background: "linear-gradient(90deg, #111111, #dcdcdc)", border: "none" }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      )}

      {isEmailSent && !isOtpSubmitted && (
        <div className="p-5 rounded-4 shadow bg-white" style={{ width: "400px" }}>
          <h4 className="text-center fw-bold mb-2">Email Verify OTP</h4>
          <p className="text-center mb-4">
            Please enter the 6-digit code sent to your email
          </p>

          <div className="d-flex justify-content-between gap-2 mb-4">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="form-control text-center fs-4"
                ref={(el) => (inputRef.current[i] = el)}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
              />
            ))}
          </div>

          <button
            className="btn text-white w-100 fw-semibold"
            disabled={loading}
            style={{ background: "linear-gradient(90deg, #111111, #dcdcdc)", border: "none" }}
            onClick={handleVerify}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </div>
      )}

      {isEmailSent && isOtpSubmitted && (
        <div
          className="rounded-4 p-5 text-center bg-white"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h4 className="mb-2">New Password</h4>
          <p className="mb-4">Enter the new password below</p>

          <form onSubmit={onSubmitNewPassword}>
            <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
              <span className="input-group-text bg-transparent border-0 ps-4">
                <i className="bi bi-person-fill-lock"></i>
              </span>
              <input
                type="password"
                className="form-control bg-transparent border-0 ps-1 pe-4"
                placeholder="**********"
                style={{ height: "50px", outline: "none", boxShadow: "none" }}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
              />
            </div>

            <button
              type="submit"
              className="btn text-white w-100 fw-semibold"
              style={{ background: "linear-gradient(90deg, #111111, #dcdcdc)", border: "none" }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;