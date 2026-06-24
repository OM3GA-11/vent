const emotions = [
  { label: "All", value: "" },
  { label: "😊 Happy", value: "HAPPY" },
  { label: "😟 Stressed", value: "STRESSED" },
  { label: "😰 Anxious", value: "ANXIOUS" },
  { label: "🚀 Excited", value: "EXCITED" },
  { label: "😤 Frustrated", value: "FRUSTRATED" },
  { label: "🏆 Proud", value: "PROUD" },
  { label: "😔 Lonely", value: "LONELY" },
];

function EmotionFilter({ selectedEmotion, setSelectedEmotion }) {
  return (
    <div className="relative z-20 flex flex-wrap gap-3">
      {emotions.map((emotion) => (
        <button
          key={emotion.value}
          onClick={() => {
                    console.log(emotion.value);
                    setSelectedEmotion(emotion.value);
                  }}
          className={`rounded-full px-4 py-2 text-sm font-medium transition
            ${
              selectedEmotion === emotion.value
                ? "bg-violet-500 text-white"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }
          `}
        >
          {emotion.label}
        </button>
      ))}
    </div>
  );
}

export default EmotionFilter;