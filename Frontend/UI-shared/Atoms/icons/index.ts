import styled, { css } from "styled-components";

export const ImageBlock = styled.div<{ $abs?: boolean, width?: string }>`
    display: flex;
    position: ${p => p.$abs && 'absolute'};
    width: ${p => p.width ?? '60px'};
    margin-right: 20px;
    align-self: flex-start;
`;

export const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  margin: 5px;
  border-radius: 50px;
  text-align: center;
  cursor: pointer;
`;

export const EyeIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  align-self: center;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
`;

export const ProjectImage = styled.img`
  align-self: center;
  width: 100%;
  cursor: pointer;
`;

export const DropdownArrow = styled.img<{ flip?: boolean}>`
  align-self: center;
  width: 40px;
  cursor: pointer;
  transform: ${p => p.flip && css`rotate(180deg)`};
`;

export const FileIcon = styled.img`
  align-self: center;
  width: 40px;
`;

export const BackMenuBtn = styled.img`
  align-self: center;
  width: 60px;
  cursor: pointer;
  margin: 5px;
`;