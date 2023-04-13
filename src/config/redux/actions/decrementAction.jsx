export const decrement = (data) =>{
    const dateCreate = new Date().toLocaleDateString()
    const result ={
        name : data,
        createAt: dateCreate
    }
    return {
        type:"DECREMENT",
        payload:result
    }
} 