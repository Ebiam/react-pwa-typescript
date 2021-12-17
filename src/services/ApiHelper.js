import axios from "axios";
import config from '../config/config';

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
