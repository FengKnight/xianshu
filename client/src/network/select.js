import {request} from './network'

export function getSelect(data){
    return request({
        url:'/books/bookSelect',
        method:'get',
        params:data
    })
}

export function getSelectPage(data){
    return request({
        url:'/books/selectPage',
        method:'get',
        params:data
    })
}