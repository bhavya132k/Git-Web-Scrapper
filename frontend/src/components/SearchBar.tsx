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
  const [error, setError] = React.useState({ error: false , helperText: "" });

  const handleOpen = () => {
    if (tags.length === 0) {
      setError({
        error: true,
        helperText: "Please enter at least one keyword.",
      });
      return;
    }
    setValue(tags);
  };

  const handleTagChange = (_event: any, newValue: string[]) => {
    if (newValue.length <= 4) {
      setTags(newValue);
      setError({ error: false, helperText: "" });
    } else {
      setError({ error: true, helperText: "You can only add up to 4 keywords." });
    }
  };

  return (
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap>
      <Autocomplete
        multiple
        freeSolo
        id="tags-standard"
        options={[
          "license:MIT",
          "license:Apache-2.0",
          "license:GPL-3.0",
          "license:BSD-3-Clause",
          "license:BSD-2-Clause",
          "license:LGPL-3.0",
        ]}
        value={tags}
        inputValue={inputValue}
        onChange={handleTagChange}
        fullWidth
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && inputValue.trim() !== "") {
            const newKeywords = [...tags, inputValue.trim()].slice(0, 4);
            setTags(newKeywords);
            setInputValue("");
            setError({
              error: newKeywords.length > 4,
              helperText: newKeywords.length > 4 ? "You can only add up to 4 keywords." : ""
            });
            event.preventDefault();
          }
        }}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Keywords"
            placeholder=""
            error={error.error}
            helperText={error.helperText}
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
