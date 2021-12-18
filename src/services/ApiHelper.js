import axios from "axios";
import config from '../config/config';
import {/*useAppDispatch, */useAppSelector} from '../redux2/store/hooks';
//import {setOpen, setMessage} from "../redux2/toast/toastSlice";
//import {setState} from "../redux2/sw/swSlice";

const ShowErrorModal = () => {
    //const dispatch = useAppDispatch();

    axios.interceptors.response.use(
        (resp) => resp,
        (error) => {

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

const AddAuthorizationHeader = () => {

    const token = useAppSelector((state) => state.user.token);

    axios.interceptors.request.use(
        (config) => {
            if (!config.headers.Authorization) {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
};

export const createAxiosInterceptor = () => {
    // Instantiate the interceptor (you can chain it as it returns the axios instance)
    ShowErrorModal();
    AddAuthorizationHeader();
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
        return axios.post(config.api_url + "/user/authenticate", {username, password});
    }

    static register(username, password) {
        console.log('[ApiHelper] edit');
        return axios.post(config.api_url + "/user/register", {username, password, firstname: username, lastname: username});
    }

    static getTasks(userId) {
        console.log('[ApiHelper] edit');
        return axios.post(config.api_url + "/usertasks", {userId: userId} );
    }

    static addTasks(userId, title,desc,done) {
        console.log('[ApiHelper] edit');
        return axios.post(config.api_url + "/usertasks/add", {userId, title,desc,done});
    }

}

export default ApiHelper;
