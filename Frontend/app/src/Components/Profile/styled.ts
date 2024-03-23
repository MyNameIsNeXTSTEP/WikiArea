import styled from "styled-components";
import { Wrapper } from "~/src/UI-shared/Organisms/Widgets/styled";
export { ProfileImage, EyeIcon } from "~/src/UI-shared/Atoms/icons";
import { StandartInput } from '~/src/UI-shared/Atoms/Inputs';
import { purpleMainColor } from "~/src/UI-shared/Tokens";

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