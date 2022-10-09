import React from "react";
import Blade from "./Blade";
import { useQuery, useQueryClient } from "react-query";
import { addComment, comments } from "../api";
import dayjs from "dayjs";
import Comment from "./CommentCard";

interface CommentsBladeProps {
  itemId?: number;
}

const CommentsBlade = ({ itemId }: CommentsBladeProps) => {
  const [commentText, setCommentText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    itemId && setOpen(true);
  }, [itemId]);

  const { data } = useQuery(["comments", itemId], () => comments(itemId!), {
    enabled: !!itemId,
  });

  const onClose = () => {
    setOpen(false);
    setCommentText("");
  };

  const onCommentSubmit = () => {
    if (!itemId) {
      return;
    }

    addComment(itemId, {
      username: "some@user.com",
      description: commentText,
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    }).then(() => {
      setCommentText("");
      queryClient.invalidateQueries(["comments", itemId]);
    });
  };

  return (
    <Blade title={"Comments"} open={open} onClose={onClose}>
      <div>
        <div className="px-2 sm:px-4">
          {data?.length ? (
            data.map((comment, idx) => <Comment comment={comment} key={idx} />)
          ) : (
            <p className="my-5 text-base text-gray-500  md:text-xl lg:mx-0">
              No comments yet
            </p>
          )}
        </div>

        <div className="m-4 p-2 rounded-md border-gray-200 bg-gray-100">
          <div className="mt-1">
            <textarea
              id="comment"
              name="comment"
              rows={4}
              className="mb-2 p-2 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Wubba Lubba Dub Dub!..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <button
            onClick={onCommentSubmit}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Comment
          </button>
        </div>
      </div>
    </Blade>
  );
};

export default CommentsBlade;
