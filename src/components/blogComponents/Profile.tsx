import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { SavedBlog } from "../../redux/interfaces/interfaces";



const Profile: React.FC = () => {
  const loginData = useSelector((state: any) => state.loginForm);
  const { userName, email } = loginData;

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showCardItems, setShowCardItems] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);

  let response = useSelector((state: any) => state.allBlogDetails.blogs);
  let count: number = 0;
  let userBlogs: SavedBlog[] = [];
  if (response) {
    response.forEach((element: SavedBlog) => {
      if (element.userName === userName) {
        userBlogs.push(element);
        count = count + 1;
      }
    });
  }

  const handleCancel = () => {
    setShowCardItems(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginDetails");
    setIsLoggedIn(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  if (showCardItems) {
    return <Navigate to="/displayBlogs" />;
  }
  const handleBlogSelect = (title: string) => {
    setSelectedBlog(title);
    // Additional logic you want to perform when a blog is selected
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="h-dvh bg-gray-200 dark:bg-gray-800 flex flex-wrap items-center justify-center">
          <div className="lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 easy-in-out">
            <div className="h-32 overflow-hidden">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                alt=""
              />
            </div>
            <div className="flex justify-center px-5 -mt-12">
              <img
                className="h-32 w-32 bg-white p-2 rounded-full"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                alt=""
              />
            </div>
            <div>
              <div className="text-center px-14">
                <h2 className="text-gray-800 text-3xl font-bold">
                  {userName}
                </h2>
                <p className="text-gray-400 mt-2 hover:text-blue-500">
                  {email}
                </p>
              </div>
              <div className="text-center mt-2">
                <button
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 w-max text-center rounded-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold mx-2 py-2 px-4 w-max text-center rounded-full"
                  onClick={handleCancel}
                >
                  Back
                </button>
              </div>
              <hr className="mt-6" />
              <div className="bg-gray-50 relative">
                <div
                  className="text-center w-1/1 p-4 hover:bg-gray-100 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <button className=" flex items-center" type="button">
                    <span>Number of Blogs: {count}</span>
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-2 min-w-min mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                      <ul className="py-2 text-sm  text-gray-700 dark:text-gray-200">
                        {userBlogs.map((blog) => (
                          <li key={blog.id}>
                            <Link
                              to={`/blog/${blog.id}`}
                              className={`inline-block  py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                                selectedBlog === blog.title
                                  ? "bg-blue-200 dark:bg-blue-600"
                                  : ""
                              }`}
                              onClick={() => handleBlogSelect(blog.title)}

                            >
                              {blog.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Profile;