// import { createContext, ReactNode, useContext, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { userProps } from "../pages/Login";
// type AuthContextType = {
//   user: userProps;
// };
// const AuthContext = createContext<AuthContextType>(null!);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<userProps>();

//   const value = useMemo(
//     () => ({
//       user,
//     }),
//     [user]
//   );
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
