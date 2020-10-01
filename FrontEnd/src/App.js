import React, {useState, useEffect, useRef} from 'react';
import Card from './Card';
import './App.css';
import Papa from 'papaparse';


function App() {

    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState({});


    const handleSearch = event => setSearch(event.target.value);

    //Custom hook for setInterval
    function useInterval(callback, delay) {
      const savedCallback = useRef();

      useEffect(() => {
        savedCallback.current = callback;
      }, [callback]);

      useEffect(() => {
        function tick() {
          savedCallback.current();
        }
        if (delay !== null) {
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
      }, [delay])
    }

    async function getData() {
      const response = await fetch('data/FallMentorData.csv');
      const reader = response.body.getReader();
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      const rows = results.data // array of objects
      setRows(rows);

    }

    async function getStatus() {
      await fetch("http://localhost:5000/getStatus")
        .then(response => response.json())
        .then(data => setStatus(data))
    }

    useEffect(() => {
      getData()
    }, [])
    
    useInterval(() => {
      getStatus();
    }, 3000);
    
    
    // for (const [, value] of rows.entries()) {
    //   console.log(status[value.Discord])
    //   if (status[value.Discord] === "online") {
    //     value['status'] = 'online';
    //   } else {
    //     value['status'] = 'offline';
    //   }
    // }

    // rows.sort((a,b) => {
    //   if (a.status === "online" && b.status === "offline") {
    //     return -1;
    //   } else if (a.status === "offline" && b.status === "online") {
    //     return 1;
    //   } else {
    //     return a.Name.localeCompare(b.Name);
    //   }
    // })

    const items = [];
    console.log(rows)
    for (const [, value] of rows.entries()) {
      if(search !== '') {
        if(value.Name.includes(search) || 
        value.Skills.includes(search) ||
        value.Discord.includes(search)) {
          items.push(<Card name={value.Name} organization={value.Organization} discord={value.Discord} 
            skills={value.Skills} status={value.status}/>);
        }
      } else {
        items.push(<Card name={value.Name} organization={value.Organization} discord={value.Discord}
          skills={value.Skills} status={value.status}/>);
      }
    }
    // const items = rows.map((obj) => 
    //   <Card name={obj.Name} discord={obj.Discord} skills={obj.Skills}/>)

    
    return(
      <div className={"app"}>
        <div>
        <h4>Search</h4>
        <input type="text" value={search} onChange={handleSearch}/>
        <h4>Skills</h4>
        <select value={search} onChange={handleSearch}>
          <option></option>
          <option value="Java">Java</option>
          <option value="C" >C</option>
          <option value="C++">C++</option>
          <option value="Android">Android</option>
          <option value="Javascript">Javascript</option>
        </select>
            <div className="grid-container">
              {items}
            </div>
        </div>
      </div>
    )

}

export default App;