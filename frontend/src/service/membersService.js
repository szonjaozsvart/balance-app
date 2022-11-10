async function membersData() {
  try {
    const response = await fetch('http://localhost:8080/landing');
    const data = await response.json();
    return data;
  } catch (err) {
    return 'Service unavailable, please try again later!';
  }
}

export default membersData;
