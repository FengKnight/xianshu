import {request} from './network'

export function postRegister(data){
    return request({
        url:'/users/register',
        method:'post',
        data:data
    })
}

