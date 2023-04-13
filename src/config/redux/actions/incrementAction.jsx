export const increment = (data) =>{
    const dateCreate = new Date().toLocaleDateString()
    const result ={
        name : data,
        createAt: dateCreate
    }
    return {
        type:"INCREMENT",
        payload:result
    }
} 