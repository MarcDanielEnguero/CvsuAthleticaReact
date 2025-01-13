import React, { createContext, useState } from 'react';

const TrainingContext = createContext();

export const TrainingProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [coachSelection, setCoachSelection] = useState('');

  return (
    <TrainingContext.Provider value={{ formData, setFormData, coachSelection, setCoachSelection }}>
      {children}
    </TrainingContext.Provider>
  );
};

export default TrainingContext;
