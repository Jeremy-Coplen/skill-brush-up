const GET_ADMIN_DATA = "GET_ADMIN_DATA"
const UPDATE_USER_CART = "UPDATE_USER_CART"
const UPDATE_USER_SUBTOTAL = "UPDATE_USER_SUBTOTAL"
const UPDATE_USER_TOTAL = "UPDATE_USER_TOTAL"

export function getAdminData(data) {
    return {
        type: GET_ADMIN_DATA,
        payload: data
    }
}

export function updateUserCart(data) {
    return {
        type: UPDATE_USER_CART,
        payload: data
    }
}

export function updateUserSubtotal(data) {
    return {
        type: UPDATE_USER_SUBTOTAL,
        payload: data
    }
}

export function updateUserTotal (data) {
    return {
        type: UPDATE_USER_TOTAL,
        payload: data
    }
}

const initialState = {
    user: {
        cart: [],
        subtotal: 0.00,
        total: 0.00
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ADMIN_DATA: {
            return Object.assign({}, {admin: action.payload})
        }
        case UPDATE_USER_CART: {
            return Object.assign({}, state, {user: { 
                cart: [...action.payload],
                subtotal: state.user.subtotal,
                total: state.user.total }})
        }
        case UPDATE_USER_SUBTOTAL: {
            return Object.assign({}, state, {user: { 
                subtotal: action.payload,
                cart: state.user.cart,
                total: state.user.total}})
        }
        case UPDATE_USER_TOTAL: {
            return Object.assign({}, state, {user: { 
                total: action.payload,
                cart: state.user.cart,
                subtotal: state.user.subtotal }})
        }
        default: return state
    }
}