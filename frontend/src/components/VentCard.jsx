import { Link } from "react-router-dom";

function VentCard({ vent }) {
  return (
    <Link to={`/vents/${vent.id}`} className="block">
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-6
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-violet-500/40
        hover:bg-white/[0.06]
        hover:shadow-lg
        hover:shadow-violet-500/10
      "
    >
      <h2 className="mb-3 text-xl font-semibold">
        {vent.title}
      </h2>

      <p className="mb-4 text-slate-300">
        {vent.content}
      </p>

      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs text-amber-400">
          {vent.emotion}
        </span>

        <span className="text-sm text-slate-500">
          by {vent.author.username}
        </span>
      </div>

      <div className="flex gap-4 text-slate-400">
        <span>▲ {vent._count.votes}</span>

        <span>
          💬 {vent._count.comments}
        </span>
      </div>
    </div>
    </Link>
  );
}

export default VentCard;