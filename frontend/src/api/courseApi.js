import api from "./axios"

export const getCourses = async (params) => {
    const res = await api.get("/course", {params});

    return res.data;
}

export const getCourseById = async (id) => {
    const res = await api.get(`/course/${id}`);

    return res.data;
}