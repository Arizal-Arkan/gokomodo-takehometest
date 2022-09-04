import React, { useEffect, useState, useCallback } from "react";
import Styled from "styled-components";
import { GrNext, GrPrevious } from "react-icons/gr";

// Fetch
import { GetHeroes } from "../services/api";

//Context
import { AppContext } from "../context/app-context";

// Components
import BoxContainer from "../components/commons/BoxSearch";
import CardContent from "../components/commons/CardContent";

//Style
const ButtonPagination = Styled.button`
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
  margin: 0 10px 0 10px;
`;

const ButtonContainer = Styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 40px;
`;

export default function Home() {
  const [isData, setData] = useState([]);
  const [isPage, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  // Pagination Logic
  const userPerPage = 5;
  const startIndex = isPage * userPerPage;
  const lastIndex = startIndex + userPerPage;

  const displayToUser = isData.slice(startIndex, lastIndex);

  useEffect(() => {
    /* this flow control is for preventing data change after reload */
    if (localStorage.getItem("dataUser") === null) {
      GetHeroes()
        .then((items) => {
          localStorage.setItem(
            "dataUser",
            JSON.stringify(items?.data.data.results)
          );
          setData(items?.data.data.results);
        })
        .catch((err) => alert(err));
    } else {
      setData(JSON.parse(localStorage.getItem("dataUser")));
    }
  }, []);

  const handleNext = useCallback(() => {
    setPage(isPage + 1);
  }, [isPage]);

  const handlePrev = useCallback(() => {
    setPage(isPage - 1);
  }, [isPage]);

  // inject several parent data to child component
  const contextValue = {
    displayToUser,
    setData,
    loading,
    setLoading
  };

  return (
    <div>
      <AppContext.Provider value={contextValue}>
        <BoxContainer />
        <CardContent />
        <ButtonContainer>
          <ButtonPagination
            disabled={isPage === 0 || isData.length > 0}
            onClick={handlePrev}
          >
            <GrPrevious color="#cdcdcd" /> Previousous Page
          </ButtonPagination>
          <ButtonPagination
            disabled={
              lastIndex === isData.length ||
              !Object.keys(isData).length > 0
            }
            onClick={handleNext}
          >
            Next Page <GrNext color="#cdcdcd" />
          </ButtonPagination>
        </ButtonContainer>
      </AppContext.Provider>
    </div>
  );
}
