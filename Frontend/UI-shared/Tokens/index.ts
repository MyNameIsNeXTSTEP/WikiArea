import styled from "styled-components";

export enum EUserRoles {
  teacher = 'teachers',
  student = 'students',
  admin = 'admins'
};

export const purpleMainColor = 'rgb(193,158,224)';

export const Title = styled.h2<{ $white?: boolean }>`
    top: 0;
    margin-bottom: 20px;
    margin-left: 0;
    color: ${p => p.$white ? 'white' : purpleMainColor};
    font-size: 60;
    font-weight: 500;
`;

export const H1 = styled.h1<{ $white?: boolean, $underlined?: boolean}>`
    top: 0;
    margin-bottom: 20px;
    color: ${p => p.$white ? 'white' : purpleMainColor};
    font-size: xx-large;
    font-weight: 500;
    text-decoration: ${p => p.$underlined ? 'underline' : 'none'};
`;
