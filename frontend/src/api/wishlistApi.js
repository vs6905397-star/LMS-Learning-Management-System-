import api from "./axios";

export const addToWishlist = async (courseId) => {
    const res = await api.post(`/wishlist/${courseId}`);

    return res.data;
}

export const getWishlist = async () => {
    const res = await api.get("/wishlist");

    return res.data;
}

export const removeFromWishlist = async (courseId) => {
    const res = await api.delete(`/wishlist/${courseId}`);

    return res.data;
}