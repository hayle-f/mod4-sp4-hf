import NavbarMenu from "./NavbarMenu"
import { useThemeContext } from "../../context/ThemeContext";
import { useCartContext } from "../../context/CartContext";


const Navbar = () => {

    //Contexto tema (light/dark)
    const { theme, toggleTheme } = useThemeContext();

    // Contexto Cart
    const { cart } = useCartContext();

    //enlaces menu user
    const linksUser = [
        { name: "Perfil", href: "#" },
        { name: "Favoritos", href: "#" },
        { name: "Carrito", href: "#" },
        
    ];

    return (
        <nav className="flex justify-between items-center p-[5px_20px] [box-shadow:0px_2px_15px_#0000001e] w-full bg-[#f0f0f0b6] dark:bg-[#212121] dark:[box-shadow:0px_2px_15px_#e6e6e6] xl:py-2 xl:px-[42px]">

            <img 
                src="imgs/aurislogo.png" 
                alt="Logo" 
                id="logo" 
                className="bg-[#000000c7] dark:bg-[#eeeeee] h-auto w-[40px] my-1 rounded-full [box-shadow:2px_2px_8px_#00000071] transition-transform duration-600 hover:[transform:rotateY(180deg)]"
            />

            {/* Componente NavbarMenu (desktop + mobile) */}
            <NavbarMenu />

            <div>
                <i
                className="bi bi-person-circle text-xl cursor-pointer text-[#333333] dark:text-gray-200 mr-4 transition-all duration-300 ease-linear hover:text-black dark:hover:text-white"
                >
                </i>

                <i
                className={`${theme === 'light' ? 'bi bi-moon text-[#333333]' : 'bi bi-sun text-yellow-500'} cursor-pointer `}
                onClick={toggleTheme}
                >
                </i>
            </div>

        </nav>
    )
    }
    
export default Navbar