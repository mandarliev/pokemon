"use client";

import { useEffect, useState } from "react";
import { fetchPokemon } from "./api";
import Carousel from "./Carousel";
import PokemonCard from "./PokemonCard";

export default function Home() {
  const [id, setId] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePrevious = () => {
    if (id > 1) {
      setId(id - 1);
    }
  };

  const handleNext = () => setId(id + 1);

  useEffect(() => {
    const handleFetchPokemon = async () => {
      setLoading(true);
      setError(null);

      const { error, response } = await fetchPokemon(id);

      if (error) {
        setError(error.message);
      } else {
        setPokemon(response);
      }

      setLoading(false);
    };
    handleFetchPokemon();
  }, [id]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Carousel onPrevious={handlePrevious} onNext={handleNext}>
        <PokemonCard loading={loading} error={error} data={pokemon} />
      </Carousel>
    </main>
  );
}
