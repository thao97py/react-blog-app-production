import {createContext,useEffect,useReducer} from "react";
import Reducer from "./Reducer";

const INITIAL_STATE={
    user:JSON.parse(localStorage.getItem("user"))||null,
    isFetching:false,
    error:false,
};
export const Context = createContext(INITIAL_STATE);

/**How do I reach this user(inside INITIAL_STATE) inside any component?
 * I need to create a contect wrapper and wraps all the components inside this provider. Then I am able to reach this INITIAL_STATE
*/


//children: all components
export const ContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user));
    },[state.user]);
    
    return(
        <Context.Provider
            value={{
                user:state.user,
                isFetching:state.isFetching,
                error:state.error,
                dispatch,
            }}   
        >
            {children}
        </Context.Provider>
    )
}