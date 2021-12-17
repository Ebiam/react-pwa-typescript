import axios from "axios";
import config from '../config/config';
import {useAppDispatch} from '../redux2/store/hooks';
//import {setOpen, setMessage} from "../redux2/toast/toastSlice";
import {setState} from "../redux2/sw/swSlice";

const ShowErrorModal = () => {
    const dispatch = useAppDispatch();

    axios.interceptors.response.use(
        (resp) => resp,
        (error) => {
            dispatch(setState('pending'))
            console.log("Network error 000", error);
            if (!error.response) {
                console.log("Network error 1", error);
            }
            else if (error.response.status === 400) {
                console.log("Network error 3", error);
            }
            else if (error.response.status === 500 || error.response.status === 502) {
                console.log("Network error 3", error);
            }
            return Promise.reject(error);
        }
    );
};

export const createAxiosInterceptor = () => {
    // Instantiate the interceptor (you can chain it as it returns the axios instance)
    ShowErrorModal();
};

class ApiHelper {
    static register_notification(subscription) {
        console.log('[ApiHelper] register_notification');
        return axios.post(config.api_url + "/notifications/register", subscription);
    }

    static edit(subscription) {
        console.log('[ApiHelper] edit');
        return axios.get(config.api_url + "/edit/2", subscription);
    }

    static login(username, password) {
        console.log('[ApiHelper] edit');
        return axios.post(config.api_url + "/login", {username, password});
    }
}

export default ApiHelper;
