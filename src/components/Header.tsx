import { Link } from "react-router-dom"
import { useTheme } from "@/context/ThemeContext"

const Header = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <header className="sticky w-full top-0 left-0 z-[1100] border-b bg-white dark:bg-black border-transparent dark:border-zinc-800">
            <div className="max-w-7xl h-16 mx-auto px-4 flex items-center justify-between">
                <div>
                    <Link to="/">
                        {isDarkMode ? (
                            <img src="/dark-logo.svg" alt="logo avatar" />
                        ) : (
                            <img src="/light-logo.svg" alt="logo avatar" />
                        )}
                    </Link>
                </div>
                <div className="flex items-center gap-1">
                    <button 
                        onClick={toggleDarkMode}
                        className="px-2 py-2 hover:bg-[rgba(156,163,175,0.2)] dark:hover:bg-zinc-700 rounded-md transition-[background-color] hover:duration-300"
                    >
                        {isDarkMode ? (
                            <img src="/sun.svg" alt="sun icon"/>
                        ) : (
                            <img src="/moon.svg" alt="moon icon" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header