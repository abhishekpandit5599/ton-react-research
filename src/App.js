import './App.css';
import { useEffect, useState } from 'react';
// import TonWeb from 'tonweb';
import {main} from "./logic";



function App() {

  const [data, setData] = useState("Abhi");
  useEffect(()=>{
    fun();
  },[])

  async function fun(){
    let data = await main();
    setData(data);
  }

  return (
    <div className="App">
      address =* {data}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
