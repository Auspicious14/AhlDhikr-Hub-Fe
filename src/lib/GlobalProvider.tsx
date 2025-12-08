import React, { ReactNode } from "react";
import { AskProvider } from "@/modules/ask/context";
import { MyDhikrProvider } from "@/modules/my-dhikr/context";
import { SettingsProvider } from "@/modules/settings/context";

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  return (
    <SettingsProvider>
      <MyDhikrProvider>
        <AskProvider>{children}</AskProvider>
      </MyDhikrProvider>
    </SettingsProvider>
  );
};
