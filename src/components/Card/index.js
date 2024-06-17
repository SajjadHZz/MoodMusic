"use client";
import { useRef, useContext } from "react";
import { MusicContext } from "@/context/MusicContext";

export default function Card({ name, artist, cover, musics, category }) {
  const musicContext = useContext(MusicContext);

  const cardMain = useRef(null);
  const cardInfos = useRef(null);
  const cardList = useRef(null);

  let mouseLeave = null;

  function musicPlayHandler(src) {
    musicContext.setAlbumSelected({ name, cover, artist, category });
    musicContext.setMusicSelected(src);
  }

  function mouseEnterHandler() {
    clearTimeout(mouseLeave);
  }
  function mouseLeaveHandler() {
    mouseLeave = setTimeout(() => {
      cardMain.current.classList.remove("rotate-y-180");
      cardInfos.current.classList.remove("rotate-y-180");
      cardList.current.classList.replace("rotate-card-y-0", "rotate-y-180");
    }, 500);
  }
  function clickRotateCard() {
    cardMain.current.classList.add("rotate-y-180");
    cardInfos.current.classList.add("rotate-y-180");
    cardList.current.classList.add("rotate-card-y-0");
    cardList.current.classList.remove("rotate-y-180");
  }

  return musics.length === 1 ? (
    <div className="group max-w-[120px] md:max-w-[150px] lg:max-w-[200px] w-fit h-fit transition-all duration-700 delay-75 rotate-prevs-y-10 -mr-14 lg:-mr-28 hover:mr-0 hover:transform-none">
      <div
        ref={cardMain}
        className="shadow rounded-xl transform-3d relative overflow-hidden w-fit transition-transform duration-1000"
      >
        <img
          className="w-full h-full absolute top-0 left-0 -z-10 brightness-50 scale-110 blur object-cover object-center"
          src={cover}
        />
        <div ref={cardInfos} className="backface-invisible transition-transform duration-1000 p-2">
          <div className="relative">
            <img
              className="w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 object-cover object-center rounded mb-2"
              src={cover}
            />
            <div className="absolute top-0 left-0 group-hover:opacity-100 opacity-0 transition-opacity duration-300 w-full h-full flex justify-center items-center bg-black/50 rounded">
              <span
                onClick={() => musicPlayHandler(musics[0])}
                className="flex justify-center items-center bg-green-500 cursor-pointer w-10 h-10 lg:w-16 lg:h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              >
                <svg viewBox="0 0 6 7" className="w-4 h-4 lg:w-6 lg:h-6">
                  <g stroke="none" fill="none">
                    <g transform="translate(-347.000000, -3766.000000)" fill="#fff">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M296.494737,3608.57322 L292.500752,3606.14219 C291.83208,3605.73542 291,3606.25002 291,3607.06891 L291,3611.93095 C291,3612.7509 291.83208,3613.26444 292.500752,3612.85767 L296.494737,3610.42771 C297.168421,3610.01774 297.168421,3608.98319 296.494737,3608.57322"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <p className="line-clamp-1 font-Temp tracking-wide text-xl lg:text-3xl mb-1 text-white select-none">
            {name}
          </p>
          <p className=" line-clamp-1 text-xs lg:text-sm text-gray-400 select-none mb-1">{artist}</p>
        </div>
      </div>
    </div>
  ) : (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className="group max-w-[120px] md:max-w-[150px] lg:max-w-[200px] w-fit h-fit transition-all duration-700 delay-75 rotate-prevs-y-10 -mr-14 lg:-mr-28 hover:mr-0 hover:transform-none"
    >
      <div
        ref={cardMain}
        className="shadow rounded-xl transform-3d relative overflow-hidden w-fit transition-transform duration-1000"
      >
        <img
          className="w-full h-full absolute top-0 left-0 -z-10 brightness-50 scale-110 blur object-cover object-center"
          src={cover}
        />
        <div ref={cardInfos} className="backface-invisible transition-transform duration-1000 p-2">
          <div className="relative">
            <img
              className="w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 object-cover object-center rounded mb-2"
              src={cover}
            />
            <div className="absolute top-0 left-0 group-hover:opacity-100 opacity-0 transition-opacity duration-300 w-full h-full flex justify-center items-center bg-black/50 rounded">
              <span
                onClick={clickRotateCard}
                className="flex justify-center items-center bg-green-500 cursor-pointer w-10 h-10 lg:w-16 lg:h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              >
                <svg viewBox="0 0 6 7" className="w-4 h-4 lg:w-6 lg:h-6">
                  <g stroke="none" fill="none">
                    <g transform="translate(-347.000000, -3766.000000)" fill="#fff">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M296.494737,3608.57322 L292.500752,3606.14219 C291.83208,3605.73542 291,3606.25002 291,3607.06891 L291,3611.93095 C291,3612.7509 291.83208,3613.26444 292.500752,3612.85767 L296.494737,3610.42771 C297.168421,3610.01774 297.168421,3608.98319 296.494737,3608.57322"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <p className="line-clamp-1 font-Temp tracking-wide text-xl lg:text-3xl mb-1 text-white select-none">
            {name}
          </p>
          <p className=" line-clamp-1 text-xs lg:text-sm text-gray-400 select-none mb-1">{artist}</p>
        </div>
        <ul
          ref={cardList}
          className="backface-invisible absolute top-0 w-full h-full overflow-auto p-2 transition-transform duration-1000 rotate-y-180 divide-y divide-solid divide-white text-white"
        >
          {musics.map((item) => {
            return (
              <li
                key={item}
                onClick={() => musicPlayHandler(item)}
                className="line-clamp-1 !leading-8 text-[10px] lg:text-sm cursor-pointer px-2 hover:bg-black/70 transition-colors duration-300 before:w-2 before:h-2 lg:before:w-3 lg:before:h-3 before:inline-block before:bg-white before:play-clip-path before:mr-1 lg:before:mr-3"
              >
                {
                  decodeURIComponent(item)
                    .split("https://moodmusic.storage.iran.liara.space/Musics/")[1]
                    .split(".mp3")[0]
                }
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
