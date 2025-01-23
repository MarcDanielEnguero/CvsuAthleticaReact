import axios from 'axios'; // Ensure axios is installed: npm install axios

export const getFreeTrainingData = async () => {
  try {
    // Fetch data from the registration endpoint
    const response = await axios.get('http://localhost:5000/api/registration'); // Update with your actual backend URL
    const registrationData = response.data;

    // Transform data to separate tryouts and training entries if applicable
    // Assuming 'coach' or other properties can help distinguish categories
    const tryouts = registrationData.filter(item => item.status === 'Pending'); // Adjust filter criteria as needed
    const freeTraining = registrationData.filter(item => item.status !== 'Pending'); // Adjust based on your backend logic

    return {
      tryouts,
      freeTraining
    };
  } catch (error) {
    console.error('Error fetching registration data:', error);
    throw error; // Handle error in the calling component
  }
};
