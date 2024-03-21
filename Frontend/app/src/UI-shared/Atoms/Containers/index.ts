import styled from "styled-components";

/**
 * For the atoms to work inside a container need to use styles at top-level:
 *  {
 *      display: flex;
 *      justify-content: space-between;
 *  }
 */
export const Left = styled.span<{ width?: string }>`
    position: relative;
    float: left;
    margin-left: auto;
    width: ${p => p.width ?? 'fit-content'};
    margin-left: 20px;
`;

export const Right = styled.span<{ width?: string }>`
    position: relative;
    float: right;
    width: ${p => p.width ?? 'fit-content'};
    margin-right: 20px;
    @media (max-width: 450px) {
        float: none;
    }
`;

export const ButtonRow = styled.span`
    display: flex;
    width: fit-content;
    flex-direction: row;
`;