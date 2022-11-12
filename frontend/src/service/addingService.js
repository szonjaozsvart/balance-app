async function adding(email, nickname, score, setErrorMessage, setShowError, navigate
    ) {
      try {
        const token = window.localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/addingPage', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            nickname: nickname,
            email : email,
            your_score: score,
            their_score: (100-score)
          }),
        });
        const data = await response.json();
        if(response.status === 501) {
          setShowError(true);
          setErrorMessage("This email is not valid or the connection is already done!");
          return;
        } else if (response.status !== 200) {
          setShowError(true);
          setErrorMessage("Something went wrong!");
          return;
        }
        navigate(`connections/${data.id}`);
        return;
      } catch (err) {
        setShowError(true);
        setErrorMessage('Service unavailable, please try again later!');
      }
    }
    
    export default adding;
    