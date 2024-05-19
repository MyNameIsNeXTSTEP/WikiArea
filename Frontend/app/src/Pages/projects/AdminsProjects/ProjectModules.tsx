import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import Menu from "@ui/Organisms/Menu";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsOpenProjectsModerationPage, setProjectDetailsPage, setStage } from "~/src/features/store/projects";
import { Arrow, File } from '@ui/assets/svg';
import { StandartButton } from "@ui/Atoms/Buttons";
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';
import { SimpleWidget } from '@ui/Organisms/Widgets/SimpleWidget';
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { BoundedContainer, ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { H1, Title } from "@ui/Tokens";
import { DropdownArrow, FileIcon, ImageBlock } from "@ui/Atoms/icons";
import { IModule, TFileForReq } from "~/src/a-lib";
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from "~/src/features/store/menu";

interface IProps {
    projectModule: IModule,
    openModuleTests: Dispatch<SetStateAction<Boolean>>,
}

const ProjectModules = ({ projectModule, openModuleTests }: IProps): JSX.Element => {
    const dispatch = useDispatch();
    const [isDropDownOpen, openDropDown] = useState(false);
    const downloadMaterial = async () => {
        // await new APIRequest(uploadFileRequest).doRequest();
        alert(1)
    };
    useEffect(() => {
        dispatch(updateMainMenuFlag(false));
        dispatch(changeBackBtnVisability(false));
    }, []);
    useEffect(() => {
        dispatch(updateButtons([{
            id: 1,
            onClick: () => {
                dispatch(setIsOpenProjectsModerationPage(false));
                dispatch(setProjectDetailsPage(false));
                dispatch(updateMainMenuFlag(true));
                dispatch(changeBackBtnVisability(true));
            },
        }]));
    }, []);

    return <>
        <WidgetWith2Items $rounded height='80px'>
            <Left><H1 $white>{projectModule && projectModule.name || 'Text'}</H1></Left>
            <Right>
                <ImageBlock style={{ marginTop: '10px' }}className="profile-block">
                    <DropdownArrow src={Arrow} flip={isDropDownOpen} onClick={() => openDropDown(!isDropDownOpen)}/>
                </ImageBlock>
            </Right>
        </WidgetWith2Items>
        { isDropDownOpen && <BoundedContainer>
            <SimpleWidget width='100%' height='auto' $bordered className='module-test'>
                <WidgetWith2Items $fullWidth $smallMargins $transparent>
                    <Left><Title>Материал</Title></Left>
                    <Right>
                        <StandartButton
                            className="download-button"
                            onClick={downloadMaterial}
                        >
                            Скачать
                        </StandartButton>
                    </Right>
                </WidgetWith2Items>
            </SimpleWidget>
        </BoundedContainer> }
    </>
};

export default ProjectModules;
