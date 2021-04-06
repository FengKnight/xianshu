import {request} from './network'

export function addOrder(data){
    return request({
        url:'/users/order',
        method:'post',
        data:data,
        withCredentials: true
    })
}

export function getOrder(){
    return request({
        url:'/users/orderContent',
        method:'get',
        withCredentials: true
    })
}

export function getAllOrder(){
    return request({
        url:'/users/allOrderContent',
        method:'get',
        withCredentials: true
    })
}
export function updateContent(data){
    return request({
        url:'/users/contentUpdate',
        method:'post',
        data:data
    })
}

export function deleteOrder(data){
    return request({
        url:'/users/cancelOrder',
        method:'post',
        data:data
    })
}

export function deleteOrders(data){
    return request({
        url:'/users/deleteOrder',
        method:'post',
        data:data
    })
}
