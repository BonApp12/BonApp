import axios from 'axios';
import {BACKEND_URL} from 'react-native-dotenv';

export default axios.create({baseURL: BACKEND_URL});