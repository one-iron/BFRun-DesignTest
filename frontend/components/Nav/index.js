// external modules
import { useState } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

// internal modules
import Login from '../Login';

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [input, setInput] = useState('');

  // 화면 작아졌을 때, 오른쪽 상단 메뉴
  const dropDownMenu = () => {
    setShowMenu(!showMenu);
  };

  const removeDownMenu = () => {
    setShowMenu(false);
  };

  // 화면 작아졌을 때, searchBox
  const showSearchBox = () => {
    setSearchBox(true);
  };

  const hideSearchBox = () => {
    setSearchBox(false);
  };

  // 검색창
  const searchKeyword = (e) => {
    setInput(e.target.value);
  };

  const submitKeyword = (e) => {
    e.preventDefault();
    console.log(input);
    setInput('');

    // 검색한 것 useEffect, axios로
  };

  return (
    <NavWrap>
      <NavContainer>
        <NavLeft openSearchBox={searchBox}>
          <Link href="/">
            <a>
              <TitleText>BFRun</TitleText>
            </a>
          </Link>
        </NavLeft>
        <NavMiddle openSearchBox={searchBox}>
          {/* 600px 이하일 때, 클릭할 때 input창 보이게 */}
          <Under600Search onClick={showSearchBox} openSearchBox={searchBox}>
            <i className="fa fa-search" />
          </Under600Search>
          {/* 600px 이상일 때 */}
          <ArrowBack
            className="fa fa-arrow-left"
            openSearchBox={searchBox}
            onClick={hideSearchBox}
          />
          <SearchBox openSearchBox={searchBox} onSubmit={submitKeyword}>
            <SearchInput
              type="text"
              placeholder="검색어를 입력해주세요"
              value={input}
              onChange={searchKeyword}
            />
            <SearchButton type="submit" onClick={submitKeyword}>
              <i className="fa fa-search" />
            </SearchButton>
          </SearchBox>
        </NavMiddle>
        <RightContainer
          openSearchBox={searchBox}
          onMouseEnter={dropDownMenu}
          onMouseLeave={showMenu && removeDownMenu}
        >
          <RightMenu>
            MENU
            <i className="fa fa-caret-down" />
          </RightMenu>
          <NavRight isShow={showMenu} onMouseLeave={showMenu && removeDownMenu}>
            <RightContent>소개</RightContent>
            <RightContent>로드맵</RightContent>
            <Login />
          </NavRight>
        </RightContainer>
      </NavContainer>
    </NavWrap>
  );
};

export default Nav;

const NavWrap = styled.nav`
  width: 100%;
  position: fixed;
  background-color: white;
  z-index: 100;
  border-bottom: 1px solid #eeeeee;

  font-family: Nanum gothic;

  /* * {
    border: 1px solid red;
  } */
`;

const NavContainer = styled.div`
  width: 100vw;
  margin: 0 auto;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${(props) => props.theme.laptopM} {
    width: 90%;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 10vw;
  @media (max-width: 600px) {
    ${(props) =>
      props.openSearchBox &&
      css`
        display: none;
      `}
  }
`;

const TitleText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #b0ebbd;
  cursor: pointer;
`;

const NavMiddle = styled.div`
  width: 30vw;
  @media ${(props) => props.theme.tablet} {
    width: 300px;
  }

  @media (max-width: 600px) {
    width: 0px;
    padding: 0;

    ${(props) =>
      props.openSearchBox &&
      css`
        width: 100%;
        display: flex;
      `}
  }
`;

const Under600Search = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: block;
    font-size: 20px;

    ${(props) =>
      props.openSearchBox &&
      css`
        display: none;
      `}
  }
`;

const ArrowBack = styled.i`
  display: none;
  @media (max-width: 600px) {
    ${(props) =>
      props.openSearchBox &&
      css`
        display: inline-block;
        margin-right: 15px;
        margin-top: 3px;
        font-size: 20px;
      `}
  }
`;

const SearchBox = styled.form`
  border-radius: 5px;
  height: 40px;
  display: flex;
  align-items: center;
  box-shadow: 0.1em 0 0.5em rgba(0, 0, 0, 0.3);

  @media (max-width: 600px) {
    display: none;

    ${(props) =>
      props.openSearchBox &&
      css`
        display: flex;
        width: 300px;
      `}
  }
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 14px;
  padding-left: 20px;
  font-weight: 300;
`;

const SearchButton = styled.button`
  width: 30px;
  height: 28px;
  border: none;
  outline: none;
  background-color: transparent;
  padding-right: 20px;
  color: #b0ebbd;
  font-size: 16px;
`;

const RightContainer = styled.div`
  position: absolute;
  right: 10vw;
  @media ${(props) => props.theme.laptopS} {
    position: relative;
  }

  @media (max-width: 600px) {
    ${(props) =>
      props.openSearchBox &&
      css`
        display: none;
      `}
  }
`;

const RightMenu = styled.div`
  display: none;

  @media ${(props) => props.theme.laptopS} {
    display: block;
    position: sticky;
    cursor: pointer;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
    width: 80px;
    background-color: white;

    i {
      margin-left: 5px;
      font-size: 18px;
    }
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;

  @media ${(props) => props.theme.laptopS} {
    display: none;
    position: absolute;
    background-color: white;
    border: 1px solid black;
    border-top: none;
    border-radius: 5px;

    ${(props) =>
      props.isShow &&
      css`
        display: block;
        width: 80px;
        height: 95px;

        /* animation-name: down;
        animation-duration: 0.5s; */
      `}

    @keyframes down {
      from {
        height: 0;
      }
      to {
        height: 115px;
      }
    }
  }
`;

const RightContent = styled.div`
  padding: 0 5px;
  margin-left: 20px;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
  color: gray;
  @media ${(props) => props.theme.laptopS} {
    margin: 10px 5px;
    padding: 0;
    /* cursor: pointer; */
  }
`;
