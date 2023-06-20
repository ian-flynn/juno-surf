import React from 'react';
const googleOAuthBox = {
  position: 'absolute',
  backgroundColor: 'red',
  top: '100px',
};
const Login = ({ menuOpen }) => {
  const googleLogin = () => {};
  return (
    <div
      style={{
        display: menuOpen ? 'block' : 'none',
      }}
    >
      <button>google login</button>
    </div>
  );
};

export default Login;
