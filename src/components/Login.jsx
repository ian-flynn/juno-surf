import React from 'react';
const googleOAuthBox = {
  position: 'absolute',
  backgroundColor: 'red',
  top: '100px',
};
const Login = ({ menuOpen }) => {
  return (
    <div
      style={{
        display: menuOpen ? 'block' : 'none',
      }}
    >
      google login here
    </div>
  );
};

export default Login;
