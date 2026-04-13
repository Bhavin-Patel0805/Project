import React from 'react'
import CS1 from "../assets/CS1.png";
import CS2 from "../assets/CS2.png";
import CS3 from "../assets/CS3.png";
import CS4 from "../assets/CS4.png";
import CS5 from "../assets/CS5.png";
const watches = [
    {
        id: 1,
        name: "Norqain Independence",
        price: 619000,
        imgUrl: CS1
    },
    {
        id: 2,
        name: "Zenith Chronomaster",
        price: 1069200,
        imgUrl: CS2
    },
    {
        id: 3,
        name: "Jacob & Co. Epic X ",
        price: 3100000,
        imgUrl: CS3
    },
    {
        id: 4,
        name: "Bvlgari Octo",
        price: 2450000,
        imgUrl: CS4
    },
    {
        id: 5,
        name: "Louis Erard Excellence",
        price: 3300000,
        imgUrl: CS5,
    },
];

// Use the format function from styles
const formatINR = (n) => `₹ ${n.toLocaleString("en-IN")}`;



const ComingSoonWatchPage = () => {
    return (
        <section className={"bg-white text-gray-900 py-12"}>
            <div className={"max-w-7xl mx-auto px-6 lg:px-12"}>
                <div className={"flex items-center justify-between mb-8"}>
                    <div>
                        <h2 className={"text-2xl md:text-3xl tracking-wide uppercase"} style={{ fontFamily: "'Playfair Display', serif" }}>New Arrivals</h2>
                        <p className={"text-sm text-gray-500 mt-1 uppercase tracking-wider"}>Coming Soon</p>
                    </div>
                    <a href='/watches' className={"text-sm text-gray-600 hover:text-gray-900 uppercase tracking-wide"}>View All ›</a>
                </div>

                {/* watches row */}
                <div className={"w-full overflow-x-auto"}>
                    <div className={"flex gap-8 items-start min-w-[1100px] lg:min-w-full justify-between"}>
                        {watches.map((w) => (
                            <figure key={w.id} className={"flex-1 max-w-xs flex flex-col items-center"}>
                                <div className={"w-full flex justify-center"}>
                                    <img
                                        src={w.imgUrl}
                                        alt={w.name}
                                        className={"object-contain h-56 md:h-64 lg:h-72 xl:h-80 transition-transform transform"}
                                        loading="lazy"
                                        onError={(e) => {
                                            // fallback: show a small transparent placeholder if URL is missing
                                            e.currentTarget.src =
                                                "data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22240%22></svg>";
                                        }}
                                    />
                                </div>

                                <figcaption className={"mt-6 text-center"}>
                                    <div className={"text-xs md:text-sm uppercase tracking-widest text-gray-700 font-semibold"}>{w.name}</div>
                                    <div className={"mt-3 text-sm text-gray-600"}>
                                        {formatINR(w.price)}
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ComingSoonWatchPage
