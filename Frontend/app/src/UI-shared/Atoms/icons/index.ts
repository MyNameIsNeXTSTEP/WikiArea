import styled from "styled-components";

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
`;