import { actionType } from "../../types/types";

export type initialStateType = {
    arr:any
    variable:boolean
    url:string
    data:any
    verify:boolean
    io:any
}
const InitialState: initialStateType = {
    arr: [],
    variable:false,
    url:'',
    data:'',
    verify:true,
    io:'',
};

function reduxstate(state:initialStateType = InitialState, action: actionType): initialStateType {
    switch (action.type) {
        case "TRUE":
            return {
                ...state,
                variable:true
            };
        case 'URL':
            return {
                ...state,
                url:action.payload
            }
        case 'DATA':
            return {
                ...state,
                data:action.payload
            }
        case 'VERIFY':
            return {
                ...state,
                verify:action.payload
            }
        case 'SOCKET':
            return {
                ...state,
                io:action.payload
            }
        default:
            return state; 
    }
}
export default reduxstate;
    