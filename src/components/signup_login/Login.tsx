import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_SUCCESS, FormData } from "../../redux/interfaces/interfaces";

const Login: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [savedData, setSavedData] = useState<FormData[]>([]);
  const [errors, setErrors] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedSigninData = useSelector((state: any) => state.signupForm);
  const loginData = useSelector((state: any) => state.loginForm);

  useEffect(() => {
    if (savedSigninData) {
      setSavedData(savedSigninData.users);
      if (loginData.userName !== "") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            userName: "",
            email: "",
            isLoggedIn: false,
          },
        });
      }
    }
    else{
      setErrors("Email and password cannot be empty")
    }
  }, [savedSigninData, loginData, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    savedData.forEach((userDetails) => {
      if (
        loginEmail === userDetails.email &&
        loginPassword === userDetails.password
      ) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            userName: userDetails.userName,
            email: loginEmail,
            isLoggedIn: true,
          },
        });
        navigate("/displayBlogs");
      } else {
        setErrors("Email and password doesn't match with our database")
        setTimeout(() => {
          setErrors("");
        }, 2000); 

      }
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className=" form mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
          <p>{errors}</p>
          <p className="mt-4">
            Don't have an account?{" "}
            <Link to="/signup">
              <button
                type="button"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-full text-base px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 "
              >
                Signin
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
