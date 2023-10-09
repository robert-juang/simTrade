const basePath = "http://localhost:8080";

//call the stock api from the backend 
export const login = async (username, password) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: username, password: password})

    };
    const response = await fetch(`${basePath}/api/auth/signin`, requestOptions)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const result = await response.json()
    return result
};

export const signup = async (email, username, password) => {
    //signup with user permission only
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "username": username, "email": email, "password": password, "role": ["user"] })
    };
    const response = await fetch(`${basePath}/api/auth/signup`, requestOptions)
    console.log(response) 

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return response
}

export const forgotPassword = async (username) =>{

    return 
}

export const logOut = async (username, password) =>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "username": username, "password": password})
    };
    const response = await fetch(`${basePath}/api/auth/signout`, requestOptions)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
}

