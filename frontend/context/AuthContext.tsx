import React,{ useState, createContext, useContext, useEffect } from "react";

export interface AuthContextType{
    loggedInToken: string | null ;
    login: (newToken:string)=> void;
    logout : () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType) ;

export const AuthContextProvider : React.FC<{children:React.ReactNode}> =({children})=>{
    const [loggedInToken,setLoggedInToken] = useState<string>("") ;
    const login = (newToken:string)=>{
        console.log("new token: ",newToken,"old token:",loggedInToken);    
        setLoggedInToken(newToken)
    } 
    const logout =() => setLoggedInToken("")

    useEffect(()=>{
        console.log("AuthContext mount");
    },[])

    return (
        <AuthContext.Provider value={{loggedInToken,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuth = () =>{
    return useContext(AuthContext) ;
}