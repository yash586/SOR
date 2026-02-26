import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

export interface AuthState {
  token: string | null;
  hashId: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState{
  login: (token: string, hashId: string) => void;
  logout: () => void;
}

type AuthAction = | {type: "LOGIN", payload: {token:string; hashId: string}} | {type: "LOGOUT"}

const initialState : AuthState = {
    token: localStorage.getItem("token"),
    hashId: localStorage.getItem("hashId"),
    isAuthenticated: !!localStorage.getItem("token")
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () => {},
  logout: () => {}
});

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      console.log("LOGIN action fired", action.payload);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("hashId", action.payload.hashId);
      return {
        token: action.payload.token,
        hashId: action.payload.hashId,
        isAuthenticated: true
      }
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("hashId");
      return {
        token: null,
        hashId: null,
        isAuthenticated: false
      }
    default:
      return state;
  }
}

export const AuthProvider = ({children}: {children: ReactNode}) =>{
  const [authState, dispatchAuth] = useReducer(authReducer, initialState);

  const login = (token: string, hashId:string) => {
    dispatchAuth({type: "LOGIN", payload:{token, hashId}});
  };

  const logout = () => {
    dispatchAuth({type: "LOGOUT"});
  };

  return <AuthContext.Provider value={{...authState, login, logout}}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext);
