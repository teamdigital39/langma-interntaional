import API_BASE from "../../config.js";
import React from 'react'
import { useEffect, useState } from 'react'

function Test1() {
const [apidata, setApiData] = useState(null);
    
 useEffect(() => {
    const fetchData = async () => {
        try{
            const res = await fetch(`${API_BASE}/api/home`);
            const data = await res.json();
            setApiData(data);
            
        } catch (error) {
            console.log(error)
        }
    }

fetchData();
    }, [])

  return (
   
    <div>
      <div>
        {
  apidata?.sliders?.map((item) => (
    <img
      key={item.id}
      src={item.image}
      alt={item.title}
      className="w-40"
    />
  ))
}
      </div>
    </div>
  )
}

export default Test1
