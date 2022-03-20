import {createTheme, responsiveFontSizes} from '@mui/material/styles';
import {baseTheme} from './baseTheme';
import { lightTheme } from './lightTheme';


let theme = createTheme (baseTheme, lightTheme);
theme = responsiveFontSizes (theme);
export default theme;