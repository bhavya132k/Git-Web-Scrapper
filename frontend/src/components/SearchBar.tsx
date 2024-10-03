/* eslint-disable no-use-before-define */
import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Button, Select } from "@mui/material";

export default function SearchBar() {
  const [value, setValue] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");



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
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        fullWidth
        onInputChange={(event, newInputValue) => {
          const options = newInputValue.split(",");

          if (options.length > 1) {
            setValue(
              value
                .concat(options)
                .map((x) => x.trim())
                .filter((x) => x)
            );
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
