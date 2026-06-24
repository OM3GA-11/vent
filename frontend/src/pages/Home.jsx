import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import EmotionFilter from "../components/EmotionFilter";
import VentCard from "../components/VentCard";

import { getVents } from "../api/vent";

function Home() {
  const [selectedEmotion, setSelectedEmotion] =
  useState("");
  const {
  data: vents,
  isLoading,
  error,
} = useQuery({
  queryKey: ["vents", selectedEmotion],
  queryFn: () => getVents(selectedEmotion),
});
  return (
    <div className="space-y-10">
      
      {/* Hero */}
      

      <section className="relative pb-6 pt-2">
        <div
            className="pointer-events-none
                    absolute
                    -left-20
                    -top-10
                    h-72
                    w-72
                    rounded-full
                   bg-violet-500/20
                    blur-3xl
                    "
        />

          <h1 className="relative bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-6xl font-bold text-transparent">
            Let it out.
          </h1>

          <p className="relative mt-4 max-w-2xl text-lg text-slate-400">
            A safe place to express emotions,
            share experiences, and connect with
            people who understand.
          </p>
      </section> 

      {/* Filters */}
      <section>
        <EmotionFilter
          selectedEmotion={selectedEmotion}
          setSelectedEmotion={setSelectedEmotion}
        />
      </section>

      {/* Feed */}
      <section className="space-y-5">
        {isLoading && (
          <p className="text-slate-400">
            Loading vents...
          </p>
        )}

        {error && (
          <p className="text-red-400">
            Failed to load vents.
          </p>
        )}

        {vents?.map((vent) => (
          <VentCard
            key={vent.id}
            vent={vent}
          />
        ))}
        {!isLoading && vents?.length === 0 && (
          <p className="text-slate-400">
            No vents found for this emotion.
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;