import styled, { css } from "styled-components";

const EasyButton = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 3px;
    margin: 5px;
    justify-content: center;
    background: transparent;
    
    ${(props) => props.primary && css`background: #5cb65c`}
    ${(props) => props.secondary && css`background: #62b1f6`}
    ${(props) => props.tertiary && css`background: #f40105`}
    ${(props) => props.large && css`width: 120px height: 35px`}
    ${(props) => props.medium && css`width: 100px height: 20px`}
    ${(props) => props.small && css`width: 40px`}`;

export default EasyButton;