const API_URL = 'http://localhost:5000/api'; 


export const getProfile = async (token) => {
    const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            
            'Content-Type': 'multipart/form-data'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }

    return response.json();
};


export const updateProfile = async (profileData, token) => {
    const response = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: profileData,
    });

    if (!response.ok) {
        throw new Error('Failed to update profile');
    }

    return response.json();
};
