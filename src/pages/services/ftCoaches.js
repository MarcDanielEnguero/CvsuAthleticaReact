import axios from 'axios'; // Install axios if not already installed

export const getCoachData = async () => {
    try {
      const response = await axios.get('/api/registration'); // Replace with your actual API endpoint
      return response.data;
    } catch (error) {
      console.error('Error fetching coach data:', error);
      throw error; // Handle error in the calling component
    }
  };