import { createSelector } from "reselect";
/* Selectors can compute derived data, allowing Redux to store the minimal possible state.
A selector is not recomputed unless one of its arguments changes.
They can be used as input to other selectors.
*/


//take the cart items from state
const selectCart = state => state.cart;

//create memoized func for retrieving cartitems
//takes 2 args  -1st arg -collection array of input selectors
//2nd arg - function for returning value we want out of it

//this is now a memoized selector it will not be rerun until one of its args change
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden 
)

//create memoized func for retrieving cartitems count taking
//selectcartitems from pervious func n taking count out of it
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumalatedQuantity,cartItem)=> 
            accumalatedQuantity+cartItem.quantity,0)
)


export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumalatedQuantity,cartItem)=> 
            accumalatedQuantity+cartItem.quantity*cartItem.price ,0)
)