import React from "react";
import dayjs from "dayjs";
import { Comment } from "../types";

interface CommentProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentProps) => (
  <div className="py-4 w-full">
    <div className="bg-white p-4 shadow rounded">
      <div className="flex w-full border-b border-gray-200 pb-4">
        <img
          src="https://placekitten.com/640/360"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex items-start justify-between w-full">
          <div className="pl-3 w-full">
            <p className="text-xl font-medium leading-5 text-gray-800">
              {comment.username}
            </p>
            <p className="text-sm leading-normal pt-2 text-gray-500">
              {dayjs(comment.date).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
        </div>
      </div>
      <div className="px-1">
        <p className="text-sm leading-5 py-2 text-gray-600">
          {comment.description}
        </p>
      </div>
    </div>
  </div>
);

export default CommentCard;
