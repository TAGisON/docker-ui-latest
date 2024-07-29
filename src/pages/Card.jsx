import React from 'react';
// import './Card.css';

const Card = ({ icon,title, children, activeTitle, stoppedTitle, active, stopped }) => {
  return (
    <div className="card">
      <span className="icon">{icon}</span>
      <span>{title}</span>
      <div className="card-content">
        {children}
      </div>
      <div className="card-footer">
        {active !== undefined && (
          <div className="status-box active">
            <span className="status-label">{activeTitle}</span>
            <span className="status-value">{active}</span>
          </div>
        )}
        {stopped !== undefined && (
          <div className="status-box stopped">
            <span className="status-label">{stoppedTitle}</span>
            <span className="status-value">{stopped}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
