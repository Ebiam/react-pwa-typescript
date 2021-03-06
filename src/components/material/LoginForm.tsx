import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
//import { login, logout } from '../../redux/reducers/userReducer';


interface FormState {
    username: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
    keepAlive: boolean;
}

interface FormErrorState {
    username: boolean;
    password: boolean;
}

interface ModeState {
    signIn: boolean;
}

/*interface LoginForm {
    username: string,
    password: string,
    keepAlive: boolean
};*/

interface LoginFormProps {
    login: (username: string, password: string, bool: boolean) => void,
    register: (username: string, password: string, bool: boolean) => void,
};

export default function LoginForm(props: LoginFormProps) {
    const [values, setValues] = React.useState<FormState>({
        username: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        keepAlive: false
    });

    const [error, setError] = React.useState<FormErrorState>({
        username: false,
        password: false,
    });

    const [mode, setMode] = React.useState<ModeState>({
        signIn: false,
    });

    const handleChange =
        (prop: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const toggleMode = () => {
        setMode({...mode, signIn: !mode.signIn});
        setError({...error})
    };

    const Login =
            <>
                <TextField
                    error={error.username}
                    id="outlined-required"
                    label="Your Username"
                    value={values.username}
                    onChange={handleChange('username')}
                    helperText={error.username ? "Invalid creditentials." : ""}
                    style={{margin: 8,width:'95%'}}
                />
                <FormControl style={{margin: 8,width:'95%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Your password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        label="Your password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </>;

    const SignIn =
        <>
            <TextField
                error={error.username}
                id="outlined-required"
                label="Your Username"
                value={values.username}
                onChange={handleChange('username')}
                helperText={error.username ? "Invalid creditentials." : ""}
                style={{margin: 8,width:'95%'}}
            />
            <FormControl style={{margin: 8,width:'95%'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Your password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    label="Your password"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl style={{margin: 8,width:'95%'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    label="Confirm Password"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </>;

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            style={{margin:8, border: '2px solid', justifyContent: 'center', alignItems: 'center', borderRadius: '5px', minWidth: 250}}
        >
            {mode.signIn ? SignIn : Login}
            <div style={{ margin: 8, width:'95%', display: 'flex', justifyContent: 'space-between'}}>
                {mode.signIn ?
                    <>
                        <Button style={{ margin:5}} onClick={() => toggleMode()} variant="outlined">Login</Button>
                        <Button style={{ margin:5}} variant="contained"  onClick={() => props.register(values.username, values.password, values.keepAlive)} >Sign In</Button>
                    </> :
                    <>
                        <Button style={{ margin:5}} onClick={() => toggleMode()} variant="outlined">Sign In</Button>
                        <Button style={{ margin:5}} variant="contained" onClick={() => props.login(values.username, values.password, values.keepAlive)}>Login</Button>
                    </>
                }
            </div>
        </Box>
    );
}
