import styled from 'styled-components';
import {CustomButtonContainer} from '../custom-button/custom-button.styles';

export const ImgContainer = styled.div`
    width: 100%;
    height: 95%;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
`;

export const CollectionItemContainer = styled.div`
    width: 22vw;
    display: flex;
    flex-direction: column;
    height: 350px;
    align-items: center;
    position: relative;


    ${CustomButtonContainer}{
        width: 80%;
        opacity: 0.7;
        position: absolute;
        top: 255px;
        display: none;

        @media screen and (max-width:800px) {
            display:block;
            opacity:0.9;
            min-width:unset;
            padding:0 10px;
        }
    }

    &:hover{
        ${ImgContainer}{
          opacity: 0.8;
        }
        ${CustomButtonContainer}{
          opacity: 0.85;
          display: flex;
        }
      }

    @media screen and (max-width:800px) {
        width:40vw;

        &:hover{
            ${ImgContainer}{
              opacity: unset;
            }
            ${CustomButtonContainer}{
              opacity: unset;
            }
          }

    }
`;

export const CollectionFooterContainer = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  
    .name {
        width: 90%;
        margin-bottom: 15px;
    }
  
    .price {
        width: 10%;
    }
`;