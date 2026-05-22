"use client";

import React, { useEffect, useState } from "react";
import { manaboardProjectData } from "@/data/manaboard-project-data";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import CubeFace from "@/components/CubeFace";
import StackListMarquee from "@/components/StackListMarquee";
import CubeFeatureSection from "./CubeFeatureSection";
import { MdOutlineAppRegistration } from "react-icons/md";

const faces = [
  "translate-z-12 rotate-x-0",
  "-translate-z-12",
  "translate-x-12 rotate-y-90",
  "-translate-x-12 -rotate-y-90",
  "-translate-y-12 rotate-x-90",
  "translate-y-12 -rotate-x-90",
];

const featureTitlesShort = [
  "Tasks",
  "Projects",
  "Views",
  "Search",
  "Layout",
  "Analytics",
];

const staticValues = [
  [360, 360],
  [360, 360],
  [360, 270],
  [360, 450],
  [270, 360],
  [450, 360],
];

export default function HeroSection() {
  // const topWidth = 80;
  const [revealKey, setRevealKey] = useState(215);
  const [textKey, setTextKey] = useState(230);
  const [isCubeFaceClicked, setIsCubeFaceClicked] = useState(false);
  const [staticMousePosition, setStaticMousePosition] = useState([0, 0]);
  const [switchFace, setSwitchFace] = useState(true);
  const [faceIndex, setFaceIndex] = useState(10);
  const [isAnimating, setIsAnimating] = useState(true);

  const currentFeature = manaboardProjectData[faceIndex];

  const wheelScale = useMotionValue(0.5);
  const mouseX = useMotionValue(45);
  const mouseY = useMotionValue(45);
  const wheelUncap = useMotionValue(0.5);

  const [innerWidth, setInnerWidth] = useState(
    typeof window !== "undefined" ? (window.innerWidth * 0.7) / 200 : 1,
  );
  const [innerHeight, setInnerHeight] = useState(
    typeof window !== "undefined" ? (window.innerHeight * 0.7) / 200 : 1,
  );

  useEffect(() => {}, []);

  const mouseXMotionCached = mouseX.get();
  const mouseYMotionCached = mouseY.get();

  useEffect(() => {
    const resize = () => {
      setInnerWidth((window.innerWidth * 0.7) / 200);
      setInnerHeight((window.innerHeight * 0.7) / 200);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (revealKey < 250 || textKey < 265) {
      const resetReveal = setTimeout(() => {
        setRevealKey((a) => a + 1);
        setTextKey((a) => a + 1);
      }, 4000);
      return () => clearTimeout(resetReveal);
    }
  }, [revealKey, textKey]);

  const template = useMotionTemplate`${wheelUncap}% 20%`;

  return (
    <>
      <section className="h-screen relative flex justify-center items-center">
        <section
          // style={{ width: `${topWidth}%` }}
          className={`overflow-hidden whitespace-nowrap min-h-0 mt-8 sm:w-[80%] `}
        >
          <div
            className="h-full min-h-0 py-3 border-1
           outline-standard w-full flex gradient-for-thin-containers relative  !z-100 justify-center flex-col items-center"
          >
            <div className=" border-b-1 min-h-0 !border-dotted border-neutral-800  w-full flex items-center content-center align-middle justify-center ">
              <motion.div
                animate={{
                  opacity: [0.5, 1],
                  filter: ["blur(4px)", "blur(0)"],
                  transition: {
                    duration: 1,
                  },
                }}
                className="flex justify-center items-center "
              >
                {/* <img
                  src="/logo/2.svg"
                  className="w-7 h-7 mx-1 mr-2 "
                  alt="Manaboard logo"
                ></img> */}
                <MdOutlineAppRegistration className="w-5 h-5 mr-2" />
                <motion.h3 className="absolute invisible sm:visible sm:relative text-lg  w-full text-center">
                  Explore our demo by clicking on a feature view below
                </motion.h3>
                <motion.h3 className=" sm:hidden  text-lg  w-full text-center">
                  Manaboard
                </motion.h3>
              </motion.div>
            </div>

            <div className="relative overflow-hidden ">
              <motion.div
                key={textKey}
                animate={{
                  x: 600,
                  boxShadow: ["0px 0px 400px 5px red", "0px 0px 0px 0px red"],
                  transition: { duration: 3 },
                }}
                className=" border-l-3  border-red-400  opacity-90 text-reveal-extra z-100 h-full -top-1 -right-0 absolute w-full "
              ></motion.div>

              <p className="invisible sm:visible sm:relative absolute tracking-normal   text-neutral-500 z-11 ">
                A real-time system for managing projects, tasks, and
                collaborative workflows.
              </p>
            </div>
          </div>

          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-full inline-flex relative -z-10 "
          ></motion.div>
          <motion.div
            style={{
              backgroundPosition: template,
            }}
            className={`radial-background  w-full h-[70vh] flex-col min-h-0  -mt-5 outline-standard flex justify-center items-center relative`}
            onMouseMove={(e) => {
              mouseY.set(e.clientY);
              mouseX.set(e.clientX);
            }}
            onMouseEnter={() => {
              setIsAnimating(false);
              setFaceIndex(isCubeFaceClicked ? faceIndex : 10);
            }}
            onMouseLeave={() => {
              setIsAnimating(true);
              setTimeout(() => {
                setIsCubeFaceClicked(false);
                setFaceIndex(10);
              }, 0);
            }}
          >
            {isCubeFaceClicked && (
              <>
                <motion.div
                  animate={{
                    borderColor: ["#FFFFFF", "#404040", "#40404019"],
                    opacity: [0, 1],
                    scale: [0, 1],
                    scaleX: [1, innerWidth],
                    scaleY: [1, innerHeight],
                    transition: {
                      scaleX: { delay: 0.8, duration: 0.3 },
                      scaleY: { delay: 1.2, duration: 0.3 },
                      scale: { delay: 0.3, duration: 0.5 },
                      opacity: { delay: 0.5, duration: 0.5 },
                      borderColor: { delay: 0.8, duration: 0.8 },
                    },
                  }}
                  className={`size-40 bg-black border-1 px-20 border-white z-100 absolute ${
                    isCubeFaceClicked ? "opacity-0" : "opacity-1"
                  }`}
                ></motion.div>
                <CubeFeatureSection
                  className={`absolute z-10000 px-2 py-2 border-1 bg-black h-[80.5%] min-h-0 w-[71.5%]  ${
                    isCubeFaceClicked ? "opacity-0" : "opacity-1"
                  } `}
                  title={currentFeature.title}
                  content={currentFeature.content}
                  details={currentFeature.details}
                  src={currentFeature.src}
                  src2={currentFeature.src2}
                  alt={currentFeature.alt}
                  innerWidth={innerWidth}
                />
              </>
            )}

            <motion.div
              animate={
                isCubeFaceClicked
                  ? {
                      rotateX: [mouseXMotionCached, staticMousePosition[0]],
                      rotateY: [mouseYMotionCached, staticMousePosition[1]],
                      transition: {
                        rotateX: { duration: 0.6 },
                        rotateY: { duration: 0.6 },
                      },
                    }
                  : undefined
              }
              onWheel={() => {}}
              style={{
                rotateX: isCubeFaceClicked ? staticMousePosition[0] : mouseX,
                rotateY: isCubeFaceClicked ? staticMousePosition[1] : mouseY,
                scale: wheelScale,
              }}
              className={`relative scale-200 ${
                isCubeFaceClicked ? "cube-face-parent" : ""
              } ${
                isAnimating ? "init-animation" : "scale-400"
              }   size-20 transform-3d rotate-x-45 rotate-y-45 `}
            >
              {faces.map((item, index) => (
                <CubeFace
                  setSwitchFace={setSwitchFace}
                  switchFace={switchFace}
                  faceIndex={faceIndex}
                  index={index}
                  mouseY={mouseY}
                  mouseX={mouseX}
                  isCubeFaceClicked={isCubeFaceClicked}
                  key={item}
                  translateRotate={item}
                  className="absolute inset-0 border-2"
                ></CubeFace>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className={`left-0 flex flex-row w-full gradient-for-thin-containers justify-center`}
          >
            {staticValues.map((item, index) => (
              <button
                onClick={() => {
                  setFaceIndex(index);
                  setIsCubeFaceClicked(false);
                  setIsAnimating(false);
                  setStaticMousePosition([item[0], item[1]]);

                  setTimeout(() => setIsCubeFaceClicked(true), 0);
                }}
                onMouseEnter={() => {
                  setFaceIndex(index);
                }}
                key={index}
                className={`face-1 cursor-pointer hover:pr-10 px-2 global-button-gradient 
                  transition-all w-1/6 duration-100 py-1 border-b-1 outline-standard border-l-1 ${
                    faceIndex === index &&
                    isCubeFaceClicked &&
                    "global-button-gradient-active pr-10 px-2 "
                  } ${index === 5 && "border-r-1"}`}
              >
                <span className="invisible absolute sm:visible sm:relative ">{`${featureTitlesShort[index]}`}</span>
                <span className="sm:hidden ">{`${index + 1}`}</span>
              </button>
            ))}
          </motion.div>
          <div>
            <StackListMarquee />
          </div>
        </section>
      </section>
    </>
  );
}
