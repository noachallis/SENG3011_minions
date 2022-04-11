import React, { useState } from "react";
import Box from '@mui/material/Box';

interface props {
    setLanguage :  (language : string) => void
}

export const LanguageToggle : React.FC<props> = ({setLanguage}) => {

    return (
        <Box className="flags">
        <div>
          <span className="flagEmoji" onClick={() => setLanguage("en")} aria-label="auFlag">🇬🇧</span>
          <span className="flagEmoji" onClick={() => setLanguage("cn")} aria-label="auFlag">🇨🇳</span>
          <span className="flagEmoji" onClick={() => setLanguage("es")} aria-label="auFlag">🇪🇸</span>
          <span className="flagEmoji" onClick={() => setLanguage("fr")} aria-label="frFlag">🇫🇷</span>
          <span className="flagEmoji" onClick={() => setLanguage("de")} aria-label="deFlag">🇩🇪</span>
          <span className="flagEmoji" onClick={() => setLanguage("kr")} aria-label="auFlag">🇰🇷</span>
          <span className="flagEmoji" onClick={() => setLanguage("jp")} aria-label="auFlag">🇯🇵</span>
          <span className="flagEmoji" onClick={() => setLanguage("hn")} aria-label="auFlag">🇮🇳</span>
        </div>
      </Box>
    )
}
