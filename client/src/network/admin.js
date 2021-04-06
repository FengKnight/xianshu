import {request} from './network'

export function getBigSort(){
    return request({
        url:'/books/big',
        method:'get',
    })
}
export function getSmallSort(){
    return request({
        url:'/books/small',
        method:'get',
    })
}

export function getBook(){
    return request({
        url:'/books/book',
        method:'get',
    })
}

export function getBookPage(data){
    return request({
        url:'/books/bookPage',
        method:'get',
        params:data,
        withCredentials: true
    })
}
export function getCheckBookPage(data){
    return request({
        url:'/books/checkBookPage',
        method:'get',
        params:data,
        withCredentials: true
    })
}

export function postCheckBookUpdate(data){
    return request({
        url:'/books/checkBookUpdate',
        method:'post',
        data:data,
        withCredentials: true
    })
}

export function getUserPage(data){
    return request({
        url:'/users/userPage',
        method:'get',
        params:data
    })
}

export function postDeleteUser(data){
    return request({
        url:'/users/deleteUser',
        method:'post',
        data:data
    })
}


export function addBook(data){
    return request({
        url:'/books/add',
        method:'post',
        data:data
    })
}



export function deleteBook(data){
    return request({
        url:'/books/delete',
        method:'post',
        data:data
    })
}


export function updateBook(data){
    return request({
        url:'/books/update',
        method:'post',
        data:data
    })
}


export function getSortSums(data){
    return request({
        url:'/books/sortSum',
        method:'get',
        params:data
    })
}

export function getAllBooksSums(data){
    return request({
        url:'/books/allBooksSum',
        method:'get',
        params:data
    })
}

export function getAllUserSums(data){
    return request({
        url:'/books/allUserSum',
        method:'get',
        params:data
    })
}

export function getAllOrderSums(data){
    return request({
        url:'/books/allOrderSum',
        method:'get',
        params:data
    })
}

export function getTopThreeMessage(data){
    return request({
        url:'/books/topThreeMessage',
        method:'get',
        params:data
    })
}

export function getTopSell(data){
    return request({
        url:'/books/topSell',
        method:'get',
        params:data
    })
}

export function getBannerPage(data){
    return request({
        url:'/books/bannerPage',
        method:'get',
        params:data
    })
}

export function deleteBanner(data){
    return request({
        url:'/books/deleteBanner',
        method:'post',
        data:data
    })
}

export function updateBanner(data){
    return request({
        url:'/books/updateBanner',
        method:'post',
        data:data
    })
}

export function addBanner(data){
    return request({
        url:'/books/addBanner',
        method:'post',
        data:data
    })
}

export function getAdvertPage(data){
    return request({
        url:'/books/advertPage',
        method:'get',
        params:data
    })
}

export function deleteAdvert(data){
    return request({
        url:'/books/deleteAdvert',
        method:'post',
        data:data
    })
}



export function addAdvert(data){
    return request({
        url:'/books/addAdvert',
        method:'post',
        data:data
    })
}

export function getRecommendBooks(data){
    return request({
        url:'/books/recommendBook',
        method:'get',
        params:data
    })
}
export function getNewBooks(data){
    return request({
        url:'/books/newBook',
        method:'get',
        params:data
    })
}

export function getActivityList(data){
    return request({
        url:'/books/activityList',
        method:'get',
        params:data
    })
}
export function getActivity(data){
    return request({
        url:'/books/activity',
        method:'get',
        params:data
    })
}

export function addActivity(data){
    return request({
        url:'/books/addActivity',
        method:'post',
        data:data
    })
}

export function deleteActivity(data){
    return request({
        url:'/books/deleteActivity',
        method:'post',
        data:data
    })
}

export function getPortId(data){
    return request({
        url:'/books/portId',
        method:'get',
        params:data
    })
}

export function getActivityTitle(data){
    return request({
        url:'/books/activityTitle',
        method:'get',
        params:data
    })
}