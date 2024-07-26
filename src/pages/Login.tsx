import { useState } from "react";
import MainHeader from "../components/Navigation/MainHeader";
import Button from "../components/UI/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { SERVER_URI } from "../utils/uri";
import toast from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
export type userProps = {
  fullName: string;
  token: string;
};
export type dataProps<T> = {
  statuscode: number;
  message: string;
  data: T;
};
export type responseProps<T> = {
  message: string;
  name: string;
  code: string;
  status: string;
  response: T;
};
export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isPasswordVisible, setPasswordVisible] = useState("password");
  const [userInfo, setUserInfo] = useState({
    email: "admin@gmail.com",
    password: "admin",
  });
  const handleLogin = async () => {
    setLoading(true);
    await axios
      .post(`${SERVER_URI}/authentication/credentials`, {
        email: userInfo.email,
        password: userInfo.password,
      })
      .then(async (response) => {
        const res: dataProps<userProps> = response.data;
        const data: userProps = res.data;
        toast.success("Login Successfully!");
        sessionStorage.setItem("userName", JSON.stringify(data.fullName));
        sessionStorage.setItem("userToken", JSON.stringify(data.token));
        setLoading(false);
        navigate("/accounts");
        setUserInfo({ email: "", password: "" });
      })
      .catch((error: responseProps<{ data: dataProps<userProps> }>) => {
        if (!error.response) {
          toast.error(error.message);
          setLoading(false);
          return;
        }
        const data: dataProps<userProps> = error.response.data;
        toast.error(data.message);
        setLoading(false);
        setUserInfo({ ...userInfo, password: "" });
      });
  };
  return (
    <div className="w-full h-screen bg-[url('/garment-background.jpg')] bg-cover">
      <MainHeader isLogInPage={true} checkLogIn={false} />
      <div className="mt-14 flex items-center justify-center ">
        <title>Sign In</title>
        <div className="bg-slate-100 shadow-md rounded px-6 pt-6 pb-8 mb-4">
          <h1 className="pb-4 text-2xl text-gray-500 text-center">Sign In</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-500 text-sm font-bold mb-2"
                id="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={userInfo.email}
                required
                onChange={(e) => {
                  setUserInfo({ ...userInfo, email: e.target.value });
                }}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-500 text-sm font-bold mb-2"
                id="password"
              >
                Password
              </label>
              <div className="relative shadow appearance-none border rounded w-72 py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline">
                <input
                  className="outline-none w-10/12"
                  id="password"
                  required
                  type={isPasswordVisible}
                  placeholder="******************"
                  value={userInfo.password}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, password: e.target.value });
                  }}
                />
                <div
                  className="absolute right-3 top-[6px] cursor-pointer"
                  onClick={() => {
                    setPasswordVisible(
                      isPasswordVisible === "password" ? "text" : "password"
                    );
                  }}
                >
                  {isPasswordVisible === "password" ? (
                    <VisibilityIcon titleAccess="Show Password" />
                  ) : (
                    <VisibilityOffIcon titleAccess="Hide Password" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button
                className="bg-blue-500 text-center hover:bg-blue-700 w-72 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                // to="/accounts"
              >
                {loading ? (
                  <CircularProgress color="inherit" size={14} />
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
            <div className="flex justify-end">
              <a
                className="mt-4 inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
