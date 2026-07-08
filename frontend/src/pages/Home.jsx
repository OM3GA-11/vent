import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import EmotionFilter from "../components/EmotionFilter";
import VentCard from "../components/VentCard";

import { getVents } from "../api/vent";
import VentSkeleton from "../components/VentSkeleton";

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
    <div className="space-y-8 md:space-y-10">
      
      {/* Hero */}
      

      <section className="relative py-8 md:py-10">
        <div
            className="pointer-events-none
                    absolute
                    -left-20
                    -top-10
                    h-48
                    w-48
                    sm:h-64
                    sm:w-64
                    md:h-72
                    md:w-72
                    rounded-full
                    bg-violet-500/20
                    blur-3xl
                    "
        />

          <h1 className="relative bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
            Let it out.
          </h1>

          <p className="relative mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
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
          <div className="space-y-5">
            {[...Array(4)].map((_, index) => (
              <VentSkeleton key={index} />
            ))}
          </div>
        )}

        {error && (
          <p className="text-red-400">
            Failed to load vents.
          </p>
        )}

        {!isLoading &&
  vents?.map((vent) => (
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