"use client";

import Sphere from "@/components/Sphere";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Card from "@/components/Card";
import Control from "@/components/Control";

export default function Home() {
  const mainRef = useRef();
  const categoriesContainer = useRef();

  const moods = ["HAPPY", "SAD", "EPIC"];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const pin = gsap.fromTo(
      categoriesContainer.current,
      { translateX: 0 },
      {
        translateX: `-${moods.length - 1}00vw`,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          snap: 1 / (moods.length - 1),
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <main ref={mainRef} className="relative select-none">
      <Sphere />
      {/* CARDS CATEGORIES */}
      <div ref={categoriesContainer} className="flex absolute bottom-0 w-fit h-fit pb-10">
        {moods.map((category) => {
          return <PageContainer key={category} category={category} />;
        })}
      </div>
    </main>
  );
}

function PageContainer({ category }) {
  const [isLoading, setIsLoading] = useState(true);

  const [musics, setMusics] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/albums?mood=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setMusics(data);
        setIsLoading(false);
      });
  }, []);

  const cardsContainer = useRef(null);
  let mouseDown = false,
    startPos = 0,
    prevTranslate = 0,
    mouseMove = 0,
    containerEnd = 0;

  function mouseDownHandler(e) {
    containerEnd =
      cardsContainer.current.parentElement.offsetWidth - cardsContainer.current.offsetWidth - 150;
    startPos = getPositionX(e);
    mouseDown = true;
  }
  function mouseMoveHandler(e) {
    if (mouseDown) {
      const currentPosition = getPositionX(e);
      mouseMove = prevTranslate + currentPosition - startPos;
      if (mouseMove <= 30 && mouseMove >= containerEnd) {
        cardsContainer.current.style.transform = `translateX(${mouseMove}px)`;
      } else {
        if (mouseMove > 30) {
          mouseMove = 0;
        } else {
          mouseMove = containerEnd;
        }
      }
    }
  }
  function mouseUpHandler() {
    prevTranslate = mouseMove;
    mouseDown = false;
  }

  function getPositionX(e) {
    return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  }

  return (
    <div className="w-screen min-w-[100vw] relative flex flex-col sm:gap-10 overflow-hidden px-4">
      <div
        id={`controler_of_${category}`}
        className="w-fit transform-3d relative mx-auto transition-transform duration-1000"
      >
        <h2 className="w-fit uppercase backface-invisible drop-shadow-xl text-center text-white text-8xl lg:text-9xl font-Temp max-w-[300px] sm:max-w-none">
          {`${category} MUSICS`}
        </h2>
        {/* CONTROL MUSIC */}
        <Control category={category} />
      </div>

      <div
        ref={cardsContainer}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
        onTouchStart={mouseDownHandler}
        onTouchMove={mouseMoveHandler}
        onTouchEnd={mouseUpHandler}
        className="flex py-8 w-max transition-transform duration-500"
      >
        {isLoading
          ? Array.from(Array(20).keys()).map((item) => {
              return (
                <div
                  key={item}
                  className="bg-black/80 p-2 rounded-xl rotate-prevs-y-10 w-fit h-fit transition-all duration-700 delay-75 -mr-14 lg:-mr-28 hover:mr-0 hover:transform-none"
                >
                  <div className="w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded mb-2 bg-green-500/80 animate-pulse"></div>
                  <div className="w-full h-4 bg-white/20 rounded animate-pulse mt-4"></div>
                  <div className="w-1/3 h-2 bg-white/20 rounded-sm animate-pulse my-2"></div>
                </div>
              );
            })
          : musics.map((item) => {
              return (
                <Card
                  key={item._id}
                  name={item.name}
                  artist={item.artist}
                  cover={item.cover}
                  musics={item.musics}
                  category={category}
                />
              );
            })}
      </div>
    </div>
  );
}
