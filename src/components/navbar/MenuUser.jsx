import { AnimatePresence } from "framer-motion";
import { useThemeContext } from "../../context/ThemeContext";
import { link } from "react-router-dom";

const MenuUser = () => {

    const linksUser = [
        { name: "Perfil", to: "/perfil" },
        { name: "Favoritos", to: "#" },
        { name: "Carrito", to: "#" },
        { name: "", to: "#" },
    ]

    //Contexto tema (light/dark)
    const { theme, toggleTheme } = useThemeContext();

    return (
        <AnimatePresence>
        {isOpenUserMenu && (
            <motion.ul
                className="flex flex-col gap-2 absolute top-[30px] left-1/2 -translate-x-1/2 mt-2 bg-[#f8f8f8ef] dark:bg-[#2c2c2c] py-[10px] px-[30px] rounded-lg [box-shadow:0px_2px_15px_#0000001e] sm:hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {/* Mapear el array de links y crear un li>a por cada una */}
                {linksUser.map((link) => (
                <li key={link.name}>
                    <Link
                    to={link.to}
                    className="text-[#333333] dark:text-[#e6e6e6] no-underline transition-all duration-300 ease-linear cursor-pointer hover:underline hover:[text-shadow:_2px_2px_6px_#00000071,_-2px_-2px_6px_#0000004d]"
                    >
                    {link.name}
                    </Link>
                </li>
                ))}


                <i
                className={`${
                    theme === 'light' 
                    ? 'bi bi-moon text-[#333333]' 
                    : 'bi bi-sun text-yellow-500'} 
                    cursor-pointer `}
                onClick={toggleTheme}
                >
                </i>

            </motion.ul>
            )}
        </AnimatePresence>
    )
}

export default MenuUser