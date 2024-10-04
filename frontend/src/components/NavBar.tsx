import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import ThemeSwitch from './ThemeSwitch';
import useThemeContext from '../hooks/useThemeContext';

export default function NavBar() {
  const { mode, setMode, theme } = useThemeContext();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="github"
            sx={{ mr: 2 }}
          >
            <GitHubIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Git Web Scrapper
          </Typography>
          <ThemeSwitch onChange={() => {setMode(mode === 'light' ? 'dark' : 'light')
            console.log({theme, mode});

          }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
