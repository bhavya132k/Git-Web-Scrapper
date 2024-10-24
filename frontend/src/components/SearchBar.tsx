import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Button, Chip, Backdrop, CircularProgress, Select } from "@mui/material";

export default function SearchBar() {
  const [value, setValue] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleTagChange = (_event: any, newValue: string[]) => {
    if (newValue.length <= 5) {
      setValue(newValue);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
    >
      <Autocomplete
        multiple
        freeSolo
        id="tags-standard"
        options={[]}
        value={value}
        inputValue={inputValue}
        onChange={handleTagChange}
        fullWidth
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && inputValue.trim() !== "") {
            const newKeywords = [...value, inputValue.trim()].slice(0, 5);
            setValue(newKeywords);
            setInputValue("");
            setError(newKeywords.length > 5);
            event.preventDefault();
          }
        }}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Keywords"
            placeholder=""
            error={error}
            helperText={error ? "You can only add up to 5 keywords." : ""}
          />
        )}
        renderTags={(value, getTagProps) => (
          <>
            {value.map((option, index) => (
              <Chip
                label={option}
                {...getTagProps({ index })}
                style={{ margin: "2px" }}
              />
            ))}
          </>
        )}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Search
      </Button>

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </Stack>
    
  );
}
