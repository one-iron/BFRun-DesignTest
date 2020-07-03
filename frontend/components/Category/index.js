// external modules
import { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

// internal modules
// import LangToggle from './LangToggle';

const Category = (props) => {
  const [categorylist, setCategoryList] = useState();
  const [showCategory, setShowCategory] = useState(false);
  const categoryRef = useRef(null);
  const buttonRef = useRef(null);

  // 카테고리 불러오기
  useEffect(() => {
    const getCategoryList = `https://run.mocky.io/v3/2f576afd-91a7-45b7-864f-f24c7d9e6682`;
    axios.get(getCategoryList).then((res) => {
      setCategoryList([res.data]);
    });
  }, []);

  const toggleCategory = () => {
    if (showCategory) {
      setShowCategory(false);
    } else {
      setShowCategory(true);
    }
  };

  const clickedCategoryOutside = () => {
    useEffect(() => {
      const handleOutside = (e) => {
        if (
          !buttonRef.current.contains(e.target) &&
          categoryRef.current &&
          !categoryRef.current.contains(e.target)
        ) {
          setShowCategory(false);
        }
      };

      document.addEventListener('mousedown', handleOutside);
      return () => {
        document.removeEventListener('mousedown', handleOutside);
      };
    }, [categoryRef]);
  };

  const goToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  const { selected } = props;
  clickedCategoryOutside(categoryRef);

  // 작은 화면에서 카테고리 키면 검정색 배경으로 바뀌고, 큰 화면에서는 white로

  return (
    <>
      {/* 모바일일 때 나오는 아이콘 */}
      <InfoWrap>
        <InfoButton onClick={toggleCategory} ref={buttonRef}>
          <i className="fa fa-bars" />
        </InfoButton>
      </InfoWrap>

      {/* 카테고리 창 */}
      {categorylist && (
        <CategoryWrap isOpen={showCategory} ref={categoryRef}>
          <CategoryContainer>
            {/* <LangToggle /> */}
            <GroupContainer>
              <Title>🍿Contents</Title>
              <AllTags>
                {categorylist[0].content_types.map((type) => {
                  return (
                    <Tag
                      key={type.id}
                      id={type.id}
                      onClick={() => selected(type.name)}
                    >
                      {type.name}
                    </Tag>
                  );
                })}
              </AllTags>
            </GroupContainer>
            <GroupContainer>
              <Title>🌈FrontEnd</Title>
              <AllTags>
                {categorylist[0].frontend_stacks.map((type) => {
                  return (
                    <Tag
                      key={type.id}
                      id={type.id}
                      type={type}
                      // style={{ backgroundColor: type.color_code }}
                      onClick={() => selected(type.name)}
                    >
                      {type.name}
                    </Tag>
                  );
                })}
              </AllTags>
            </GroupContainer>
            <GroupContainer>
              <Title>🧳BackEnd</Title>
              <AllTags>
                {categorylist[0].backend_stacks.map((type) => {
                  return (
                    <Tag
                      key={type.id}
                      id={type.id}
                      // style={{ backgroundColor: type.color_code }}
                      onClick={() => selected(type.name)}
                    >
                      {type.name}
                    </Tag>
                  );
                })}
              </AllTags>
            </GroupContainer>
            <GroupContainer>
              <Title>👩🏻‍💻Developer</Title>
              <AllTags>
                {categorylist[0].general_stacks.map((type) => {
                  return (
                    <Tag
                      key={type.id}
                      id={type.id}
                      // style={{ backgroundColor: type.color_code }}
                      onClick={() => selected(type.name)}
                    >
                      {type.name}
                    </Tag>
                  );
                })}
              </AllTags>
            </GroupContainer>
            <GroupContainer>
              <Title>🏄🏼‍♀️Creator</Title>
              <AllTags>
                {categorylist[0].channels.map((type) => {
                  return (
                    <Tag
                      key={type.id}
                      id={type.id}
                      // style={{ backgroundColor: '#F80000' }}
                      onClick={() => selected(type.name)}
                    >
                      {type.name}
                    </Tag>
                  );
                })}
              </AllTags>
            </GroupContainer>
            <GroupContainer>
              <Title wecode>부트캠프를 찾고 계신다면?</Title>
              <WecodeImg src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/logo/logo_black.png" />
            </GroupContainer>
            <GoUp onClick={goToTop}>
              <i className="fa fa-arrow-up" />
            </GoUp>
          </CategoryContainer>
        </CategoryWrap>
      )}
    </>
  );
};

export default Category;

const InfoWrap = styled.section`
  display: none;

  @media ${(props) => props.theme.laptopM} {
    display: block;
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 50px;
    height: 50px;
    z-index: 50;
  }
`;

const InfoButton = styled.button`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: black;
  border-radius: 50px;
  outline: none;
  border: none;

  i {
    color: white;
    z-index: 99;
    font-size: 20px;
  }
`;

const CategoryWrap = styled.aside`
  display: block;

  @media ${(props) => props.theme.laptopM} {
    display: none;

    ${(props) =>
      props.isOpen &&
      css`
        display: block;
        position: fixed;
        z-index: 50;
        bottom: 80px;
        left: 20px;
        height: 400px;
        overflow-y: scroll;
        overflow-x: hidden;

        animation-name: slideUp;
        animation-duration: 0.3s;

        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: #b8b8b8;
        }
      `}

    @keyframes slideUp {
      from {
        bottom: 0px;
      }

      to {
        bottom: 80px;
      }
    }
  }
`;

const CategoryContainer = styled.div`
  width: 240px;

  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0.1em 0.1em 0.8em rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: #faf7f7;
  }
`;

const GroupContainer = styled.div`
  margin: 30px 0 30px 10px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: gray;

  ${(props) =>
    props.wecode &&
    css`
      font-size: 13px;
      font-weight: 400;
    `}
`;

const AllTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0px;
`;

const Tag = styled.div`
  background-color: white;
  border: 1px solid #eee;
  color: #333;
  font-size: 14px;
  /* border-radius: 10px; */
  border-radius: 3px;
  padding: 8px;
  font-weight: 700;
  margin: 5px 3px;
  cursor: pointer;
`;

const WecodeImg = styled.img`
  width: 100px;
  height: auto;
  margin-top: 15px;
`;

const GoUp = styled.div`
  margin: 0 20px 20px auto;
  cursor: pointer;
  background-color: black;
  color: white;
  font-size: 20px;
  height: 40px;
  width: 40px;
  border: 1px solid black;
  border-radius: 20px;
  text-align: center;
  line-height: 35px;

  @media ${(props) => props.theme.laptopM} {
    display: none;
  }
`;
