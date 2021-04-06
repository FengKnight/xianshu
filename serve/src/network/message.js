import {request} from './network'

export function postAdd(data){
    return request({
        url:'/message/add',
        method:'post',
        data:data
    })
}

export function getMessages(data){
    return request({
        url:'/message/messages',
        method:'get',
        params:data,
    })
}

export function getProfileMessages(data){
    return request({
        url:'/message/profile',
        method:'get',
        params:data,
    })
}

export function postReAdd(data){
    return request({
        url:'/message/reAdd',
        method:'post',
        data:data
    })
}

export function getReMessages(data){
    return request({
        url:'/message/reMessages',
        method:'get',
        params:data,
    })
}

export function deleteMessage(data){
    return request({
        url:'/message/deleteMessage',
        method:'get',
        params:data,
    })
}
export function deleteReMessage(data){
    return request({
        url:'/message/deleteReMessage',
        method:'get',
        params:data,
    })
}