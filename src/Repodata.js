import React ,{useEffect, useState} from "react"
import { styled } from '@mui/system';
import { Avatar, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { blue } from "@mui/material/colors";
import { Select, MenuItem } from '@mui/material';

import { useDispatch, useSelector } from "react-redux";
import { repoActions } from "../src/store";
import {useNavigate} from "react-router-dom"


const token='';





//console.log(token)
//styling...
const Container = styled('div')({
    height: '120px',
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)',
  
  },
  });
  
  const AvatarImage = styled(Avatar)({
    height: '80px',
    width: '80px',
    marginRight: '16px',
  });
  
  const RepoInfo = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  });
  
  const RepoName = styled(Typography)({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  });
  
  const Description = styled(Typography)({
    fontSize: '1rem',
    marginBottom: '8px',
    color: '#666',
  });
  
  const LastPushed = styled(Typography)({
    fontSize: '0.8rem',
    color: '#888',
  });
  
  const Owner = styled('b')({
    color: 'red',
    fontWeight: 'bold',
  });
  const Issues=styled('div')({
      color:'black'
  })

  //functions....
const Details = ({owner,repo}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [commits,setCommits]=useState([]);
  const dispatch=useDispatch();
  
  const handleChange = (event) => {
    
    setSelectedOption(event.target.value);

};
const fetchrepodetails = async () => {
  if (selectedOption) {
    let response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`,{
        headers: {
          Authorization: `Bearer ${token}`||null,
        },
      }
    );

    if (response.status === 202) {
      // Retry after a certain delay
      setTimeout(fetchrepodetails, 1000); // Retry after 1 second
      return;
    }

    let details = await response.json();
    console.log(details);
    dispatch(repoActions.addcurrentrepo(details)); 
  }
};

useEffect(()=>{

 fetchrepodetails();
 

},[selectedOption])

  return (
    <>
    <Select value={selectedOption} onChange={handleChange}>
      <MenuItem value="option1">Commits</MenuItem>
      <MenuItem value="option2">Addition</MenuItem>
      <MenuItem value="option3">Deletion</MenuItem>
      </Select>
      </>
  );
};
const StarContainer = styled('div')`
  display: flex;
  align-items: center;
`;

const AnimatedStar = styled(StarBorderIcon)`
  animation: pulse 1s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`
const StarWithCount = ({ count }) => {
  return (
    <StarContainer>
      <AnimatedStar color="primary" />
      <span>{count}</span>
    </StarContainer>
  );
};


const Repodata = (props) => {
  const navigate=useNavigate();
  const { url, reponame, description, stars, owner, time ,issues } = props;
  const dispatch=useDispatch();
const commits = useSelector((state) => state.repo.commits);

  let formattedTime = '';
  if (time) {
    formattedTime = time.split('T')[0];
  }
 
  const repoName = reponame.substring(reponame.indexOf('/') + 1);
  const openRepoHandler=(item)=>{
    navigate('/graphs',{state:{repoName,owner}})
}

  return (
    <>
    <Container onClick={openRepoHandler} style={{cursor:"pointer"}}>
      <AvatarImage src={url} alt="Repo Avatar" />
      <RepoInfo>
        <RepoName>{repoName}</RepoName>
        <Description>{description}</Description>
        <Typography><StarContainer>
      <AnimatedStar color="primary" />
      <span>{stars}</span>
      </StarContainer></Typography>
      <Issues>Issues Count:{issues}</Issues>
      </RepoInfo>
      <LastPushed>
        Last pushed on {formattedTime} by <Owner>{owner.toUpperCase()}</Owner>
      </LastPushed>
      
      </Container>
    </>
  );
};
export default Repodata;