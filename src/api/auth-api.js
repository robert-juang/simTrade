const basePath = import.meta.env.VITE_API_AUTH_BASE_PATH

//call the stock api from the backend 
export const login = async (username, password) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: username, password: password})

    };
    const response = await fetch(`${basePath}/signin`, requestOptions)

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
    const response = await fetch(`${basePath}/signup`, requestOptions)
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
    const response = await fetch(`${basePath}/signout`, requestOptions)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
}

