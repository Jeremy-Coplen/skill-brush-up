const GET_ADMIN_DATA = "GET_ADMIN_DATA"

export function getAdminData(data) {
    return {
        type: GET_ADMIN_DATA,
        payload: data
    }
}

const initialState = {
    user: {}
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ADMIN_DATA: {
            return Object.assign({}, {user: {}}, {admin: action.payload})
        }
        default: return state
    }
}