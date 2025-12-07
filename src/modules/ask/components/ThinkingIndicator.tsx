import React from "react";
import { Loader2 } from "lucide-react";

interface ThinkingIndicatorProps {
  message?: string;
}

const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({
  message = "Searching for relevant sources...",
}) => {
  return (
    <div className="flex items-center gap-3 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
      <Loader2 className="h-5 w-5 text-gold-500 animate-spin" />
      <div className="flex-1">
        <p className="text-beige-100 font-medium">{message}</p>
        <div className="flex gap-1 mt-2">
          <span
            className="w-2 h-2 bg-gold-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-gold-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-gold-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;
