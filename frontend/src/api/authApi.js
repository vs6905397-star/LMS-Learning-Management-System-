import api from "./axios"

export const signUp = (formData) => {
    return api.post("/auth/signup", formData);
};

export const verifyotp = async (data) => {
    const res = await api.post("/auth/verify-otp", data);

    return res.data;

}

export const resendotp = async (email) => {
    const res = await api.post("/auth/resend-otp", email);

    return res.data;

}

export const login = async (data) => {
    const res = await api.post("/auth/login", data);

    return res.data;
};

export const Logout = () => {
    return api.post("/auth/logout");
}

export const forgotPassword = async (email)=>{
    console.log(email)
    const res = await api.post("/auth/forgot-password", email);

    return res.data;
}

export const verifyResetOtp = async (data) => {
    const res = await api.post("/auth/verify-reset-otp", data);

    return res.data;
}

export const resetPassword = async (data) => {
    const res = await api.post("/auth/reset-password", data);

    return res.data;
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