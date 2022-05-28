import {configureStore, createSlice} from "@reduxjs/toolkit";

const createItems = (count) => {
    const result = []
    for (let i = 0; i < count; ++i ) {
        result.push({ name: `item ${i}`, id: i })
    }
    return result
}

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items_available_list: createItems(100),
        items_in_shopping_cart: [],
    },
    reducers: {
        // addToCart: (state, action) => {
        //     const { id } = action.payload
        //     const { items_in_shopping_cart } = state
        //     const idx = items_in_shopping_cart.findIndex(item => item.id === id)
        //     if (idx >= 0) { // in cart
        //         state.items_in_shopping_cart.splice(idx, 1)
        //     }
        //     else {
        //         state.items_in_shopping_cart.push(action.payload)
        //     }
        // },
        toCart: (state, action) => {
            const { id } = action.payload
            const { items_in_shopping_cart } = state
            const idx = items_in_shopping_cart.findIndex(item => item.id === id)
            if (idx === -1) { // not in cart
                state.items_in_shopping_cart.push(action.payload)
            }
        },
        offCart: (state, action) => {
            const { id } = action.payload
            const { items_in_shopping_cart } = state
            const idx = items_in_shopping_cart.findIndex(item => item.id === id)
            if (idx >= 0) { // in cart
                state.items_in_shopping_cart.splice(idx, 1)
            }
        }

    }
})

export const { toCart, offCart } = itemsSlice.actions

export const store = configureStore({
    reducer: itemsSlice.reducer,
})
