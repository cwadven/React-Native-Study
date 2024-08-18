import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function fetchJwtToken(username: string, password: string): Promise<string | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/member/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const data = await response.json();
            const access_token = data.access_token;
            await AsyncStorage.setItem('authToken', access_token);
            return access_token;
        } else {
            console.error('Failed to login:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching JWT token:', error);
        return null;
    }
}
