import React from 'react';

const Loader = ({ loading }) => {
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh", // Adjust height as needed
          position: "fixed",
          top: 0,
          left: 0,
          background: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          zIndex: 9999 // Ensure it's above other elements
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "5px solid #ffffff", // White border
            borderTop: "5px solid #00ff00", // Green border (adjust color as needed)
            animation: "spin 1s linear infinite" // CSS animation for spinning
          }}
        ></div>
      </div>
    );
  } else {
    return null;
  }
};

export default Loader;
