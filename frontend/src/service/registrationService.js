async function register(firstName,lastName, email, password, setErrorMessage, setShowError, navigate
  ) {
    try {
      const response = await fetch('http://localhost:8080/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email : email,
          password: password
        }),
      });
      const data = await response.json();
      if(response.status === 501) {
        setShowError(true);
        setErrorMessage("This email already taken! Try another!");
        return;
      } else if (response.status !== 200) {
        setShowError(true);
        setErrorMessage("Something went wrong!");
        return;
      }
      navigate('/login');
      return;
    } catch (err) {
      setShowError(true);
      setErrorMessage('Service unavailable, please try again later!');
    }
  }
  
  export default register;
  