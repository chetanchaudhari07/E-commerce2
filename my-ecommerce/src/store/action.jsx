import axios from "axios";

export const fetchProducts = () => async (dispatch) =>{
    const res = await axios.get('https://fakestoreapi.com/products')
    dispatch({type:"SET_PRODUCTS",payload:res.data});
};

const addToCart = (product) => {
    return {
        type:"ADD_TO_CART",
        payload:product
    }
};

const removeFromCart = (productId) => {
    return {
        type:"REMOVE_FROM_CART",
        payload:productId
    }
};

const clearCart = () => {
    return {
        type:"CLEAR_CART",
        payload:null
    }
};

export {addToCart,removeFromCart,clearCart};
