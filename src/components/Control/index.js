"use client";
import { useContext } from "react";
import { MusicContext } from "@/context/MusicContext";

export default function Control({ category }) {
  const musicContext = useContext(MusicContext);
  const { name, cover, artist } = musicContext.albumSelected;

  return (
    <div className="w-full backface-invisible rotate-x-180-controller flex flex-col overflow-hidden absolute top-1/2 left-0 bg-black/70 h-20 z-10 rounded-xl">
      <div onClick={musicContext.progressBarHandler} className="w-full h-2 bg-green-500/50 relative">
        <span
          data-progress-category={category}
          className="inline-block w-0 h-2 bg-green-500 rounded-full absolute top-0 left-0"
        ></span>
      </div>
      <div className="flex-1 flex justify-center md:justify-between w-full px-2">
        <div className="hidden md:flex items-center gap-2 text-white">
          <img src={cover} alt="Cover" className="w-14 h-14 rounded object-cover" />
          <div>
            <p className="line-clamp-1 font-Temp text-xl lg:text-3xl leading-tight">{name}</p>
            <p className="text-sm opacity-50">{artist}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 text-white opacity-80">
            <p data-current-category={category}>00:00</p>/<p data-duration-category={category}>00:00</p>
          </div>
          <label
            onClick={musicContext.playMusicHandler}
            htmlFor={`play-music-controller-${category}`}
            className="flex justify-center items-center bg-green-500 hover:bg-green-600 transition-colors cursor-pointer w-10 h-10 lg:w-14 lg:h-14 rounded-full"
          >
            <input
              type="checkbox"
              name="play-music-controller"
              id={`play-music-controller-${category}`}
              className="peer"
              hidden
            />
            <svg viewBox="0 0 24 24" fill="none" className="group w-4 h-4 lg:w-6 lg:h-6 fill-white">
              <path
                className="peer-checked:group-[]:hidden inline-block"
                d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
              ></path>
              <g className="peer-checked:group-[]:inline-block hidden">
                <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"></path>
                <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"></path>
              </g>
            </svg>
          </label>

          <a href={musicContext.musicSelected} download>
            <svg className="cursor-pointer" width="30" height="30" viewBox="0 0 40 40" fill="none">
              <path
                d="M25 37.9167H15C5.95 37.9167 2.08334 34.05 2.08334 25V15C2.08334 5.95001 5.95 2.08334 15 2.08334H25C34.05 2.08334 37.9167 5.95001 37.9167 15V25C37.9167 34.05 34.05 37.9167 25 37.9167ZM15 4.58334C7.31667 4.58334 4.58334 7.31668 4.58334 15V25C4.58334 32.6833 7.31667 35.4167 15 35.4167H25C32.6833 35.4167 35.4167 32.6833 35.4167 25V15C35.4167 7.31668 32.6833 4.58334 25 4.58334H15Z"
                fill="white"
              />
              <path
                d="M19.9999 25.4334C19.6832 25.4334 19.3666 25.3167 19.1166 25.0667L14.1166 20.0667C13.6332 19.5834 13.6332 18.7834 14.1166 18.3C14.5999 17.8167 15.3999 17.8167 15.8832 18.3L19.9999 22.4167L24.1166 18.3C24.5999 17.8167 25.3999 17.8167 25.8832 18.3C26.3666 18.7834 26.3666 19.5834 25.8832 20.0667L20.8832 25.0667C20.6332 25.3167 20.3166 25.4334 19.9999 25.4334Z"
                fill="white"
              />
              <path
                d="M20 25.4333C19.3167 25.4333 18.75 24.8667 18.75 24.1833V10.85C18.75 10.1667 19.3167 9.60001 20 9.60001C20.6833 9.60001 21.25 10.1667 21.25 10.85V24.1833C21.25 24.8833 20.6833 25.4333 20 25.4333Z"
                fill="white"
              />
              <path
                d="M19.9999 30.3834C16.4832 30.3834 12.9499 29.8167 9.59991 28.7001C8.94991 28.4834 8.59991 27.7667 8.81658 27.1167C9.03324 26.4667 9.73324 26.1001 10.3999 26.3334C16.5999 28.4001 23.4166 28.4001 29.6166 26.3334C30.2666 26.1167 30.9832 26.4667 31.1999 27.1167C31.4166 27.7667 31.0666 28.4834 30.4166 28.7001C27.0499 29.8334 23.5166 30.3834 19.9999 30.3834Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
