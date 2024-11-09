import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Button, Chip, Backdrop, CircularProgress } from "@mui/material";

import { useRepoContext } from "../hooks/RepoProvider";

export default function SearchBar() {
  const { setValue, loading } = useRepoContext();
  const [tags, setTags] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleOpen = () => {
    setValue(tags);
  };

  const handleTagChange = (_event: any, newValue: string[]) => {
    if (newValue.length <= 5) {
      setTags(newValue);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap>
      <Autocomplete
        multiple
        freeSolo
        id="tags-standard"
        options={[]}
        value={tags}
        inputValue={inputValue}
        onChange={handleTagChange}
        fullWidth
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && inputValue.trim() !== "") {
            const newKeywords = [...tags, inputValue.trim()].slice(0, 5);
            setTags(newKeywords);
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
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Search
      </Button>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Stack>
  );
}
