import {all,call} from 'redux-saga/effects';

import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';
/*That is a generator function called the root saga,
 and what it does is it yields to this all call,
which gets an array of generators that we invoke. 

whenever we add a new saga that we want to listen for, we
just put it into this array, right.And call that saga just
like we did with reducers and our reducers

all takes an array of sagas.
If we wanted to say render three different sagas, imagine we had three sagas.
Typically, what we would have to do is we would do this multiple times.
We would yield.These different sagas.this next yield is actually waiting 
for this yield and this saga to resolve with some value, or at least when 
that saga leaves at some point, which gives control back to our roots saga
so that it can continue on to executing the next saga.

We don't want that, we want all our code to pretty much initialize as 
soon as possible side by side,and that's what all allows us to do
by using the yield all call, we're able to actually call any number
of safeguards inside of this array and initialize them all on 
separate task streams,
*/

export default function* rootSaga(){
    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas)
    ])
}