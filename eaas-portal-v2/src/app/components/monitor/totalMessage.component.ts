import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgStyle } from '@angular/common';
import { TrendMessage, Colors, TotalProcessedMessage } from '../../entities/monitor/statistic';
import * as moment from 'moment';
import { MessageColorPipe } from '../../pipes/messageColor.pipe';

@Component({
    selector:'total-message-chart',
    templateUrl:'./totalMessage.component.html',
    styleUrls:['./totalMessage.component.css']
})

export class TotalMessageComponent implements OnInit, OnChanges{

    @Input() trendMessage:TrendMessage[];
    @Input() totalProcessMessage:TotalProcessedMessage;

    private initFlag:boolean = false;

    public lineChartData:Array<any> = [];
	public lineChartLabels:Array<any> = [];
    public lineChartType:string = 'line';

    public pieChartData:Array<any> = [];
	public pieChartLabels:Array<any> = [];
    public pieChartType:string = 'pie';

	public lineChartOptions:any = {
		responsive: true,
		title:{
			display:true,
			text:'Chart.js Line Chart'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Month'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Value'
				}
			}]
		}
	};

    public pieChartOptions:any = {
        responsive: true,
        legend:{
            display: false
        }
    }

	public chartClicked(e:any):void {
		console.log(e);
	}
	
	public chartHovered(e:any):void {
		console.log(e);
	}

	private getColor(messageType: string):string{
		let filterColor = Colors.filter(item => item.MessageTypeName == messageType);
		if(null == filterColor || undefined == filterColor || filterColor.length<=0){
			return "black";
		}
		return filterColor[0].color;
	}

    public ngOnInit():void{
        this.initFlag = true
    }

    public ngOnChanges(changes: SimpleChanges): void{
        if(this.initFlag){
            if(changes.hasOwnProperty('trendMessage')){
                this.reloadTrendMessage()
            }
            if(changes.hasOwnProperty('totalProcessMessage')){
                this.reloadTotalSuccessMessage()
            }            
        }
    }

    private reloadTrendMessage():void{
        this.lineChartData = [];
        this.lineChartLabels = [];
        for (let i=0; i< this.trendMessage.length; i++) {
            let lineDataItem:any = {};
            var data:Array<number> = [];
            lineDataItem.label=this.trendMessage[i].MessageTypeName;
            lineDataItem.fill=false;
            
            let tempColor = this.getColor(this.trendMessage[i].MessageType);
            lineDataItem.backgroundColor=tempColor;
            lineDataItem.borderColor=tempColor;
            //this.lineChartColors.push({backgroundColor:tempColor, borderColor:tempColor});

            for (let index = 0; index < this.trendMessage[i].TrendList.length; index++) {
                let element = this.trendMessage[i].TrendList[index];
                data.push(element.PeriodValue);
                if(i == 0){
                    this.lineChartLabels.push(moment(element.PeriodPoint).format('MM/YYYY'));
                }
                
            }
            lineDataItem.data = data;
            this.lineChartData.push(lineDataItem);
        }		
	}

    private reloadTotalSuccessMessage():void{
        this.pieChartData = [];
        this.pieChartLabels = [];
        let pieData:any = {};
        var bgColors:any = [];
        var data:Array<number> = [];
        var tempLabels:Array<string> = [];

        for (let i = 0; i < this.totalProcessMessage.MessageProcessedList.length; i++) {
            data.push(this.totalProcessMessage.MessageProcessedList[i].SuccessCount);

            let tempColor = this.getColor(this.totalProcessMessage.MessageProcessedList[i].MessageType);
            bgColors.push(tempColor);
            tempLabels.push(this.totalProcessMessage.MessageProcessedList[i].MessageType);
        }

        pieData.data = data;
        pieData.backgroundColor = bgColors;
        this.pieChartData.push(pieData);
        this.pieChartLabels = tempLabels;
    }

}