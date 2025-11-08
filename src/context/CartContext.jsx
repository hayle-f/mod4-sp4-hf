import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";

// 1) Crear el contexto
const CartContext = createContext();

// 2) Crear el proveedor
export const CartProvider = ({ children }) => {
    
    const [cart, setCart] = useState(() => {
        // Estado que guarda la lista de productos en el carrito
        // Inicializa desde localStorage si ya hay algo guardado, sino empieza como array vacío
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsed = JSON.parse(storedCart);
            // Convertimos precio y cantidad a número por seguridad
            return parsed.map(item => ({
                ...item,
                precio: Number(item.precio),
                cantidad: Number(item.cantidad),
                stock: Number(item.stock),
            }));
        }
        return [];
    });
    
    
    // Agregar producto al carrito si no existe ya
    const addToCart = (item, cantidad = 1) => {
        const exists = cart.find(cartItem => cartItem.id === item.id);

        if (!exists) {
            if(cantidad <= item.stock) {
                setCart(prevCart => [...prevCart, { ...item, cantidad: Number(cantidad), precio: Number(item.precio), stock: Number(item.stock) }]);
                toast("Agregado al Carrito")
            } else {
                toast.error("No hay Stock suficiente")
            }
        }
    }

    // Función para actualizar la cantidad de un item en el cart
    const updateQuantity = (item, cantidad) => {
        setCart(prevCart =>
            prevCart.map(cartItem => {         // recorro cada item del carrito
            if (cartItem.id === item.id) {   // si es el item que quiero cambiar
                if (cantidad <= cartItem.stock) {  // comparo con el stock real
                return { ...cartItem, cantidad }  // actualizo cantidad
                } else {
                toast.error("No hay Stock suficiente"); // aviso que no se puede
                return cartItem;  // dejo el item igual, sin cambios
                }
            }
            return cartItem; // los demás items del carrito los dejo igual
            })
        )
    }


    // Función para eliminar un item de la cart por su id
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== id));
        toast("Eliminado del carrito")
    };

    // Cálculos optimizados con useMemo para evitar recalcular en cada render
    const subtotal = useMemo(() => {
        return cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    }, [cart]);

    const tax = useMemo(() => subtotal * 0.05, [subtotal]);

    const shipping = useMemo(() => {
        if (subtotal === 0) return 0;       // si no hay productos, envío = 0
        return subtotal >= 90000 ? 0 : 1500;
        }, [subtotal]);

    const total = useMemo(() => subtotal + tax + shipping, [subtotal, tax, shipping]);

    // Guardar en localStorage cada vez que cambia el carrito
    useEffect(() => { 
        localStorage.setItem('cart', JSON.stringify(cart));
        }, [cart])

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, subtotal, tax, shipping, total }}>
            {children}
        </CartContext.Provider>
    );
};

// 3) Hook custom
export const useCartContext = () => useContext(CartContext);

