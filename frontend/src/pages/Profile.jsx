import { useQuery } from "@tanstack/react-query";

import { getProfile } from "../api/user";

function Profile() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading) {
    return (
      <p className="text-slate-400">
        Loading profile...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-400">
        Failed to load profile.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h1 className="mb-2 text-3xl font-bold">
          {user.username}
        </h1>

        <p className="text-slate-400">
          {user.email}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Joined:{" "}
          {new Date(
            user.createdAt
          ).toLocaleDateString()}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">
            Total Vents
          </h2>

          <p className="mt-2 text-4xl font-bold text-violet-400">
            {user._count.vents}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">
            Total Comments
          </h2>

          <p className="mt-2 text-4xl font-bold text-cyan-400">
            {user._count.comments}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          Recent Vents
        </h2>

        {user.vents.map((vent) => (
          <div
            key={vent.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <h3 className="font-semibold">
              {vent.title}
            </h3>

            <p className="mt-2 text-slate-400">
              {vent.content}
            </p>

            <div className="mt-3 flex gap-4 text-sm text-slate-500">
              <span>
                💬 {vent._count.comments}
              </span>

              <span>
                ▲ {vent._count.votes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;