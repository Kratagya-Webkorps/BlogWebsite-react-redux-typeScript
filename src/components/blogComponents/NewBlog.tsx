import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CANCEL_BLOG_DATA,
  GET_ALL_BLOGS,
} from "../../redux/interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const NewBlog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.loginForm);
  const { userName, email } = isLoggedIn;
  const blogs = useSelector((state: any) => state.allBlogDetails.blogs);

  const handleCancel = () => {
    navigate("/displayBlogs");
    dispatch({
      type: CANCEL_BLOG_DATA,
    });
  };

  const handleSubmit = () => {
    if (title !== "" && body !== "" && tags !== "") {
      const newBlog = {
        id: uuidv4(),
        userName: userName,
        title: title,
        body: body,
        tags: `#${tags}`,
        likes: 0,
        comment: [],
      };
      const updatedBlogs = [...blogs, newBlog];
      dispatch({
        type: GET_ALL_BLOGS,
        payload: updatedBlogs,
      });
      setTitle("");
      setBody("");
      setTags("");
      navigate("/displayBlogs");
    }
  };

  return (
    <>
      <div className="h-dvh p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">New Blog Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="full_email">Email</label>
                        <input
                          type="text"
                          name="full_email"
                          id="full_email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter your Email"
                          value={email}
                          readOnly
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="full_name">Name</label>
                        <input
                          type="text"
                          name="full_name"
                          id="full_name"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Enter your Email"
                          value={userName}
                          readOnly
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label>Title</label>
                        <input
                          type="text"
                          name="email"
                          id="title"
                          className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 `}
                          placeholder="Enter your title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <label>Body of Blog</label>
                        <textarea
                          className={`resize-x border mt-1 rounded px-4 bg-gray-50 `}
                          id="publisherBody"
                          name="Body"
                          value={body}
                          placeholder="Enter your blog data"
                          onChange={(e) => setBody(e.target.value)}
                          //   onInput={(e) => autoResizeTextarea(e.currentTarget)}
                        ></textarea>
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="full_email">Tags you want to Add</label>
                        <input
                          type="text"
                          name="Tags"
                          id="tags"
                          placeholder="Enter your Tags"
                          className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 `}
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-5 text-right ">
                        <div className="inline-flex items-end">
                          <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="inline-flex items-end ml-4">
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBlog;
