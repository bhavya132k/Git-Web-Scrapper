import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Button, Chip, Backdrop, CircularProgress } from "@mui/material";

import { useRepoContext } from "../hooks/useRepoContext";

export default function SearchBar() {
  const { value, setValue } = useRepoContext();
  const [tags, setTags] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState({ error: false, helperText: "" });

  React.useEffect(() => {
    if (value.length > 0) {
      setTags(value);
    }
  }, [value]);

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
    if (newValue.length <= 5) {
      setTags(newValue);
      setError({ error: false, helperText: "" });
    } else {
      setError({
        error: true,
        helperText: "You can only add up to 5 keywords.",
      });
    }
  };

  return (
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap>
      <Autocomplete
        multiple
        freeSolo
        id="tags-standard"
        options={[
          "license:agpl-3.0",
          "license:apache-2.0",
          "license:bsd-2-clause",
          "license:bsd-3-clause",
          "license:bsl-1.0",
          "license:cc0-1.0",
          "license:epl-2.0",
          "license:gpl-2.0",
          "license:gpl-3.0",
          "license:lgpl-2.1",
          "license:mit",
          "license:mpl-2.0",
          "license:unlicense",
        ]}
        value={tags}
        inputValue={inputValue}
        onChange={handleTagChange}
        fullWidth
        onBlur={
          //close the autocomplete dropdown when the user clicks outside
          (event) => {
            event.target.blur();
          }
        }
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && inputValue.trim() !== "") {
            const newKeywords = [...tags, inputValue.trim()].slice(0, 5);
            setTags(newKeywords);
            setInputValue("");
            setError({
              error: newKeywords.length > 5,
              helperText:
                newKeywords.length > 5
                  ? "You can only add up to 5 keywords."
                  : "",
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

    </Stack>
  );
}
