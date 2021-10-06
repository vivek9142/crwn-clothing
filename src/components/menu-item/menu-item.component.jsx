import React from "react";
import { withRouter } from 'react-router-dom';

// import './menu-item.styles.scss';
import {MenuItemContainer,BackgroundImageContainer,ContentTitleContainer} from './menu-item.styles';

const MenuItem = ({title,imageUrl,size,history,linkUrl,match}) => (
    <MenuItemContainer size={size} onClick={()=>(history.push(`${match.url}${linkUrl}`))}>
            <BackgroundImageContainer imageUrl={imageUrl}>
            {/* style={{backgroundImage: `url(${imageUrl})`}}> */}
                <ContentTitleContainer>
                    <h1 className="title">{title.toUpperCase()}</h1>
                    <span className="subtitle">SHOP NOW</span>
                </ContentTitleContainer>
            </BackgroundImageContainer>
    </MenuItemContainer>
);

export default withRouter(MenuItem);