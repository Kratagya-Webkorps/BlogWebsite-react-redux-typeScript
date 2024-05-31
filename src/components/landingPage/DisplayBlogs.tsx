import React, { useEffect } from "react";
import Navbar from "./Navbar";
import CardBlock from "./CardBlock";
import { GET_ALL_BLOGS } from "../../redux/interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";

const DisplayBlogs: React.FC = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state: any) => state.allBlogDetails.blogs);

  useEffect(() => {
    if(blogs.length===0){
      dispatch({
        type: GET_ALL_BLOGS,
        payload: [
          {
            id: "1",
            userName: "Sarah Johnson",
            title: "Finding Joy in Small Moments",
            body: "In a world filled with chaos, it's essential to find joy in the little things. Whether it's a warm cup of coffee in the morning or a beautiful sunset at night, these small moments can bring immense happiness. Take a moment each day to appreciate the simplicity around you.",
            tags: "#Joy #Gratitude #Mindfulness",
            likes: 85,
            comment: [
              {
                viewerName: "Jay",
                comments: ["nice Work", "Impressive"],
              },
            ],
          },
          {
            id: "2",
            userName: "Alex Chen",
            title: "The Power of Positive Affirmations",
            body: "Positive affirmations have the remarkable ability to transform our mindset and outlook on life. By repeating empowering statements daily, we can rewire our brains to focus on the good and overcome challenges with resilience. Embrace the power of positivity!",
            tags: " #PositiveThinking #Affirmations #SelfEmpowerment",
            likes: 5,
            comment: [
              {
                viewerName: "Aman",
                comments: ["nice Work", "Impressive"],
              },
              {
                viewerName: "Ram",
                comments: ["Go to hell", "han bhai"],
              },
            ],
          },
        ],
      });
    }
    else{
      dispatch({
        type:GET_ALL_BLOGS,
        payload:blogs
      })
    }
    
  }, [dispatch,blogs]); 


  return (
    <>
      <Navbar />
      <CardBlock blogs={blogs} />
    </>
  );
};

export default DisplayBlogs;
