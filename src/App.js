import axios from 'axios'
import React from 'react'
import Navigation from './components/Navigation'


function App() {
  // React.useEffect(() => {
  //   getroute()
  // })
  // const getroute = async () => {
  //   axios.get('http://localhost:8080/catalyzer/blogs',).then(res => console.log('result', res.data)).catch(error => console.log('res error', error.message))
  // }
  return (
    <Navigation />
  );
}

export default App;
