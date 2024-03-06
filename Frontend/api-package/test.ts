import APIRequest from './index';
import { TRequestMethod } from './types/index';

const request = {
    uri: '/api/auth',
    method: TRequestMethod.POST,
    headers: {
        'X-Auth-Token': 'qqq'
    }
};

(async () => 
    await new APIRequest(request).doRequest().then(res => res.json()).then(res => console.log(res))
)();
export default 1;