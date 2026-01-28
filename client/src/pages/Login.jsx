import { Link, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { useContext, useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {

    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);
        try {
            if (isCreateAccount) {
                const response = await axios.post(`${backendURL}/register`, { name, email, password });
                if (response.status === 201) {
                    navigate("/");
                    toast.success("Account created successfully!");
                } else {
                    toast.error("Email already exists!");
                }
            } else {
                const response = await axios.post(`${backendURL}/login`, { email, password });
                if (response.status == 200) {
                    setIsLoggedIn(true);
                    getUserData();
                    navigate("/");
                } else {
                    toast.error("Email/Password is Incorrect")
                }
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    // Inline style to remove focus outline
    const inputStyle = {
        outline: "none",
        boxShadow: "none",
        borderColor: "#ced4da"
    };

    const inputFocusStyle = {
        outline: "none",
        boxShadow: "none",
        borderColor: "#000"
    };

    return (
        <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center" style={{ background: "linear-gradient(90deg, #ffffff, #000000)", border: "none" }}>
            <style>
                {`
                    .custom-input:focus {
                        outline: none !important;
                        box-shadow: none !important;
                        border-color: #000 !important;
                    }
                `}
            </style>

            <div style={{ position: "absolute", top: "20px", left: "30px", display: "flex", alignItems: "center" }}>
                <Link to="/" style={{
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                    textDecoration: "none",
                }}>
                    <img src={assets.logo} alt="logo" height={52} width={52} />
                    <span className="fw-bold fs-4 text-dark">Mr Authy</span>
                </Link>
            </div>

            <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">
                    {isCreateAccount ? "Create Account" : "Sign in"}
                </h2>

                <form onSubmit={onSubmitHandler}>

                    {
                        isCreateAccount && (
                            <div className="form-label">
                                <label htmlFor="Name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="Name"
                                    className="form-control custom-input"
                                    placeholder="Enter your name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                        )
                    }

                    <div className="form-label">
                        <label htmlFor="email" className="form-label">Email Id</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control custom-input"
                            placeholder="Enter your email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className="form-label">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control custom-input"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        {!isCreateAccount && (
                            <Link to="/reset-password" className="text-decoration-none text-danger">
                                Forgot Password ?
                            </Link>
                        )}
                    </div>

                    <button type="submit" className="btn w-100 text-white fw-semibold" disabled={loading}
                        style={{
                            background: "linear-gradient(90deg, #111111, #dcdcdc)",
                            border: "none"
                        }}>
                        {loading ? "Loading..." : isCreateAccount ? "Sign Up" : "Sign in"}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p className=" mb-0">
                        {
                            isCreateAccount ? (
                                <>
                                    Already have an account ?{" "}
                                    <span
                                        onClick={() => setIsCreateAccount(false)}
                                        style={{
                                            cursor: "pointer",
                                            color: "#000",
                                            textDecoration: "underline",
                                            padding: "2px 4px",
                                            transition: "all 0.2s ease"
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.backgroundColor = "#000";
                                            e.currentTarget.style.color = "#fff";
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.backgroundColor = "transparent";
                                            e.currentTarget.style.color = "#000";
                                        }}
                                    >
                                        Sign in
                                    </span>
                                </>
                            ) : (
                                <>
                                    Don't have an account ?
                                    <span
                                        onClick={() => setIsCreateAccount(true)}
                                        style={{
                                            cursor: "pointer",
                                            color: "#000",
                                            textDecoration: "underline",
                                            padding: "2px 6px",
                                            transition: "all 0.2s ease"
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.backgroundColor = "#000";
                                            e.currentTarget.style.color = "#fff";
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.backgroundColor = "transparent";
                                            e.currentTarget.style.color = "#000";
                                        }}
                                    >
                                        Sign Up
                                    </span>
                                </>
                            )
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login