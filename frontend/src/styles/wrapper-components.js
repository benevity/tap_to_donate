import styled from 'styled-components';
import {Medium, Regular, SemiBold} from './font-weights';
import {borderColor,whiteColor, themeColor} from "./colors"

export const CenterWrapper = styled.div`
position:absolute;
top:10%;
left:calc(50% - 400px);
justify-content:center;
`
export const ButtonsWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 24px;
button:not(:last-of-type){
    margin-right: 8px;
}
`
export const Layout = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
`

export const FlexedContainer = styled.div`
flex: 1;
overflow: hidden;
`

export const TabContentWrapper = styled.div`
height: 100%;
display: flex;
`

export const TabsWrapper = styled.div`
height: 100%;
width: 240px;
background-color: ${themeColor};
display: flex;
flex-direction: column;
padding: 12px 0 0 12px;
`

export const Tab = styled.div`
min-height: 40px;
padding: 0 24px;
background-color: transparent;
border-radius: 18px 0 0 18px;
line-height: 40px;
font-size: 14px;
${Regular};
color: ${whiteColor};
cursor: pointer;
&:not(.active){
    opacity: 0.75
}
&:hover{
    opacity: 1;
    &:not(.active){
        background-color: rgba(25,56,139, 1);
    }
}
&.active{
    background-color: ${whiteColor};
    color: ${themeColor};
    ${Medium}
}
`

export const TabContentHolder = styled.div`
flex: 1;
overflow: hidden;
background-color: ${whiteColor};
`

export const TabContent = styled.div`
height: 100%;
overflow: auto;
display: flex;
flex-direction: column;
padding: 24px;
`

export const DialogWrapper = styled.div`
width: 100vw;
height: 100vh;
background: rgba(0,0,0,0.5);
backdrop-filter: blur(5px);
display: flex;
align-items: center;
justify-content: center;
position: fixed;
top: 0;
left: 0;
z-index: 20;
`

export const DialogContainer = styled.div`
min-width: 1200px;
width: 40vw;
background-color: ${whiteColor};
border-radius: 6px;
box-shadow: 0 0 10px rgba(0,0,0,0.15);
overflow: hidden;
`

export const DialogHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 24px;
border-bottom: 1px solid ${borderColor};
`

export const DialogTitle = styled.h3`
font-size: 18px;
${SemiBold};
color: ${themeColor};
margin: 0;
`

export const CloseDialog = styled.span`
opacity: 0.75;
cursor: pointer;
&:hover{
    opacity: 1;
}
`

export const DialogContentWrapper = styled.div`
&.form-wrapper{
    .form-content{
        padding: 24px;
        min-height: 200px;
        max-height: 70vh;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    .form-footer{
        padding: 16px 24px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-top: 1px solid ${borderColor};    
    }    
}
`