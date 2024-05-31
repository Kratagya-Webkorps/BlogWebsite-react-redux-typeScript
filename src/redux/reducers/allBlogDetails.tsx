import { Reducer } from "redux";
import {
  ADD_COMMENT,
  CardItemsProps,
  DELETE_CARD,
  GET_ALL_BLOGS,
  INCREASE_LIKE,
  SavedBlog,
} from "../interfaces/interfaces";

const initialstate: CardItemsProps = {
  blogs: [],
};

const allBlogDetailsReducer: Reducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_ALL_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case INCREASE_LIKE:
      const { id } = action.payload;
      return {
        ...state,
        blogs: state.blogs.map((blog: SavedBlog) => {
          if (blog.id === id) {
            return {
              ...blog, // Maintain the rest of the blog properties
              likes: blog.likes + 1, // Update the likes property
            };
          }
          return blog;
        }),
      };
    case ADD_COMMENT:
      const { newComment, loggerName } = action.payload;
      return {
        ...state,
        blogs: state.blogs.map((blog: SavedBlog) => {
          if (blog.id === action.payload.id) {
            const updatedComments = [
              ...blog.comment,
              { viewerName: loggerName, comments: [newComment] },
            ];
            return {
              ...blog,
              comment: updatedComments,
            };
          }
          return blog;
        }),
      };
      case DELETE_CARD:
        return {
          ...state,
          blogs: state.blogs.filter((blog: SavedBlog) => blog.id !==  action.payload.id)

        }
    default:
      return state;
  }
};

export default allBlogDetailsReducer;
