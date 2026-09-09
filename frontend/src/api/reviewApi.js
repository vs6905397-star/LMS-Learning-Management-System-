import api from "./axios"

export const createReview = async (data) =>{
    const  res = await api.post("/reviews/", data);

    return res.data;
}

export const getReviews = async (courseId) =>{
    const res = await api.get(`/reviews/${courseId}`);

    return res.data;
}

export const deleteReview = async (reviewId) => {
    const res = await api.delete(`/reviews/${reviewId}`);

    return res.data;
}