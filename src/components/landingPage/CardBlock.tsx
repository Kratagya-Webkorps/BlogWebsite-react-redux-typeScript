import React from "react";
import CardItems from "./CardItems";
import { CardItemsProps } from "../../redux/interfaces/interfaces";

const CardBlock: React.FC<CardItemsProps> = ({blogs}) => {

  return (
    <>
     <div className="h-max grid grid-cols-3">
    {blogs.map((blog) => (
      <CardItems key={blog.id} blog={blog} />
    ))}
      </div>

  </>
  );
};

export default CardBlock;
