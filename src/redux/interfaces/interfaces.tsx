export interface LoginFormState {
  email: string;
  userName: string;
  isLoggedIn: boolean;
}

export interface FormData {
  userName: string;
  email: string;
  password: string;
}

export interface SignupFormState {
  users: FormData[];
}

export interface SavedBlog {
  id:  string;
  userName: string;
  title: string;
  body: string;
  tags: string;
  likes: number;
  comment: {
    viewerName: string;
    comments: string[];
  }[];
}


export interface CardItemsProps {
  blogs: SavedBlog[];
}
export interface FilteredBlogs {
  id: number | string;
  title: string;
}

export const SUBMIT_FORM = "SUBMIT_FORM";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const SUBMIT_BLOG_DATA = "SUBMIT_BLOG_DATA";
export const CANCEL_BLOG_DATA = "CANCEL_BLOG_DATA";
export const GET_ALL_BLOGS = "GET_ALL_BLOGS";
export const INCREASE_LIKE = "INCREASE_LIKE";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_CARD = "DELETE_CARD";


