import styled from "styled-components";

/**
 * For the atoms to work inside a container need to use styles at top-level:
 *  {
 *      display: flex;
 *      justify-content: space-between;
 *  }
 */
export const Left = styled.span`
    position: relative;
    float: left;
    margin-left: auto;
    width: fit-content;
    margin-left: 20px;
`;

export const Right = styled.span`
    position: relative;
    float: right;
    width: fit-content;
    margin-right: 20px;
`;

export const ButtonRow = styled.span`
    display: flex;
    width: fit-content;
    flex-direction: row;
`;