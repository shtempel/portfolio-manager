import React, { FC } from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './chart.scss';

export interface Chart {
    name: string;
    data: number[];
}

interface ChartProps {
    chartName: string;
    series: { name: string, data: number[] }[]
    chartType: any;
}

export const Chart: FC<ChartProps> = (props: ChartProps) => {
    const { chartName, series, chartType } = props;
    const options: Options = {
        chart: {
            type: chartType
        },
        yAxis: {
            title: {
                text: null
            }
        },
        title: {
            text: chartName
        },
        series: series as any
    };

    return (
        <div className='chart'>
            <HighchartsReact
                highcharts={ Highcharts }
                options={ options }/>
        </div>
    );
};
