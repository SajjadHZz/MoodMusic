"use client";
import { createContext, useState, useEffect } from "react";

export const MusicContext = createContext(null);

const MusicProvider = ({ children }) => {
  const [musicSelected, setMusicSelected] = useState("");
  const [albumSelected, setAlbumSelected] = useState({ name: "", cover: "", artist: "", category: "" });
  const [titleCategories, setTitleCategories] = useState("");
  const [musicDuration, setMusicDuration] = useState("");
  const [musicCurrent, setMusicCurrent] = useState("");
  const [progressMusic, setProgressMusic] = useState("");
  const [playButtonMusic, setPlayButtonMusic] = useState();

  useEffect(() => {
    const categoryTitle = document.getElementById(`controler_of_${albumSelected.category}`);

    const musicDurationControler = document.querySelector(
      `p[data-current-category="${albumSelected.category}"]`
    );
    const musicCurrentControler = document.querySelector(
      `p[data-duration-category="${albumSelected.category}"]`
    );
    const musicProgressControler = document.querySelector(
      `span[data-progress-category="${albumSelected.category}"]`
    );
    const musicPlayButtonControler = document.getElementById(
      `play-music-controller-${albumSelected.category}`
    );

    setTitleCategories(categoryTitle);
    setMusicDuration(musicDurationControler);
    setMusicCurrent(musicCurrentControler);
    setProgressMusic(musicProgressControler);
    setPlayButtonMusic(musicPlayButtonControler);

    categoryTitle?.classList.add("rotate-x-180");
    return () => {
      categoryTitle?.classList.remove("rotate-x-180");
    };
  }, [albumSelected.category]);

  return (
    <MusicContext.Provider
      value={{
        playButtonMusic,
        musicSelected,
        setMusicSelected,
        albumSelected,
        setAlbumSelected,
        progressMusic,
        titleCategories,
        musicDuration,
        musicCurrent,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;
