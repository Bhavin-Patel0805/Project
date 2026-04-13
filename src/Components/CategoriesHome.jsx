import React, { useState } from 'react'
import '../style/CategoriesHome.css'
import brands from '../assets/CategoriesHomeData'
import { Link } from 'react-router-dom'


const CategoriesHome = () => {
    const [hovereBrand, setHovereBrand] = useState(null);
    return (
        <section className={"min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4"}>
            <div className={"max-w-7xl mx-auto"}>
                <header className={"text-center mb-12"} style={{ fontFamily: "'Playfair Display', serif" }}>
                    <h1 className={"font-light text-gray-900 mb-4 leading-tight"} style={{ fontSize: "clamp(1.6rem, 3.8vw, 2.75rem)" }}>
                        <span className={"inline"}>
                            Premium Watch
                        </span>
                        <span className={"text-amber-600 ml-3 font-medium"}>Brands</span>
                    </h1>
                    <div className={"w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6 rounded-full"}></div>

                    <p className={"text-gray-600 max-w-2xl mx-auto text-base md:text-lg"}>
                        Discover the world's most prestigious watchmarkers - curated picks for every style.
                    </p>
                </header>

                {/* GRID */}
                <div className={"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8"} style={{ fontFamily: "'Playfair Display', serif" }}>
                    {brands.map((brand) => (
                        <Link
                            key={brand.id}
                            to={brand.link}
                            className={"group block focus:outline-none"}
                            onMouseEnter={() => setHovereBrand(brand.id)}
                            onMouseLeave={() => setHovereBrand(null)}
                        >
                            <div className={"relative overflow-hidden rounded-xl border transition-shadow duration-300 bg-white shadow-sm hover:shadow-lg focus:shadow-lg border-gray-200"}>
                                <div className={"w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden"}>
                                    <img
                                        src={brand.image}
                                        alt={brand.name}
                                        loading='lazy'
                                        className={"w-full h-full object-cover transform transition-transform duration-500"}
                                    />
                                </div>
                                <div className={"p-3 md:p-4 text-center"}>
                                    <h3
                                        className={`${"text-sm md:text-base font-medium truncate transition-colors duration-300"} ${hovereBrand === brand.id
                                                ? "text-amber-600"
                                                : "text-gray-800"
                                            }`}>
                                        {brand.name}
                                    </h3>

                                    {brand.tagline ? (
                                        <p className={"text-xs text-gray-500 mt-1 hidden md:block"}>
                                            {brand.tagline}
                                        </p>
                                    ) : null}
                                </div>

                                <span className={"absolute inset-0 pointer-events-none ring-0 focus:ring-4 focus:ring-amber-200"} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
        </section>
    )
}

export default CategoriesHome
