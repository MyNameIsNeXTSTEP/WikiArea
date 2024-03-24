import { useEffect } from "react";
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { BoundedContainer, ButtonRow, Left, Right } from "~/src/UI-shared/Atoms/Containers";
import { StandartLabel } from "~/src/UI-shared/Atoms/Labels";
import { SimpleWidget } from "~/src/UI-shared/Organisms/Widgets/SimpleWidget";
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import { H1, purpleMainColor } from "~/src/UI-shared/Tokens";

export const AnalyticsPage = (): JSX.Element => {
    const dataPoints = [{ x: 1, y: 20 }, { x: 2, y: 40 }, { x: 3, y: 15 }, { x: 4, y: 60 }];
    useEffect(() => {
        const ctx = document.getElementById('analytics-chart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Процент успеха прохождения',
                    data: dataPoints,
                    borderColor: purpleMainColor,
                    borderWidth: 2,
                    fill: false, // Specify if the area under the line should be filled
                    tension: 0 // This makes the line straight (a "broken" line)
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
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
                    <StandartButton
                        $bordered
                        $white
                        $width={'200px'}
                    >
                        Название проекта
                    </StandartButton>
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