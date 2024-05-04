import { useEffect } from "react";
import { StandartButton } from "@ui/Atoms/Buttons";
import { BoundedContainer, ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { StandartLabel } from "@ui/Atoms/Labels";
import { SimpleWidget } from "@ui/Organisms/Widgets/SimpleWidget";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { H1, purpleMainColor } from "@ui/Tokens";

const dataPoints = [{ x: 'Модуль 1', y: 20 }, { x: 'Модуль 2', y: 40 }, { x: ' Модуль 3', y: 15 }, { x: 'Модуль 4', y: 60 }];

export const AnalyticsPage = (): JSX.Element => {
    const xNames = dataPoints.map(point => point.x);
    const yValues = dataPoints.map(point => point.y);
    console.log(xNames, yValues);
    
    useEffect(() => {
        const ctx = document.getElementById('analytics-chart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xNames,
                datasets: [{
                    label: 'Процент успеха прохождения',
                    data: yValues,
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
    }, []);

    return <>
        <WidgetWith2Items $transparent>
            <Left>
                <H1>Аналитика</H1>
            </Left>
            <Right>
                <ButtonRow>
                    <StandartLabel $bordered>
                        "Название проекта" + "автор"
                    </StandartLabel>
                    <StandartButton>Скачать</StandartButton>
                </ButtonRow>
            </Right>
        </WidgetWith2Items>
        <BoundedContainer>
            <SimpleWidget width="100%" height="500px" $bordered style={{ alignItems: "flex-start", padding: '20px' }}>
                <StandartLabel>Успешноть выполнения проекта: X%</StandartLabel>
                <StandartLabel>График выполнения проекта:</StandartLabel>
                    <SimpleWidget width="80%" height="80%">
                        <canvas id="analytics-chart" style={{ border: 'none' }}></canvas>
                    </SimpleWidget>
                <StandartLabel>Информация о проекте:</StandartLabel>
            </SimpleWidget>
        </BoundedContainer>
    </>;
};

export default AnalyticsPage;