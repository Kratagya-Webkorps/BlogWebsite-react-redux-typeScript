import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { SavedBlog } from "../../redux/interfaces/interfaces";
import { useSelector } from "react-redux";

const BlogDetails: React.FC = () => {
  const [clickedBlog, setClickedBlog] = useState<SavedBlog>();
  let { id } = useParams<{ id: string }>();
  const [showCardItems, setShowCardItems] = useState(false);

  const savedBlogs = useSelector((state: any) => state.allBlogDetails.blogs);
  useEffect(() => {
    if (savedBlogs) {
        savedBlogs.forEach((blog: SavedBlog) => {
        if (id === blog.id.toString()) {
          setClickedBlog(blog);
        }
      });
    }
  }, [id,savedBlogs]);
  if (clickedBlog) {
  }
  const handleCancel = () => {
    setShowCardItems(true);
  };
  if (showCardItems) {
    return <Navigate to="/displayBlogs" />;
  }
  return (
    <>
      <div className="h-dvh">
        <h1 className="mb-4 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl mb-12  lg:text-4xl dark:text-black">
          {clickedBlog?.title}
        </h1>

        {clickedBlog && (
          <div className="flex gap-8 h-fit justify-center">
            <div
              key={clickedBlog.id}
              className="relative min-w-min flex  px-4 ml-3 flex-col  text-gray-700 bg-white  border border-gray-400  bg-clip-border rounded-xl w-96"
            >
              <div className="p-6">
                <Link
                  to={`/blog/${clickedBlog.id}`}
                  className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
                >
                  {clickedBlog.title}
                </Link>

                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {clickedBlog.body}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2 ">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {clickedBlog.tags}
                </span>
                <p className="text-gray-900 leading-none">
                  {clickedBlog.userName}
                </p>
              </div>
              <div className="flex mt-8 ml-4"></div>
            </div>

            <div className="min-w-min h-max p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Comments on "{clickedBlog.title}"
              </h5>
              {clickedBlog.comment.length > 0 ? (
                clickedBlog.comment.map((comment, index) => (
                  <p
                    key={`${comment.viewerName}_${index}`}
                    className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                  >
                    {comment.comments.map((c, index) => (
                      <span key={index}>
                        {comment.viewerName}: {c}
                        <br />
                      </span>
                    ))}
                  </p>
                ))
              ) : (
                <p>No comments available.</p>
              )}

              <button
                onClick={handleCancel}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
