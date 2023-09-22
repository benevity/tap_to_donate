import styled from 'styled-components';
import { borderColor, SemiBold, whiteColor } from '../../styles';

export const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    background-color: ${whiteColor};
    border-bottom: 1px solid ${borderColor};
    &.transparent{
        background-color: transparent;
    }
    &.align-start{
        align-items: flex-start;
    }
    &.no-border{
        border: none;
    }
`

export const BackArrowWrapper = styled.div`
width: 24px;
height: 24px;
display: flex;
align-items: center;
justify-content: center;
opacity: 0.75;
cursor: pointer;
&:hover{
    opacity: 1;
    animation: back-arrow-anim 1s ease infinite;
}
`

export const HeaderLeftWrapper = styled.div`
flex: 1;
margin: 0 12px;
.title{
    font-family: 'Barlow', sans-serif;
    font-size: 18px;
    ${SemiBold};
    margin: 0;
}
`

export const HeaderActionsWrapper = styled.div`
display: flex;
align-items: center;
*:not(:last-child){
    margin-right: 8px;
}
`