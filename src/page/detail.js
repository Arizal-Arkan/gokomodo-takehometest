import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDetail } from "../services/api";
import Styled from 'styled-components';

const ContainerDetail = Styled.div `
    display: flex;
    column-gap: 25px;

    @media (max-width: 768px) {
        display: block;
      }
`

const ImageContainer = Styled.div `
    width: 200px;
    height: 240px;
    background: #fff;
    padding: 10px;
    border-radius: 8px;

    @media (max-width: 768px) {
        margin: auto;
      }
`
const Content = Styled.div `
    width: 100%;
    height: 220px;
    background: #fff;
    padding: 10px;
    border-radius: 8px;

    @media (max-width: 768px) {
        width: auto;
        margin-top: 100px;
        height: auto;
      }
`
const CoverContainer = Styled.div `
    background: #fff;
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
`

const Cover = Styled.div `
    display: flex; 
    flex-wrap: wrap;

    @media (max-width: 768px) {
       display: block;
      }
`

const CoverImage = Styled.div `
    width: 200px,
    height: 240px,
    background: #fff,
    padding: 10px,
    border-radius: 8px,
`

function Detail() {
  const params = useParams();
  const [isDetail, setDetail] = useState([]);

  useEffect(() => {
    GetDetail(params.id).then((item) => {
      setDetail(item?.data?.data?.results);
    });
  }, [params.id]);

  return (
    <div>
      {isDetail.map((val, i) => {
        const image = `${val.thumbnail.path}/portrait_incredible.${val.thumbnail.extension}`;
        return (
          <div key={i}>
            <ContainerDetail>
              <ImageContainer>
                <img
                  src={image}
                  alt="comic"
                  width="100%"
                  style={{ borderRadius: "8px" }}
                />
              </ImageContainer>

              <Content>
                <p style={{ textAlign: "center" }}>{val.title}</p>
                <p>Issue: {val.issueNumber}</p>
                <p>
                  Description:{" "}
                  {val?.description?.length <= 0 || val?.description === null
                    ? <p>No Desc</p>
                    : val.description}
                </p>
              </Content>
            </ContainerDetail>
            <CoverContainer
            >
              <p>Cover Collection</p>
              <Cover>
                {val.images.map((val, i) => {
                  const listImage = `${val.path}/portrait_incredible.${val.extension}`;
                  return (
                    <CoverImage>
                      <img
                        src={listImage}
                        alt="comic"
                        width="100%"
                        height={240}
                        style={{ borderRadius: "8px", objectFit: "cover" }}
                      />
                    </CoverImage>
                  );
                })}
              </Cover>
            </CoverContainer>
          </div>
        );
      })}
    </div>
  );
}

export default Detail;
