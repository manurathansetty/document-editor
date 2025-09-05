// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUser = async (id: string) => {
    // const response = await fetch(`${BACKEND_URL}/user/${id}`);
    // const data = await response.json();
    return {

        user: { username: "John Doe" }
    };
};

export const loginUser = async (username: string, password: string) => {
    // const response = await fetch(`${BACKEND_URL}/user/login`, {
    //     method: "POST",
    //     body: JSON.stringify({ username, password })
    // });
    // const data = await response.json();
    return {
        user: { username: "Manu" }
    };
};
