import React from 'react';

const Card = ({ title, children, activeTitle, stoppedTitle, active, stopped }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-content">
        {children}
      </div>
      <div className="card-footer">
        {active !== undefined && (
          <div className="status-box active status-label">
            <span>{activeTitle} : {active}</span>
          </div>
        )}
        {stopped !== undefined && (
          <div className="status-box stopped status-label">
            <span>{stoppedTitle} : {stopped}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
