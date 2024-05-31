import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FilteredBlogs } from "../../redux/interfaces/interfaces";

const Navbar: React.FC = () => {
  const blogs = useSelector((state: any) => state.allBlogDetails.blogs);
  const [searchInput, setSearchInput] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<FilteredBlogs[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    // Filter blogs based on the search input
    const filtered = blogs.filter((blog: FilteredBlogs) =>
      blog.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
        <div className=" grid grid-flow-col justify-between p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              My Blogs
            </span>
          </a>
          <input
            type="text"
            id="search-navbar"
            className="p-2 w-96 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by Title..."
            value={searchInput}
            onChange={handleSearchChange}
          />
          {filteredBlogs.length > 0 && (
            <div className="absolute mt-1 bg-white rounded-lg justify-self-center shadow-lg z-10">
              {filteredBlogs.map((blog: FilteredBlogs) => (
                <div
                  key={blog.id}
                  className="py-1 px-3 cursor-pointer hover:bg-gray-200"
                >
                  <div>
                    <Link
                      to={`/blog/${blog.id}`}
                      className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-700"
                    >
                      {blog.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"></ul>
          </div>
          <div>
            <Link
              to={"/displayblogs/addnewblog"}
              className="text-black font-bold py-2 px-4"
            >
              Add New Blog
            </Link>
            <Link
              to={"/displayblogs/profile"}
              className="text-black font-bold py-2 px-4"
            >
              My Profile
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
