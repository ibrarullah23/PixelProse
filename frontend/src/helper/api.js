import axios from 'axios';

export const fetchAuth = async () => {
    const response = await axios.get('/api/user/me', {
        withCredentials: true,
    });
    return response.data;
};

export const userProfileFn = async (username) => {
    const response = await axios.get(`/api/user/${username}`, {
        withCredentials: true,
    });
    return response.data;
};

export const loginUser = async ({ email, password }) => {
    const response = await axios.post('/api/user/login', { email, password });
    return response.data;
};

export const registerUser = async ({ email, username, password }) => {
    const response = await axios.post('/api/user/register', { email, username, password });
    return response.data;
};

export const fetchBlog = async (id) => {
    const data = await axios.get(`/api/post/${id}`);
    return data;
};

export const createBlog = async (blog) => {
    const data = await axios.post('/api/post/', {...blog});
    return data;
};

export const updateBlog = async (id, blog) => {
    const data = await axios.patch(`/api/post/${id}`, {...blog});
    return data;
};

export const deleteBlog = async (id) => {
    const data = await axios.delete(`/api/post/${id}`);
    return data;
};

export const fetchHomeFeed = async ({pageParam = 1 , limit = 5}) => {
    const data = await axios.get(`/api/post?page=${pageParam}&limit=${limit}`);
    return data.data;
};

