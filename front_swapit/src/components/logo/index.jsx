import React from "react";
import styled from "styled-components";
import GreenlandLogoImg from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 300px;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.h2`
  font-size: 16px;
  margin: 0;
  margin-left: 4px;
  color: #222;
  font-weight: 500;
`;

export function Logo(props) {
  return (
    <LogoWrapper>
      <LogoImg>
      <Link to="/">
      <img src={GreenlandLogoImg} alt="Greenland logo" />
        </Link>
      </LogoImg>
      <LogoText></LogoText>
    </LogoWrapper>
  );
}
