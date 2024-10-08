'use client';
import toCamelCase from '@/app/utils/toCamelCase';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import { useState } from 'react';

interface InputProps {
  inputName: 'Password' | 'Confirm Password';
}

export default function PasswordInput({ inputName }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const dataName: string = toCamelCase(inputName);

  return (
    <FormControl fullWidth variant='filled'>
      <InputLabel htmlFor={`filled-adornment-password ${inputName}`}>
        {inputName}
      </InputLabel>
      <FilledInput
        id={`filled-adornment-password ${inputName}`}
        name={dataName}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
