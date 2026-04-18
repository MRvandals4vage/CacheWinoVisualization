import React from 'react';

interface ProblemCardProps {
  icon: string;
  title: string;
  description: React.ReactNode;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ icon, title, description }) => {
  return (
    <div className="problem-card">
      <div className="problem-card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ProblemCard;
