import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";import { useState } from "react";
import { createComment } from "../api/comment";
import { formatDistanceToNow } from "date-fns";

import { getVentById } from "../api/vent";

function VentDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [commentText, setCommentText] =
  useState("");

  const {
    data: vent,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vent", id],
    queryFn: () => getVentById(id),
  });

  if (isLoading) {
    return (
      <p className="text-slate-400">
        Loading vent...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-400">
        Failed to load vent.
      </p>
    );
  }

  const handleCommentSubmit = async (e) => {
  e.preventDefault();

  if (!commentText.trim()) return;

  try {
    await createComment({
  content: commentText,
  ventId: id,
});

setCommentText("");

queryClient.invalidateQueries({
  queryKey: ["vent", id],
});
  } catch (error) {
    console.error(error);

    alert("Failed to create comment");
  }
};



  return (
    <div className="mx-auto max-w-4xl space-y-6">

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
        <h1 className="mb-4 text-2xl md:text-3xl break-words font-bold">
          {vent.title}
        </h1>

        <p className="mb-4 break-words text-sm text-slate-300 md:text-base">
          {vent.content}
        </p>

        <div className="flex flex-wrap items-center gap-2 md:gap-4">

  <span className="rounded-full bg-violet-500/20 px-3 py-1 text-sm text-violet-400">
    {vent.emotion}
  </span>

  <span className="text-slate-500">
    by {vent.author.username}
  </span>

  <span className="text-violet-400 font-medium">
    ▲ {vent.voteScore}
  </span>

</div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
        <h2 className="mb-4 text-xl md:text-2xl font-semibold">
          Comments ({vent.comments.length})
        </h2>
        <form
                onSubmit={handleCommentSubmit}
                className="mb-6 space-y-3"
                >
                <textarea
                    rows="3"
                    value={commentText}
                    onChange={(e) =>
                    setCommentText(e.target.value)
                    }
                    placeholder="Share your thoughts..."
                    className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    p-3
                    outline-none
                    focus:border-violet-500
                    "
                />

                <button
                    type="submit"
                    className="
                    rounded-xl
                    bg-gradient-to-r
                    from-violet-500
                    via-purple-500
                    to-cyan-500
                    w-full px-5 py-2 md:w-auto
                    font-medium
                    "
                >
                    Add Comment
                </button>
            </form>


        

        {vent.comments.length === 0 ? (
          <p className="text-slate-500">
            No comments yet.
          </p>
        ) : (
          vent.comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 transition hover:bg-white/10"
            >
              <div className="mb-3 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 font-semibold text-white">
                    {comment.author.username.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-medium text-white">
                      {comment.author.username}
                    </p>

                    <p className="text-xs text-slate-500">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
</p>
                  </div>

                </div>

              </div>

              <p className="break-words leading-relaxed text-sm text-slate-300 md:text-base">
                {comment.content}
              </p>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default VentDetails;