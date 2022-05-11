import React from 'react'
import Navigation from './components/Navigation'
import {DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
require('dotenv').config()

function App() {
 
  // React.useEffect(() => {
  //   getroute()
  // })
  // const getroute = async () => {
  //   axios.get('http://localhost:8080/catalyzer/blogs',).then(res => console.log('result', res.data)).catch(error => console.log('res error', error.message))
  // }
  return (
    <DndProvider backend={HTML5Backend}>
      <Navigation />
    </DndProvider>
  );
}

export default App;
