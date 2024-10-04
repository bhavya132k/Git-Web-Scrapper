/* eslint-disable no-use-before-define */
import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Button, Select, Chip } from "@mui/material";

export default function SearchBar() {
  const [value, setValue] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleTagChange = (_event: any, newValue: string[]) => {
    // only upto 5 keywords
    if (newValue.length <= 5) {
      setValue(newValue);
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
          const options = newInputValue.split(",");

          if (options.length > 1) {
            const newKeywords = options.map((x) => x.trim()).filter((x) => x);
            const updatedValue = [...value, ...newKeywords].slice(0, 5); // only allow 5 keyowrds doesn't allow 6th keyword
            setValue(updatedValue);
            setInputValue("");
          } else {
            setInputValue(newInputValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Keywords"
            placeholder=""
          />
        )}
        renderTags={(value, getTagProps) => (
          <>
            {value.map((option, index) => (
              <Chip
                key={option}
                label={option}
                {...getTagProps({ index })}
                style={{ margin: "2px" }}
              />
            ))}
          </>
        )}
      />
      <Select
        variant="outlined"
        value=""
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <option value="" disabled>
          Language
        </option>
        <option value="java">Java</option>
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
      </Select>
      <Button variant="contained" color="primary">
        Search
      </Button>
    </Stack>
  );
}
