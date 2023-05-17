import { Button } from "@mui/material";
import React, {useState, useEffect } from "react"
import {useLocation} from 'react-router-dom';
import ActivityChart from "./ActivityChart";
import ContributorChart from "./ContributorChart";

const Allgraphs=()=>{
    const [detail,setDetails]=useState([]);
    const [contributions,setContributors]=useState([]);
    const [toggle,setToggle]=useState(false);
const location=useLocation();
//console.log(location);

const fetchadddel=async()=>{
    if(!toggle)
    {
        let response = await fetch(
            `https://api.github.com/repos/${location.state.owner}/${location.state.repoName}/stats/commit_activity`
              
          );
      
          if (response.status === 202) {
            // Retry after a certain delay
            setTimeout(fetchadddel, 1000); // Retry after 1 second
            return;
          }
      
          let details = await response.json();
          setDetails(details);
     }
     else if(toggle)
     {
        let response = await fetch(
            `https://api.github.com/repos/${location.state.owner}/${location.state.repoName}/stats/contributors`
             
          );
      
          if (response.status === 202) {
            // Retry after a certain delay
            setTimeout(fetchadddel, 1000); // Retry after 1 second
            return;
          }
      
          let details = await response.json();
          console.log(details);
          setContributors(details)

     }
    
}
const toggleHandler=()=>{
    setToggle(prev=>!prev);
}

useEffect(()=>{
  fetchadddel();
},[location,toggle])

return(<div>{!toggle && <ActivityChart commits={detail}/>}
{toggle && <ContributorChart commits={contributions} />}
<Button onClick={toggleHandler} style={{align:"center"}}>{toggle?'See Commit':'See contributions'}</Button></div>)
}

export default Allgraphs;