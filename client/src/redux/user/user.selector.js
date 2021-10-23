import {createSelector} from 'reselect';

const selectUser = state =>  state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)

/*if you also want to get cart item  */
// const selectCart = state => state.cart;
// export const selectCurrentUser = createSelector(
//     [selectUser,selectCart],
//     (user,cart) => user.currentUser
// )
