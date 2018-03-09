
export class ChartConfig {
    type: string;
    data: ChartData;
    options: ChartOptions | any;
}

export class ChartData {
    labels: string[];
    datasets: ChartDataSets[];
}

export class ChartDataSets {
    label: string;
    data: number[] | any[];
}

export class ChartOptions {
    title: any;
    tooltips: any;
    hover: any;
}
