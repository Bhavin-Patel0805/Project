import React, { useEffect, useState } from 'react'
import { BaggageClaim, Clock, Menu, User, X } from 'lucide-react';
import { href, Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const navItems = [
    { name: "Home", href: "/" },
    { name: "Watches", href: "/watches" },
    { name: "Contact", href: "/contact" },
];

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState(location.pathname || "/")

    const { totalItem } = useCart();
    const [loggIn, setLoggIn] = useState(() => {
        try {
            return (
                localStorage.getItem("isLoggedIn") === "true" ||
                !!localStorage.getItem("authToken")
            );
        } catch {
            return false;
        }
    });

    useEffect(() => {
        setActive(location.pathname || "/");
    }, [location]);

    //to the user logged-in for all the page

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "isLoggedIn" || e.key === "authToken") {
                try {
                    const isNowLoggedIn =
                        localStorage.getItem("isLoggedIn") === "true" ||
                        !!localStorage.getItem("authToken");
                    setLoggIn(isNowLoggedIn);
                } catch {
                    setLoggIn(false);
                }
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const handleNavClick = (href) => {
        setActive(href);
        setOpen(false);
    }

    //To logout

    const handleLogout = () => {
        try {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("authToken");
        } catch (e) {}
            setLoggIn(false);
            setOpen(false);
            navigate("/");
        
    }
    return (
        <header className={"sticky top-4 z-50 pb-5 flex justify-center overflow-x-hidden"}>
            <nav className={"bg-white shadow-lg rounded-lg xl:rounded-full sm:rounded-xl lg:rounded-full md:rounded-full px-4 sm:px-3 md:px-5 py-3 w-[95%] md:w-[90%] max-w-5xl overflow-visible"}>
                <div className={"flex items-center justify-between"}>
                    {/* BRAND LOGO */}
                    <div className={"flex items-center"}>
                        <div className={"flex items-center justify-center rounded-full bg-gray-100 p-2 mr-3"}>
                            <Clock className={"h-6 w-6 text-gray-800"} />
                        </div>
                        <Link to='/' onClick={() => handleNavClick("/")}
                            className={"flex items-baseline gap-2 select-none"}>
                            <span style={{fontFamily: "'Playfair Display', serif",color: "#0a0a0a"}} className={"text-lg sm:text-2xl md:text-2xl font-light tracking-wide"}>
                                SoulChrono
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigations */}
                    <div className={"hidden md:flex items-center space-x-2"}>
                        {
                            navItems.map((item) => {
                                const isActive = active === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => handleNavClick(item.href)}
                                        className={`${"relative flex items-center gap-1 px-4 py-2 text-sm transition-colors duration-200"} 
                                        ${isActive ? "text-gray-900 font-semibold"
                                                : "text-gray-700 hover:text-gray-900"}`}>
                                        <span>{item.name}</span>
                                        <span
                                            className={`${"absolute left-0 -bottom-1 w-full h-0.5 rounded-full transition-opacity duration-200"} ${isActive
                                                ? "opacity-100 bg-gradient-to-r from-gray-600 to-gray-400"
                                                : "opacity-0"
                                                }`}>
                                        </span>
                                    </Link>
                                );
                            })}
                    </div>

                    {/* Right Side */}
                    <div className={"flex items-center gap-6"}>
                        <Link to='/cart' className={"text-gray-500 hover:text-gray-700 transition-colors relative"}>
                            <BaggageClaim className={"h-5 w-5"} />
                            {totalItem > 0 && (
                                <span className={"absolute top-0 right-0 -translate-x-1/2 sm:-top-4 sm:-right-4 sm:translate-x-0 inline-flex items-center justify-center px-1.5 py-1 text-xs rounded-full bg-gray-500 text-white font-medium"} >{totalItem}</span>
                            )}
                        </Link>

                        {!loggIn ? (
                            <Link to='/login' className={"hidden md:flex items-center cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"}>
                                <User className={"h-5 w-5 mr-1"} />
                                <span className={"text-sm"}>Account</span>
                            </Link>
                        ) : (
                            <button onClick={handleLogout}
                                className={"text-sm"}>
                                <User className={"h-5 w-5 mr-1"} />
                                <span className={"text-sm"}>Logout</span>
                            </button>
                        )}

                        {/* mobile toggle */}

                        <div className={"md:hidden"}>
                            <button onClick={() => setOpen(!open)}
                                className={"text-gray-500 hover:text-gray-700"}>
                                {open ? (
                                    <X className={"h-6 w-6"} />
                                ) : (
                                    <Menu className={"h-6 w-6"} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* mobile navigation */}
                {open && (
                    <div className={"md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"}>
                        <div className={"flex flex-col space-y-2"}>
                            {navItems.map((item) => {
                                const isActive = active === item.href;
                                return (
                                    <Link key={item.name}
                                        to={item.href}
                                        onClick={() => handleNavClick(item.href)}
                                        className={`${"flex xl:items-center justify-center lg:items-center md:items-center px-4 py-2 text-sm rounded-lg transition-colors"} ${isActive ? "bg-gray-200 text-gray-900 font-semibold"
                                            : "text-gray-700 hover:bg-gray-50"
                                            }`}>
                                        <span className={"font-medium"}>
                                            {item.name}
                                        </span>
                                    </Link>
                                )
                            })}

                            <div className={"px-4 pt-2"}>
                                {
                                    !loggIn ? (
                                        <Link to='/login' onClick={() => {
                                            setOpen(false);
                                            handleNavClick('/login')
                                        }} className={"flex xl:items-center justify-center lg:items-center md:items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"}>
                                            <User className={"h-4 w-4"} />
                                            <span>Account</span>
                                        </Link>
                                    ) : (
                                        <button onClick={handleLogout} className={"w-full flex xl:items-center justify-center lg:items-center md:items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"}>
                                            <User className={"h-4 w-4"} />
                                            <span>Logout</span>
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header >
    )
}

export default Navbar
