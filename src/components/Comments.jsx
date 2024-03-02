import { useEffect, useState } from "react";
import { fetchComments } from "../utils/fetchComments";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  useEffect(
    //this function always sync. So we can not put async before it. But we receive promise from fetchComments thats why for making async we declar async fun inside it.
    () => {
      //making flag to control setComments
      let ignore = false;
      async function startFetching() {
        const json = await fetchComments(postId);
        if (!ignore) {
          setComments(json);
        }
      }
      startFetching();
      return () => {
        ignore = true;
      };
    },
    [postId]
  );

  return (
    <>
      <ul>
        {comments.map((comment) => (
          <li key={comment.key}>{comment.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
