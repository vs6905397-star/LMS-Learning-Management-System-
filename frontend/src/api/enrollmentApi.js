import api from "./axios"

export const createEnrollment = async ( courseId ) => {
    const res = await api.post("/enrollment", {courseId});

    return res.data;
}

export const getMyEnrollment = async () => {
    const res = await api.get("/enrollment");

    return res.data;
}

export const getEnrolledById = async (id) => {
    const res = await api.get(`/enrollment/${id}`);

    return res.data;
}

export const markAsComplete = async (enrollmentId, lessonId) => {
    const res = api.patch(`/enrollment/${enrollmentId}/lesson/${lessonId}`, {},{withCredentials:true});

    return res;
}