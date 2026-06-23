const emotions = [
  { label: "😊 Happy", color: "bg-green-500/20 text-green-400" },
  { label: "😟 Stressed", color: "bg-amber-500/20 text-amber-400" },
  { label: "😔 Sad", color: "bg-blue-500/20 text-blue-400" },
  { label: "😡 Angry", color: "bg-red-500/20 text-red-400" },
  { label: "😰 Anxious", color: "bg-purple-500/20 text-purple-400" },
];

function EmotionFilter() {
  return (
    <div className="flex flex-wrap gap-3">
      {emotions.map((emotion) => (
        <button
          key={emotion.label}
          className={`rounded-full px-4 py-2 text-sm font-medium transition hover:scale-105 ${emotion.color}`}
        >
          {emotion.label}
        </button>
      ))}
    </div>
  );
}

export default EmotionFilter;