import styled from 'styled-components';
import { purpleMainColor } from '~/src/UI-shared/Tokens';

export const PageContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${purpleMainColor};
`;