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
      <form action='http://localhost:3000/auth/google' method='get'>
        <button type='submit'>google login</button>
      </form>
    </div>
  );
};

export default Login;
