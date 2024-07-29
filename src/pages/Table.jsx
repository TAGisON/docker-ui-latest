import React from 'react';
// import './Table.css';

const Table = ({ columns, data }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.keys(row).map((key, i) => (
              <td key={i}>
                {key === 'Status' ? (
                  <span className={row[key] === 'running' ? 'status-box active status-label' : row[key] === 'stopped' || row[key] === 'exited' ? 'status-box stopped status-label' : ''}>
                    {row[key]}
                  </span>
                ) : (
                  row[key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
