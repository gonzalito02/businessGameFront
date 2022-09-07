import {
    GET_ALLPLAYERS, 
    GET_ACTIONFORMS, 
    GET_ACTIONFORM_ID, 
    GET_GAMECONTROL,
    GET_PLAYER_ID,
    SET_ERRORS,
    GET_PENDDINGACTIONFORMS,
    GET_MARKETLIVE,
    MAKE_CART,
    CART_CONTROL,
    LOGIN,
    LOGOUT,
    SET_USER_LOGGED,
    GET_STUDENT_ID,
    GET_STUDENTS,
    GET_RESULTSPLAYER_ID,
    GET_ALLRESULTSPLAYER,
    GET_QUALITYREGISTER_ID,
    GET_STUDENTSHOPREG_ID,
    GET_PLAYERSHOPREG_ID,
    SUBMIT_UPDATE,
    GET_MARKETLIVE_DOWNLOAD,
    GET_MEMORY,
} from "../actions/types";
  
const initialState = {
    userLogin: [],
    gameControl: {},
    errors: [],
    allPlayers: [],
    allStudents: [],
    dataPlayerId: {},
    dataStudentId: {},
    resultsPlayerId: [],
    allResultsPlayer: [],
    allForms: [],
    penddingForms: [],
    qualityRegister: [],
    playerForms: [],
    marketLive: [],
    marketLiveDownload: [],
    shoppingRegister: [],
    cart: [],
    cartControl: [],
    submit: true,
    memory: []
};
  
export default function rootReducer(state = initialState, action) {
    const { type, payload, ctrl } = action;
    switch (type) {

        case SET_ERRORS:
        return {
            ...state,
            errors: payload,
        };

        case LOGIN:
        return {
            ...state,
            userLogin: payload,
            errors: "Login done"
        };

        case SET_USER_LOGGED:
        return {
            ...state,
            userLogin: payload,
            errors: "Session recovery"
        };

        case LOGOUT:
        return {
            ...state,
            userLogin: [],
            errors: "Logout done"
        };

        case GET_ALLPLAYERS:

            function SortArray(x, y){
                if (x.index > y.index) {return -1;}
                if (x.index < y.index) {return 1;}
                return 0;
            }
            var sorted = payload.response.sort(SortArray);

        return {
            ...state,
            allPlayers: sorted,
            errors: "All players obtained"
        };

        case GET_STUDENTS:
        return {
            ...state,
            allStudents: payload.response,
            errors: "All students obtained"
        };

        case GET_PLAYER_ID:
        return {
            ...state,
            dataPlayerId: payload,
            errors: "Player obtained"
        };

        case GET_STUDENT_ID:
        return {
            ...state,
            dataStudentId: payload,
            errors: "Student obtained"
        };

        case GET_GAMECONTROL:
        return {
            ...state,
            gameControl: payload,
            errors: "gameControl set"
        };

        case GET_ACTIONFORMS:
        return {
            ...state,
            allForms: payload,
            errors: "All forms obtained"
        };

        case GET_MEMORY:
        return {
            ...state,
            memory: payload,
            errors: "Memories obtained"
        };

        case GET_ALLRESULTSPLAYER:
            return {
            ...state,
            allResultsPlayer: payload,
            errors: "All results obtained"
        };

        case GET_PENDDINGACTIONFORMS:
        return {
            ...state,
            penddingForms: payload,
            errors: "All pendding forms obtained"
        };

        case GET_ACTIONFORM_ID:
        return {
            ...state,
            playerForms: payload,
            errors: "Forms by ID obtained"
        };

        case GET_QUALITYREGISTER_ID:
        return {
            ...state,
            qualityRegister: payload,
            errors: "Quality register by ID obtained"
        };

        case GET_STUDENTSHOPREG_ID:
        return {
            ...state,
            shoppingRegister: payload,
            errors: "Student shopping register by ID obtained"
        };

        case GET_PLAYERSHOPREG_ID:
        return {
            ...state,
            shoppingRegister: payload,
            errors: "Player shopping register by ID obtained"
        };

        case GET_RESULTSPLAYER_ID:
            return {
                ...state,
                resultsPlayerId: payload,
                errors: "Results by ID obtained"
            };

        case GET_MARKETLIVE:
        return {
            ...state,
            marketLive: payload,
            errors: "Market live obtained"
        };

        case GET_MARKETLIVE_DOWNLOAD:
        return {
            ...state,
            marketLiveDownload: payload,
            errors: "Market live for download obtained"
        };

        case SUBMIT_UPDATE:
            return {
                ...state,
                submit: !(state.submit),
                errors: "Updating"
            };

        case MAKE_CART:

            var clean = [...state.cart]
            var test = parseInt(payload[1])
            test = test || 0

            var newpayload = [payload[0], test, payload[2]]

            if (test === 0) {
                var filtEqual = clean.filter(m => m[0] !== payload[0])
            } else {
                var filtEqual = clean.filter(m => m[0] !== payload[0])
                filtEqual.push(newpayload)
            }
            
            return {
                ...state,
                cart: filtEqual,
                errors: "Adding to cart"
        };

        case CART_CONTROL:

            var valuation = [...state.cartControl]
            
            if (valuation.includes(payload) && ctrl === "rm") {
                valuation = valuation.filter(m => m !== payload)
            } else if (!valuation.includes(payload) && ctrl === "add") {
                valuation.push(payload)
            }

            return {
                ...state,
                cartControl: valuation,
                errors: "Market valuation done"
            };

        default:
    return state;
  }
}