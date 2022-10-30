import React, { useEffect, useState } from 'react'

function App() {
const [backendData, setBackendData] = useState([{}]);

useEffect(() => {
  fetch("/connect").then(
    response => response.json()
  ).then(
    data => {
      setBackendData(data)
    }
  )
}, [])

  return (
    <div>
      {(typeof backendData.messages === 'undefined') ? (
        <p>Wait..it is loading!</p>
      ) : (
        backendData.messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))
      )}
    </div>
  )
}

export default App