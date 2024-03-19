import { useRef, useState } from 'react';
import * as ST from './styled';
import ProjectLogo from '~/src/assets/svg/ProjectSlug.svg';
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { Left, Right } from "~/src/UI-shared/Atoms/Containers";
import { ProjectImage } from '~/src/UI-shared/Atoms/icons';
import { StandartInput } from '~/src/UI-shared/Atoms/Inputs';
import { StandartLabel } from '~/src/UI-shared/Atoms/Labels';
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import { Title } from "~/src/UI-shared/Tokens";

const ProjectsPage = (): JSX.Element => {
    // test data
    const projectData = new Array(10).fill({
        author: 'Автор',
        title: 'Название',
        topic: 'Тема',
        complexity: 'Сложность',
        lifetime: 'Срок проекта',
        description: 'Описание проекта'
    });
    const [data, updateData] = useState(projectData);
    const searchRef = useRef<HTMLInputElement>(null);
    const filterRef = useRef<HTMLInputElement>(null);
    const debounce = (fn: Function, delay: number) => {
        let timeout: NodeJS.Timeout;
        return function () {
            const fnCall = () => fn.apply(this, arguments);
            clearTimeout(timeout);
            timeout = setTimeout(fnCall, delay)
        }
    };
    console.log(data)
    const doSearch = (e) => {
        const value = e.target?.value;
        const searchedData = projectData.filter((el: Record<string, string>) => {
            const keys = Object.keys(el);
            for (const key of keys) {
                if (el[key].toLowerCase().match(value.toLowerCase())) {
                    return true;
                }
                continue;
            };
            return false;
        });
        updateData(searchedData)
    };

    return <>
        <WidgetWith2Items $transparent>
            <Left width='auto'>
                <Title>Проекты</Title>
                <StandartInput onChange={debounce(doSearch, 300)} ref={searchRef} $bordered placeholder='Поиск'/>
                <StandartInput ref={filterRef} style={{ marginLeft: 20 }} $bordered placeholder='Фильтр'/>
            </Left>
            <Right>
                <StandartButton $width='180px'>Мои проекты</StandartButton>
            </Right>
        </WidgetWith2Items>
        {data.length
            ? data.map(el => <WidgetWith2Items $rounded height='100px'>
                <Left className="left">
                    <ST.ImageBlock className="profile-block">
                        <ProjectImage src={ProjectLogo} />
                    </ST.ImageBlock>
                    <ST.ProjectsData>
                        {Object.values(el).map((data: string) => <StandartLabel $white>{data}</StandartLabel>)}
                    </ST.ProjectsData>
                </Left>
                <Right className="right">
                    <StandartButton $whiteBordered $width={'180px'} className="subscribtion">Подписаться</StandartButton>
                    <StandartLabel style={{ marginLeft: 20 }}$white>Подписано:</StandartLabel>
                </Right>
            </WidgetWith2Items>
            )
            : "Совпадений не найдено"
        }
    </>
};

export default ProjectsPage;