import { StandartButton } from "@ui/Atoms/Buttons";
import { BoundedContainer, ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { StandartLabel } from "@ui/Atoms/Labels";
import { SimpleWidget } from "@ui/Organisms/Widgets/SimpleWidget";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { H1, purpleMainColor } from "@ui/Tokens";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface IProps {
    teacherEmail?: string,
};

type TProjectAnalytics = {
    moduleTitle: string,
    taskPoint: number | null,
    testPoint: number | null,
};

const PopularityChart = (): JSX.Element => {
    const popular = useSelector(state => state.pages.analytics.popular);
    const [projectAnalytics, setProjectAnalytics] = useState([] as TProjectAnalytics[]);
    console.log(popular);

    const data = {
        labels: popular.map(el => el.name),
        datasets: [{
            label: 'Количество подписок на проект',
            data: popular.map(el => el.subscriptions),
            backgroundColor: 'rgb(220,158,224)',
        }]
    };

    useEffect(() => {
        const ctx = document.getElementById('analytics-chart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                scales: {
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
                <ButtonRow>
                    <StandartButton>Скачать</StandartButton>
                </ButtonRow>
            </Left>
        </WidgetWith2Items>
        <BoundedContainer>
            <SimpleWidget width="100%" height="70vh" $bordered style={{ alignItems: "flex-start", padding: '20px' }}>
                <SimpleWidget width="80%" height="80%">
                    <canvas id="analytics-chart" style={{ border: 'none' }}></canvas>
                </SimpleWidget>
            </SimpleWidget>
        </BoundedContainer>
    </>;
}

export default PopularityChart;
