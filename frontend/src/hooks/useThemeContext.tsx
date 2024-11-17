import { useState, useMemo } from 'react';
import { createTheme, PaletteMode } from '@mui/material/styles';

const useThemeContext = () => {
    const [mode, setMode] = useState<PaletteMode>("dark");

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode,
                }
            }),
        [mode]
    );

    return { mode, setMode, theme };
};

export default useThemeContext;