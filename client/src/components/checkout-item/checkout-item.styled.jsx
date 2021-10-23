import styled,{css} from "styled-components";

const CheckoutItemEntity = css`
    width: 23%;
`;
export const CheckoutItemContainer = styled.div`
    width: 100%;
    display: flex;
    min-height: 100px;
    border-bottom: 1px solid darkgrey;
    padding: 15px 0;
    font-size: 20px;
    align-items: center;
`;

export const ImgContainer = styled.div`
    width: 23%;
    padding-right: 15px;
    
    img {
        width: 100%;
        height: 100%;
      }
`;

export const CheckoutItemSubItem = styled.span`
    ${CheckoutItemEntity}
`;

export const QuantityContainer = styled.span`
    ${CheckoutItemEntity}
    display: flex;

    .arrow{
        cursor: pointer;
      }

      .value{
        margin: 0 10px;
    }
`;

export const RemoveItemContainer = styled.span`
    padding-left: 12px;
    cursor: pointer;
`;

