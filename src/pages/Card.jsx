import React from 'react';

const Card = ({ icon, title, children, activeTitle, stoppedTitle, active, stopped }) => {
  return (
    <div className="card">
      <div style={{display:"flex"}}>
        <h3 style={{fontSize:"40px"}}>{icon}</h3>
        <h3 style={{fontSize:"2rem"}}>{title}</h3>
      </div>
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
