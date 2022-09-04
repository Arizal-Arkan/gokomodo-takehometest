import React from "react";
import Styled from "styled-components";
import Marvel from '../../img/Marvel_Logo.svg'

//Style

const Head = Styled.header`
    display: flex;
    justify-content: center;
    padding: 10px;
`;

const LogoContain = Styled.div`
    display: flex;
`

function Header() {
  return (
    <Head>
      <LogoContain>
        <img
          height={30}
          width={150}
          src={Marvel}
          alt="marvel"
        />
      </LogoContain>
    </Head>
  );
}

export default React.memo(Header);
