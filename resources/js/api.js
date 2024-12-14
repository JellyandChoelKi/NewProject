import axios from './axios';

export const checkAdmin = async () => {
    try {
        const response = await axios.get('/api/check-admin', {
            headers: {
                'Authorization': `Bearer ${axios.defaults.headers.common['Authorization']}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error checking admin status:', error);
        throw error;
    }
};
