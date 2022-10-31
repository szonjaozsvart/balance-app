import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';

export default function FormField({
  name,
  color,
  type,
  label,
  icon,
  value,
  onChange,
}) {
  return (
    <div data-testid="formField" className="form-control">
      <TextField
        color={color}
        variant="outlined"
        type={type}
        InputProps={{
          'data-testid': 'content-input',
          startAdornment: icon !== null && (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
        }}
        name={name}
        label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
