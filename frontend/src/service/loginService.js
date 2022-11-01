async function login(email, password, setErrorMessage, setShowError, navigate) {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        setShowError(true);
        setErrorMessage(data.error);
        return;
      }
      window.localStorage.setItem('token', data.token);
      navigate('/landing');
      window.location.reload();
      return;
    } catch (err) {
      setShowError(true);
      setErrorMessage(err.message);
    }
  }
  
  export default login;
  