// reducer is a function that receives the current state and an action object, decides how to update the state if necessary, and returns the new state: (state, action) => newState

import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from "./actions";
  
// import { useReducer } from 'react';

const initialState = {
  products: [],
  categories: [],
  currentCategory: '',
  cart: [],
  cartOpen: false
};

  // should only calculate the new state value based on the state & action arguments, must not do any asynchronous logic, calculate random values, or cause other "side effects"
  export const reducers = (state = initialState, action) => {
    switch (action.type) {
      // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
      case UPDATE_PRODUCTS:
        return {
          // If it's that action type, we return a new object with a copy of the state argument using the spread ... operator and then set the products key to a value of a new array with the action.products value spread across it
          ...state,
          products: [...action.products]
        };

      // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
      //  will look for a matching action value and return a new copy of state from there
      case UPDATE_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories]
        };
  
      case UPDATE_CURRENT_CATEGORY:
        return {
            ...state,
            currentCategory: action.currentCategory // not in an array
        };
    
      case ADD_TO_CART:
        return {
            ...state, // include the ...state operator to preserve everything else on state
            cartOpen: true, // true: so that users can immediately view the cart with the newly added item if it's not already open
            cart: [...state.cart, action.product] // update the cart property to add action.product to the end of the array
        };

      case ADD_MULTIPLE_TO_CART:
        return {
            ...state,
            cart: [...state.cart, ...action.products],
        };
    
      case REMOVE_FROM_CART:
        let newState = state.cart.filter(product => {
            return product._id !== action._id; // only keeps the items that don't match the provided _id property
        });

        return {
            ...state,
            cartOpen: newState.length > 0, // check the length of the array to set cartOpen to false when the array is empty
            cart: newState
        };

      case UPDATE_CART_QUANTITY:
        return {
            ...state,
            cartOpen: true,
            cart: state.cart.map(product => { // use map() method to create a new array instead of updating state.cart directly, as original state should be treated as immutable
            if (action._id === product._id) {
                product.purchaseQuantity = action.purchaseQuantity;
            }
            return product;
            })
        };
        
      case CLEAR_CART:
        return {
            ...state,
            cartOpen: false,
            cart: []
        };
    
      case TOGGLE_CART:
        return {
            ...state,
            cartOpen: !state.cartOpen
        };

      // if it's none of these actions, do not update state at all and keep things the same!
      default:
        return state;
    }
  };

  // used to help initialize our global state object and then provide us with the functionality for updating that state by automatically running it through our custom reducer() function. 
  //  Like a more in-depth way of using the useState() Hook we've used so much.
  // export function useProductReducer(initialState) {
  //   return useReducer(reducer, initialState);
  // }

export default reducers;