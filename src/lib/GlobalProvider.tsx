import React, { ReactNode } from "react";
import { AskProvider } from "@/modules/ask/context";
import { MyDhikrProvider } from "@/modules/my-dhikr/context";
import { SettingsProvider } from "@/modules/settings/context";
import { AuthProvider } from "@/modules/auth/context";
import { GoogleOAuthProvider } from "@react-oauth/google";


interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
     <AuthProvider>
    <SettingsProvider>
      <MyDhikrProvider>
        <AskProvider>{children}</AskProvider>
      </MyDhikrProvider>
    </SettingsProvider>
  </AuthProvider>
</GoogleOAuthProvider>
  );
};
