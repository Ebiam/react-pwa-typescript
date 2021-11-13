import axios from "axios";
import config from '../config/config';

class ApiHelper {
    static register_notification(subscription) {
        console.log('[ApiHelper] register_notification');
        return axios.post(config.api_url + "/notifications/register", subscription);
    }
}

export default ApiHelper;
