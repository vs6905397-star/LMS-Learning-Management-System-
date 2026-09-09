import api from "./axios"

export const signUp = (formData) => {
    return api.post("/auth/signup", formData);
};

export const login = async (data) => {
    const res = await api.post("/auth/login", data);

    return res.data;
};

export const Logout = () => {
    return api.post("/auth/logout");
}

export const getProfile = async () => {
    const res = await api.get("/auth/profile");

    return res.data;
}

export const updateProfile = async (data) => {
    const res = await api.patch("/auth/profile", data);

    return res.data;
}

export const getCompleteCourse = async () => {
    const res = await api.get("/auth/completed-course");

    return res.data
}