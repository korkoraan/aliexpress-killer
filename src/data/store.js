import {configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const print = console.log

const getItems = () => {
    return fetch('https://my-json-server.typicode.com/korkoraan/aliexpress-killer/items')
        .then((response) => response.json())
        .then(json => {
            return [...json]
        })
        .catch(error => {
            console.log('!!!ERROR!!!')
            console.log(error)
        })
}

export const fetchData = createAsyncThunk('a', async () => {
    const response = await fetch('https://my-json-server.typicode.com/korkoraan/aliexpress-killer/items')
    return response.json()
})

const LOADING = 'loading'
const OK = 'ok'
const ERROR = 'error'

const error = (message, data) => {
    return { type: ERROR, message: message, data: data }
}

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items_available_list: [],
        items_in_shopping_cart: [],
        status: {
            type: OK,
        }
    },
    reducers: {
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
        },
        refreshItems: (state) => {
            getItems()
                .then(data => {
                    state.items_available_list = [...data]
                })
                .catch(err => print(err))
        }
    },

    extraReducers(builder) {
        builder
            .addCase(fetchData.pending, (state, action) => {
                print('loading')
                state.status = { type: LOADING }
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                print('succeeded')
                const data = action.payload
                if (!Array.isArray(data)) {
                    state.status = error('we got not an array', typeof data)
                    return
                }
                // check duplicates ids
                const ids = data.map(item => item.id)
                if (new Set(ids).size !== ids.length) {
                    state.status = error('we got duplicates: ', ids)
                    return
                }
                state.items_available_list = [...data]
                state.status = { type: OK }
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = error('failed', action.payload)
            })
    }

})

export const { toCart, offCart } = itemsSlice.actions

export const store = configureStore({
    reducer: itemsSlice.reducer,
})
