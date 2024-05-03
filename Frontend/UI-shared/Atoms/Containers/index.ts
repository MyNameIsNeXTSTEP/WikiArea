import styled from "styled-components";

/**
 * For the atoms to work inside a container need to use styles at top-level:
 *  {
 *      display: flex;
 *      justify-content: space-between;
 *  }
 */
export const Left = styled.span<{ width?: string, height?: string }>`
    position: relative;
    float: left;
    margin-left: auto;
    width: ${p => p.width ?? 'fit-content'};
    height: ${p => p.height ?? 'auto'};
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

export const ButtonRow = styled.span<{ width?: string }>`
    display: flex;
    width: ${p => p.width ?? 'fit-content'};
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
`;

export const BoundedContainer = styled.div`
  position: relative;
  display: flex;
  height: auto;
  width: 80%;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
`;