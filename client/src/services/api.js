import axios from 'axios';

const API_URL = 'http://127.0.0.1:5001/api/items';

export const fetchItems = async (search = '') => {
    try {
        const response = await axios.get(`${API_URL}?search=${search}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

export const createItem = async (itemData) => {
    try {
        const response = await axios.post(API_URL, itemData);
        return response.data;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
};

export const updateItem = async (id, itemData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, itemData);
        return response.data;
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
};

export const deleteItem = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
};
