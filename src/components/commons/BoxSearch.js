import React, { useContext, useState } from "react";
import Styled from "styled-components";

//Context
import { AppContext } from '../../context/app-context'

//Icons
import { IoMdSearch } from "react-icons/io";

import { GetSearch, GetHeroes } from '../../services/api';

// Style

const BoxContainer = Styled.div`
    border-radius: 8px;
    background: #fff;
    padding: 20px;

    @media (max-width: 768px) {
      height: auto;
      width: auto;
    }
`;

const Button = Styled.button`
    padding: 12px 8px 12px 8px;
    outline: none;
    cursor: pointer;
    border-radius: 3px;
    background: #fe453b;
    border: none;
    color: #fff;
    margin-left: 15px;

    @media (max-width: 768px) {
      display: block;
      width: 100%;
      margin-top: 20px;
      margin-left: 0;
    }
`;

const TextContainer = Styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      display: block;
    }
`;

const TitleText = Styled.h1`
    color: #fe453b;
    margin: 0;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }

`;

const SubTitle = Styled.p`
    margin: 0;
    color: #b3b3b3;

    @media (max-width: 768px) {
      font-size: 14px;
      margin: 5px 0 20px 0;
    }
`;

const ActionContainer = Styled.div`
    display: flex;

    @media (max-width: 768px) {
      display: block;
    }
`;

const InputBox = Styled.input`
    border: none;
    outline: none;
`;

const InputContainer = Styled.div`
    border: 1px solid #f2f2f2;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    aligin-items: center;
    width: 200px;

    @media (max-width: 768px) {
      width: auto;
    }
`;

const Label = Styled.label `
    display: none;
`

const BoxSearch = () => {
  const context = useContext(AppContext)
  const [isInput, setInput] = useState("")

  const handleSearch = (e) => {
    setInput(e.target.value)
  }

  const clickSearch = () => {
    context.setLoading(true);
    console.log('execute');
    if (isInput.length > 0) {
      GetSearch(isInput)
      .then((item) => {
        context.setLoading(false);
        if (item.data.data.results.length > 0) {
          context.setData(item.data.data.results);
        } else {
          alert('Not Found')
          context.setData(JSON.parse(localStorage.getItem("dataUser")));
        }
      }) 
      .catch((err) => alert(err));
    } else {
      GetHeroes()
        .then((items) => {
          context.setLoading(false);
          context.setData(items?.data.data.results);
        })
        .catch((err) => alert(err));
    }
  }

  return (
    <BoxContainer>
      <TextContainer>
        <div>
          <TitleText>MARVEL COMIC</TitleText>
          <SubTitle>Find your favorite marvel comic here</SubTitle>
        </div>
        <ActionContainer>
          <InputContainer>
            <IoMdSearch color="red" />
            <Label htmlFor="Search">
                Search
            </Label>
            <InputBox
              onChange={handleSearch}
              type="text"
              id="Search"
              placeholder="Search by title"
              name="Search"
            />
          </InputContainer>
          <Button onClick={clickSearch}>
            SEARCH COMIC
          </Button>
        </ActionContainer>
      </TextContainer>
    </BoxContainer>
  );
};

export default React.memo(BoxSearch);
