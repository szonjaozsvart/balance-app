import jwt_decode from "jwt-decode";

async function adding(
  email,
  nickname,
  setErrorMessage,
  setShowError,
  navigate
) {
  try {
    const token = window.localStorage.getItem("token");
    const user_info = jwt_decode(token);
    const response = await fetch("http://localhost:8080/addPage", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
        their_email: email,
        my_email: user_info.email,
      }),
    });
    const data = await response.json();
    if (response.status === 500) {
      setShowError(true);
      setErrorMessage("This connection is already done!");
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
    setErrorMessage("Service unavailable, please try again later!");
  }
}

export default adding;
