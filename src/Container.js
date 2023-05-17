
import React, { useState } from 'react';
import { styled } from '@mui/system';
import Repo from './Repo';

const CenteredHeading = styled('h1')`
  text-align: center;
  background: linear-gradient(to left, yellow 20%, black 20%);
  color: white;
  display: flex;
  justify-content: flex-end;
  padding-right: 124px;
  top:0;

  @media (max-width: 768px) {
    animation: blackBackground 0.3s forwards;
  }
  
  @keyframes blackBackground {
    from {
      background-color: yellow;
      color: white;
    }
    to {
      background-color: black;
      color: white;
    }
  
`;

const Container = () => {
  const [selector, setSelector] = useState(null);

  return (
    <>
      <CenteredHeading>most <span style={{ fontSize: '1.5em' }}>STARRED</span> repos <span style={{ fontSize: '1.06em' ,color:"Black" }}>github</span></CenteredHeading>
      <h6>Choose Time</h6>
      <Repo duration={selector} />
    </>
  );
};

export default Container;
