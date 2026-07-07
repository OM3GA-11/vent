function VentSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-4 h-6 w-2/3 rounded bg-white/10"></div>

      <div className="mb-2 h-4 w-full rounded bg-white/10"></div>
      <div className="mb-2 h-4 w-5/6 rounded bg-white/10"></div>
      <div className="mb-6 h-4 w-3/4 rounded bg-white/10"></div>

      <div className="flex justify-between">
        <div className="h-5 w-20 rounded-full bg-white/10"></div>

        <div className="h-5 w-24 rounded bg-white/10"></div>
      </div>
    </div>
  );
}

export default VentSkeleton;