import {request} from './network'

export function getUser(){
    return request({
        url:'/users/user',
        method:'get',
    })
}

export function postUser(data){
    return request({
        url:'/users/userUpdate',
        method:'post',
        data:data
    })
}

export function postPass(data){
    return request({
        url:'/users/passUpdate',
        method:'post',
        data:data
    })
}

export function getmybooks(data){
    return request({
        url:'/users/profileBook',
        method:'get',
        params:data
    })
}

export function beMerchant(){
    return request({
        url:'/users/beMerchant',
        method:'get',
        withCredentials: true
    })
}