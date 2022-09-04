import React, { useContext } from "react";
import Styled, { keyframes } from "styled-components";
import { DateTime as dt } from "luxon";
import { useNavigate } from 'react-router-dom';

//context
import { AppContext } from "../../context/app-context";

// Styled
const CardContainer = Styled.div`
    display: flex;
    margin-top: 30px;
    height: auto;
    overflow: scroll;
    column-gap: 20px;

    @media (max-width: 768px) {
      display: block;
      overflow: hidden;
    }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loading = Styled.div`
    width: 2rem;
    height: 2rem;
    margin: auto;
    border: 5px solid #f3f3f3;
    border-top: 6px solid #ff0000;
    border-radius: 100%;
    animation: ${rotate} 1s infinite linear;
`;

const CardList = Styled.article.attrs(() => ({}))`
    border-radius: 5px;
    background: #fff;
    cursor:pointer;

    @media (max-width: 768px) {
      height: auto;
      margin-bottom: 20px;
    }

    .card-title {
      div {
        padding: 15px;
        font-size: 16px;
        font-weight: 500;
        white-space: nowrap; 
        width: 170px; 
        overflow: hidden;
        text-overflow: ellipsis; 
    }
    }

    .card-line {
        border: 1px solid #cdcdcd;
        margin: 0;
    }

    .card-content {
        padding: 25px;
        text-align: center;

        p {
            margin-top: 20px;
            margin-bottom: 0;
            color: #c1c1c1;
            font-size: 14px;
        }
    }
`;

const CardContent = () => {
  const context = useContext(AppContext);
  const nav = useNavigate();

  const handleDetail = (id) => {
    nav(`/detail/${id}`)
  }

  return (
    <CardContainer>
      {context?.displayToUser?.length && !context.loading ? (
        context?.displayToUser.map((val, i) => {
            const date = dt.fromISO(val.modified).toFormat("yyyy LLL dd");
            const image = `${val.thumbnail.path}/portrait_incredible.${val.thumbnail.extension}`;
            return (
              <CardList key={i} onClick={() => handleDetail(val.id)}>
                <div className="card-title">
                  <div>{val.title}</div>
                </div>
                <hr className="card-line" />
                <div className="card-content">
                  <img width="100%" src={image} alt="marvel" style={{ borderRadius: '8px' }} /> 
                  <p><i>Release Date: </i> {date}</p>        
                </div>
              </CardList>
            );
          })
      ) : (
        <Loading />
      )}
    </CardContainer>
  );
};

export default React.memo(CardContent);
