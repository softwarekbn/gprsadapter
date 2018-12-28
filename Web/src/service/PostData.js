export function PostData(userData){
    return new Promise((resolve, reject) =>{
        fetch('http://192.168.43.52:5000/login', {

            method:'POST',
            headers:{
                'Accept':'application/json',
                'content-Type':'application/json',

            },
            body:JSON.stringify(userData)
           
        })
        .then((response) => response.json())
        .then((responseJson) =>{
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error)
        })
    });
}