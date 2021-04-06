import {request} from './network'

export function postLogin(data){
    return request({
        url:'/users/login',
        method:'post',
        data:data
    })
}

export function postLayout(data){
    return request({
        url:'/users/layout',
        method:'post',
    })
}
