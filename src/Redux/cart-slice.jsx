import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice(
    {
        name: 'mxCart',
        initialState: {
            cart: [],
            totalPrice : 0,
            isCartVisible: false,
            isAuthenticated : false
        },
        reducers: {
            addToCart (state,action) {
            const index      = state.cart.findIndex(item => item.id === action.payload.id);
            if(index !== -1) {
                if(state.cart[index].size !== action.payload.size) {
                    state.cart.push({
                    ...action.payload,
                    quantity: 1
                    });
                    state.totalPrice += action.payload.price;
                    }

            else {
                if(state.cart[index].quantity === 5){
                 alert('Maximum quantity is 5');
                 return;
                }
                 state.cart[index].quantity += 1;
                 state.totalPrice += action.payload.price;
                }}

                else {
                    state.cart.push({
                        ...action.payload,
                        quantity: 1
                    });
                    state.totalPrice += action.payload.price;
                
                }
            },

            addQuantity (state, action) {
                const index = state.cart.findIndex(item => item.id === action.payload);
                if(state.cart[index].quantity === 5) {
                    alert('Maximum quantity is 5')
                }
                else {
                    state.cart[index].quantity += 1;
                    state.totalPrice += state.cart[index].price;
                }
            },

            reduceQuantity (state, action) {
                const index = state.cart.findIndex(item => item.id === action.payload);
                if(state.cart[index].quantity === 1) {
                    state.cart.splice(index,1);
                    state.totalPrice = 0;
                }
                else {
                    state.cart[index].quantity -= 1;
                    state.totalPrice -= state.cart[index].price;
                }
            },

            toggleCart (state) {
                state.isCartVisible = !state.isCartVisible;
            },

            resetCart (state) {
                state.cart = [];
            }

            
        }
    }
)

export default cartSlice;

export const cartActions = cartSlice.actions;