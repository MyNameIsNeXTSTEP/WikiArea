import styled from "styled-components";
import { Wrapper } from "@ui/Organisms/Widgets/styled";
export { ProfileImage, EyeIcon } from "@ui/Atoms/icons";
import { StandartInput } from '@ui/Atoms/Inputs';
import { purpleMainColor } from "@ui/Tokens";

export const ProfileBlock = styled.div`
  display: inline;
  width: 100px;
  height: fit-content;
`;

export const ProfilControlWidgets = styled(Wrapper)`
  height: auto;
`;

export const Input = styled(StandartInput)`
  border-radius: 15px;
  height: 30px;
  width: 80%;
`;

export const InputWithIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
  width: 80%;
  height: 30px;
  border-radius: 15px;
  background-color: white;
  text-decoration: none;
  border: 2px solid ${purpleMainColor};
  padding-left: 5px;
  margin-bottom: 14px;
`;