import React, { useEffect, useState, useRef } from "react";
import Repodata from "./Repodata";
import { repoActions } from "../src/store";
import { useDispatch, useSelector } from "react-redux";

const Repo = (props) => {
  const [currPage, setCurrPage] = useState(1);
  const [date, setDate] = useState("2017-11-22");
  const dispatch = useDispatch();
  const listinnerRef = useRef();
  const repos = useSelector((state) => state.repo.repos);
  const cachedRepos = useRef([]);

  const fetchData = async () => {
    dispatch(repoActions.emptyrepo());

    let currentPage = currPage;

    if (currPage === 1) {
      setCurrPage(1);
    } else {
      currentPage = currPage + 1;
      setCurrPage(currentPage);
    }

    let url = `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${currentPage}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      // Check if fetched repositories already exist in the cache
      const newRepos = data.items.filter(
        (item) => !cachedRepos.current.includes(item.id)
      );
       
      // Update the cache with the newly fetched repositories
      cachedRepos.current = [...cachedRepos.current, ...newRepos.map((item) => item.id)];

      dispatch(repoActions.addrepo([...repos, ...newRepos]));
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  const onScroll = () => {
    if (listinnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listinnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        fetchData();
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currPage]);

  const changeHandler = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;

    if (selectedValue === "Last week") {
      setDate("2017-11-15");
    } else if (selectedValue === "Last Two weeks") {
      setDate("2017-11-8");
    } else {
      setDate("2017-11-22");
    }

    // Reset the cached repositories when the timeline option changes
    cachedRepos.current = [];
  };

  return (
    <>
      <div style={{ align: "center" }}>
        <form onChange={changeHandler}>
          <select>
            <option>Month</option>
            <option>Last week</option>
            <option>Last Two weeks</option>
          </select>
        </form>
        <div
          onScroll={onScroll}
          ref={listinnerRef}
          style={{ height: "50vh", overflowY: "auto" }}
        >
          {repos &&
            repos.map((item) => (
              <Repodata
                url={item.owner.avatar_url}
                time={item.updated_at}
                reponame={item.full_name}
                owner={item.owner.login}
                stars={item.stargazers_count}
                issues={item.open_issues_count}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Repo;
