import { combineReducers } from "redux";    


const intitialProductState = {
    products : [],
    cart:[]
}

function productReducer(state = intitialProductState,action){
    switch(action.type){
        case "SET_PRODUCTS":
            return {...state,products:action.payload};
        case "ADD_TO_CART":
            return {...state,cart:[...state.cart,action.payload]};
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart:state.cart.filter((item)=>item.id !== action.payload)
            };
        default:
            return state;    
    }

}

export default combineReducers({
    product:productReducer
});