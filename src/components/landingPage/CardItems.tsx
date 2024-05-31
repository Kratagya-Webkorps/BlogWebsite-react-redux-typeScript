import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_COMMENT, DELETE_CARD, INCREASE_LIKE } from "../../redux/interfaces/interfaces";

interface CardItemProps {
  blog: {
    id: string;
    userName: string;
    title: string;
    body: string;
    tags: string;
    likes: number;
  };
}

const CardItem: React.FC<CardItemProps> = ({ blog }) => {
  const loggerCredentials = useSelector((state: any) => state.loginForm);

  const loggerName = loggerCredentials.userName;

  const { id, userName, title, body, tags, likes } = blog;
  const [likeCount, setLikeCount] = useState(likes);
  const [newComment, setNewComment] = useState<string>("");
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] =useState<boolean>(false);

  const dispatch = useDispatch();
  const handleLikeClick = () => {
    dispatch({
      type: INCREASE_LIKE,
      payload: { id },
    });
    setLikeCount(likeCount + 1);
  };
  const handleComment = () => {
    setShowCommentModal(true);
  };
  const handleCommentSubmit = () => {
    setShowCommentModal(false);
    setNewComment("");
    dispatch({
      type: ADD_COMMENT,
      payload: { id, newComment, loggerName },
    });
  };
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    dispatch({
      type: DELETE_CARD,
      payload: { id },
    });
    setShowDeleteModal(false);
  };
  return (
    <>
      <div
        key={id}
        className="relative flex py-2 min-w-min px-4 ml-3 flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
      >
        <div className="p-6">
          <Link
            to={`/blog/${id}`}
            className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-700"
          >
            {title.length > 30 ? `${title.slice(0, 38)}` : title}
            <p className="text-blue-700 text-xs">...click here</p>
          </Link>

          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {body.split(" ").slice(0, 30).join(" ")}
            <Link className="text-blue-900" to={`/blog/${id}`}>
              {body.split(" ").length > 30 && "  .....read more"}
            </Link>
          </p>
        </div>
        <div className="px-6 pt-4 pb-2 ">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {tags}
          </span>
          <p className="text-gray-900 leading-none">{userName}</p>
        </div>
        <div className="flex mt-auto ml-4">
          <button
            className="material-symbols-outlined"
            onClick={handleLikeClick}
          >
            favorite{" "}
          </button>
          <p>{likeCount}</p>
          <button
            className="material-symbols-outlined ml-4"
            onClick={handleComment}
          >
            add_comment
          </button>
          {blog.userName === loggerName && (
            <button
              onClick={handleDelete}
              className="material-symbols-outlined ml-4"
            >
              delete
            </button>
          )}
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
            <p className="mb-4">Are you sure you want to delete this blog?</p>
            <div className="flex justify-end">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Yes, Delete
              </button>
              <button
                onClick={()=>setShowDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showCommentModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add Comment</h2>
            <textarea
              id="description"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your comment here..."
            ></textarea>

            <div className="flex justify-end">
              <button
                onClick={() => setShowCommentModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg mt-3"
              >
                Cancel
              </button>
              <button
                onClick={handleCommentSubmit}
                className="bg-blue-400 mx-2 px-4 py-2 rounded-lg mt-3"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardItem;
