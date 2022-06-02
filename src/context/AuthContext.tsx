import React, { createContext, useState, SetStateAction } from "react";

type AuthContextProps = {
  user: boolean;
  setUser: React.Dispatch<SetStateAction<boolean>>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const Context = createContext<AuthContextProps>({
  user: false,
  setUser: () => null,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(false);

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
}
