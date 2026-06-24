import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createComment } from "../api/comment";

import { getVentById } from "../api/vent";

function VentDetails() {
  const { id } = useParams();

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

    window.location.reload();
  } catch (error) {
    console.error(error);

    alert("Failed to create comment");
  }
};



  return (
    <div className="mx-auto max-w-4xl space-y-6">

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h1 className="mb-4 text-3xl font-bold">
          {vent.title}
        </h1>

        <p className="mb-4 text-slate-300">
          {vent.content}
        </p>

        <div className="flex items-center gap-4">
          <span className="rounded-full bg-violet-500/20 px-3 py-1 text-sm text-violet-400">
            {vent.emotion}
          </span>

          <span className="text-slate-500">
            by {vent.author.username}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          Comments ({vent.comments.length})

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
                    px-5
                    py-2
                    font-medium
                    "
                >
                    Add Comment
                </button>
            </form>
        </h2>


        

        {vent.comments.length === 0 ? (
          <p className="text-slate-500">
            No comments yet.
          </p>
        ) : (
          vent.comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 rounded-xl bg-white/5 p-4"
            >
              <p>{comment.content}</p>

              <p className="mt-2 text-sm text-slate-500">
                — {comment.author.username}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default VentDetails;