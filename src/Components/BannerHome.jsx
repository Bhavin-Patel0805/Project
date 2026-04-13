import React, { useEffect, useRef } from 'react'
import Navbar from './Navbar';
import video from '../assets/bannervideo.mp4';
import BL1 from '../assets/Classic Heritage.png'
import BM1 from '../assets/Limited Edition.png'
import BR1 from '../assets/Morden Precision.png'

const BannerHome = () => {

  const videoRef = useRef(null);

  useEffect(() => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefer-reduce-motion: reduce)").matches;

    if (reduceMotion && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("autoplay");
    }
  }, []);

  return (
    <div className="relative overflow-x-hidden min-h-[90vh] flex flex-col">
      <div className="absolute top-0 pt-10 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* bg video */}

      <div className="absolute inset-0 z-0">
        <video ref={videoRef}
          className={ "absolute inset-0 w-full h-full object-cover pointer-events-none"}
          autoPlay
          muted
          loop
          playsInline
          preload='metadata'
          poster='/fallback.jpg'
          role='presentation'
        >
          <source src={video} type='video/mp4' />
        </video>
      </div>

      {/* containt */}
      <div className="container mx-auto px-4 py-24 z-10 pt-40 relative flex flex-col items-center text-center">
        <div className="mb-12 md:mb-16">
          <h1 style={{fontFamily: "'Playfair Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light mb-4 md:mb-6 leading-tight">

            <span className="inline text-gray-100">Love You More</span>
            <span className="text-yellow-500 font-[pacifico] inline-block ml-2 sm:ml-4">With each tick-tock</span>
          </h1>

          <p className="text-white font-[pacifico] max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light">
            Discover our exclusive collection of handcrafted timepieces that
            embody precision, luxury, and timeless style
          </p>
        </div>

        {/* card section */}

        <div className="relative w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6 md:gap-8 items-end">
            {/* 1 card  left*/}
            <div className={`${"flex flex-col items-center"} ${"transform rotate-0 sm:-rotate-12 md:-rotate-2 lg:-rotate-2 xl:-rotate-6 transition-all duration-500 xl:hover:rotate-0 xl:hover:scale-110"}`}>
              <div className={`${"bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-2xl border border-gray-800 w-full"} ${"p-4 md:p-2 lg:p-2 sm:p-4"}`}>
                <img
                  src={BL1}
                  alt="Left Logo"
                  className={`${"w-full object-cover rounded-lg"}
                              ${"h-44 sm:h-56 md:h-64 lg:h-64"}`}
                  loading='lazy'
                />
              </div>
              <p className={`${"mt-3 font-light text-sm sm:text-base"} ${"text-gray-300"}`}>
                Classic Heritage
              </p>
            </div>

            {/* 2 card  middel*/}
            <div className={`${"flex flex-col items-center"} ${"transform translate-y-0 sm:-translate-y-8 md:-translate-y-16 transition-all duration-500 pt-3 hover:translate-y-0 hover:scale-110"}`}>
              <div className={`${"bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-2xl border border-yellow-600/30 w-full"} ${"p-4 md:p-2 lg:p-2 sm:p-4"}`}>
                <img
                  src={BM1}
                  alt="Middel Logo"
                  className={`${"w-full object-cover rounded-lg"}
                              ${"h-52 sm:h-64 md:h-72 lg:h-72"}`}
                  loading='lazy'
                />
              </div>
              <p className={`${"mt-3 font-light text-sm sm:text-base"} ${"text-yellow-500"}`}>
                Limited Edition
              </p>
            </div>

            {/* 3 card right*/}
            <div className={`${"mt-3 font-light text-sm sm:text-base"} ${"transform rotate-0 sm:rotate-12 md:rotate-1 xl:rotate-6 transition-all duration-500 xl:hover:rotate-0 xl:hover:scale-110 lg:rotate-2"}`}>
              <div className={`${"bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-2xl border border-gray-800 w-full"} ${"p-4 md:p-2 lg:p-2 sm:p-4"}`}>
                <img
                  src={BR1}
                  alt="Right Logo"
                  className={`${"w-full object-cover rounded-lg"}
                              ${"h-44 sm:h-56 md:h-64 lg:h-64"}`}
                  loading='lazy'
                />
              </div>
              <p className={`${"mt-3 font-light text-sm sm:text-base"} ${"text-gray-300"}`}>
                Morden Precision
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BannerHome;
