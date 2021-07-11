import React,{useState} from 'react'
import {FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton} from '@material-ui/core'
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
const PasswordField = ({name,label,password,setPassword, className}) => {
    const [showPassword, setShowPassword] = useState(false)
    const handleMouseDownPassword = event => {
		event.preventDefault()
	}
    return (
        <FormControl variant="outlined" style={{ width: "100%" }}  className={className}>
        <InputLabel htmlFor={name}>
            {label} <sup>*</sup>
        </InputLabel>
        <OutlinedInput 
           
            required
            variant="outlined"
            label={label}
            fullWidth
            onChange={e => setPassword(e.target.value)}
            name={name}
            id={name}
            type={showPassword ? "text" : "password"}
            value={password}
            autoComplete="current-password"
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            }
            labelWidth={70}
        />
    </FormControl>
    )
}

export default PasswordField
