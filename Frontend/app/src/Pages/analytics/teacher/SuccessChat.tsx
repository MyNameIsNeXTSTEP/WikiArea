import { BoundedContainer, ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { StandartLabel } from "@ui/Atoms/Labels";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { purpleMainColor } from "@ui/Tokens";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StandartButton } from "@ui/Atoms/Buttons";
import { SimpleWidget } from "@ui/Organisms/Widgets/SimpleWidget";

const SuccessChart = (): JSX.Element => {
    const succesfulProject = useSelector(state => state.pages.analytics.successful);
    const [isOpenProjectsSelector, setIsOpenProjectsSelector] = useState(false);

    const overallProgress = succesfulProject.reduce((acc, curr) => acc + Number(curr.avg_total_points), 0) / succesfulProject.length;
    const projectDetails = useMemo(() => succesfulProject[0] || {
        project_name: '',
        project_desc: '',
        author: '',
    }, []);
 
    useEffect(() => {
        const ctx = document.getElementById('analytics-chart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: succesfulProject.map(prModule => prModule.module_title),
                datasets: [{
                    label: 'Процент успеха прохождения',
                    data: succesfulProject.map(prModule => Number(prModule.avg_total_points)),
                    borderColor: purpleMainColor,
                    borderWidth: 2,
                    fill: false, // Specify if the area under the line should be filled
                    tension: 0 // This makes the line straight (a "broken" line)
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'category',
                        position: 'bottom'
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        return () => myChart.destroy();
    }, [succesfulProject]);

    return <>
        <WidgetWith2Items $transparent>
            <Left>
                <ButtonRow>
                    <StandartLabel
                        $bordered
                        onClick={() => setIsOpenProjectsSelector(!isOpenProjectsSelector)}
                        style={{ width: '300px', cursor: 'pointer' }}
                    >
                        { projectDetails.project_name }
                    </StandartLabel>
                    <StandartButton>Скачать</StandartButton>
                </ButtonRow>
            </Left>
        </WidgetWith2Items>
        <BoundedContainer>
            <SimpleWidget width="100%" height="650px" $bordered style={{ alignItems: "flex-start", paddingLeft: '40px', paddingBottom: '60px' }}>
                <StandartLabel>Успешноть выполнения проекта: {overallProgress}%</StandartLabel>
                <StandartLabel>График выполнения проекта</StandartLabel>
                    <SimpleWidget width="80%" height="60%">
                        <canvas id="analytics-chart" style={{ border: 'none' }}></canvas>
                    </SimpleWidget>
                <StandartLabel
                    style={{ textAlign: 'start'}}
                >
                    Информация о проекте:<br/>
                    Название: {projectDetails.project_name || 'Без названия'}<br/>
                    Описание: {projectDetails.project_desc || 'Без описания'}<br/>
                    Автор: {projectDetails.author || 'Автор не указан'}
                </StandartLabel>
            </SimpleWidget>
        </BoundedContainer>
    </>;
};

export default SuccessChart;
