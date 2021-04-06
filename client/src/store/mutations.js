export const userStatus = (state,user)=>{
    if(user){
        state.name = user;
        state.isLogin = true;
    }
    else if(user == null){
        sessionStorage.setItem("username",null);
        state.name = null;
        state.isLogin = false
    }
}

export const booksStatus = (state, books) =>{
    state.books = books
}

export const adminShowSortStatus = (state, adminShow) =>{
    state.adminShow = adminShow
}

export const bookIdStatus = (state, bookId) =>{
    state.bookId = bookId
}
export const bisSortStatus = (state, bigSort) =>{
    state.bigSort = bigSort
}
export const smallSortStatus = (state, smallSort) =>{
    state.smallSort = smallSort
}

export const selectTextStatus = (state, selectText) =>{
    state.selectText = selectText
}

export const selectBookStatus = (state, selectBook) =>{
    state.selectBook = selectBook
}

export const message_idStatus = (state, message_id) =>{
    state.message_id = message_id
}
export const sells_nameStatus = (state, sells_name) =>{
    state.sells_name= sells_name
}

export const isActiveStatus = (state, isActive) =>{
    state.isActive= isActive
}
export const portStatus = (state, port) =>{
    state.port= port
}
export const orderStateStatus = (state, orderState) =>{
    state.orderState= orderState
}
