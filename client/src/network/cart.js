import {request} from './network'

export function addCart(data){
    return request({
        url:'/users/addCart',
        method:'get',
        params:data,
        withCredentials: true
    })
}

export function getCart(){
    return request({
        url:'/users/getCart',
        method:'get',
        withCredentials: true
    })
}

export function updateCart(data){
    return request({
        url:'/users/updateCart',
        method:'get',
        withCredentials: true,
        params:data
    })
}

export function deleteCart(data){
    return request({
        url:'/users/deleteCart',
        method:'get',
        params:data
    })
}
export function getLikeBooks(data){
    return request({
        url:'/books/likeBook',
        method:'get',
        params:data
    })
}