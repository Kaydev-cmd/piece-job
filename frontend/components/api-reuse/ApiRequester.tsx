import React ,{ useState} from "react";

export function useAPIRequster(){
  const [loading, setLoading] = useState<boolean>(false)
  const loadingScreen = loading ? 
    (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    )
    :null;
//   const withAPIRequester = useCallback(
//     async <T>(fn : ()=> Promise<T>):Promise<T> =>{

//     }
//     ,[])
  return {loading, setLoading,loadingScreen}
}
