import styled, {css} from "styled-components";

const TrafficLight = styled.View`
border-radius: 50px;
width: 10px;
height: 10px;
padding: 10px;

    ${(props) => props.available && css`background: #00FF00`}
    ${(props) => props.limited && css`background: #dde033`}
    ${(props) => props.unavailable && css`background: #ec241a`}`;

export default TrafficLight;