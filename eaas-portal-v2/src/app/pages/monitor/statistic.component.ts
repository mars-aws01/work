import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import Chart from 'chart.js';
import * as moment from 'moment';
import * as MomentTimezone from 'moment-timezone';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { MessageColorPipe } from '../../pipes';
import { environment } from '../../../environments/environment';
import { Colors } from '../../entities/monitor/statistic';
import { 
	StatisticsService,
	MessagerService } from '../../services';

import {
	StatisticRequest,
	Organization,
	Partner,
	Station,
	NotificationSetting,
	CustomSetting
} from '../../entities/monitor/statistic';
import {
	ChartConfig,
	ChartDataSets
} from '../../entities/common/chart';

@Component({
	selector: 'statistic',
	templateUrl: './statistic.component.html',
	styleUrls: ['./statistic.component.css'],
	providers: [StatisticsService]
})
export class StatisticComponent implements OnInit {
	public bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
	public colors = [

	];
	public UserInfo: any;
	public isFailedMessageChartsCollapsed = true;
	public isTotalMessageChartsCollapsed = true;
	public isAvgTimeChartsCollapsed = true;
	public isTotalMessageTableCollapsed = true;
	public isErrorMessageTableCollapsed = true;

	public promiseDoneCount = 0;
	public busySearch = [];
	public busyInit = [];
	// Search Region Data
	public Request = new StatisticRequest();
	public LastRequest: any;
	public TradingPartnerName: string;
	public OrganizationLsit: Organization[];
	public MessageTypeList: CustomSetting[];
	public LocalPartnerLsit: Partner[];
	public LocalStationLsit: Station[];
	public TradingPartnerList: Partner[];
	public TradingStationList: Station[];
	public OrignaTradingPartnerList: Partner[];
	public OrignalStationLsit: Station[];
	public Periods = [
		{ Name: 'Hourly', Format: 'MM/DD hhA' },
		{ Name: 'Daily', Format: 'MM/DD/YYYY' },
		{ Name: 'Weekly', Format: 'MM/DD/YYYY' },
		{ Name: 'Monthly', Format: 'MM/YYYY' }
	];

	// Result Region Data
	public totalTableInfo = [];
	public failedMessageCountTableInfo = [];
	public failedMessageRateTableInfo = [];
	public totalMessageCount: number;
	public successfullCount: number;
	public failedMessageCount: number;
	public inProcessingCount: number;

	public totalMessageDoughnutChart: any = new ChartConfig();
	public totalMessageTrendLineChart = new ChartConfig();
	public failedMessageBarChart: any = new ChartConfig();
	public failedMssageTrendLineChart = new ChartConfig();
	public avgTimeBarChart: any = new ChartConfig();
	public avgTimeTrendLineChart = new ChartConfig();

	private getMessageTypeName(messageTypeValue: string): string {
		let filter = this.MessageTypeList.filter(item => item.Value === messageTypeValue);
		if (null == filter || undefined === filter || filter.length <= 0) {
			return 'undefined';
		}
		return filter[0].Name;
	}

	private subDateString(dateWithWeekNumber: string) {
		return dateWithWeekNumber.substr(0, 10);
	}

	private getPieChartCurrentTotalCount(data) {
		let total = 0;
		let items = [];

		for (let index = 0; index < 100; index++) {
			if (data.datasets[0]._meta[index]) {
				items = data.datasets[0]._meta[index].data;
				break;
			}
		}

		for (const item of items) {
			if (!item.hidden) {
				total += data.datasets[0].data[item._index];
			}
		}

		return total;
	}

	private initChart(chart, type, title) {
		var self = this;
		chart.type = type;
		chart.data = {
			labels: [],
			datasets: []
		};

		chart.options = {
			animation: false,
			maintainAspectRatio: false,
			title: {
				display: true,
				text: title,
				lineHeight: 1
			},
			tooltips: {
				mode: 'index',
				intersect: false,
				callbacks: {
					label: function (tooltipItem, data) {
						return self.getMessageTypeName(data.datasets[tooltipItem.datasetIndex].label)
							+ ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
					},
					title: function (tooltipItems, data) {
						const index = tooltipItems[0].index;
						let displayText = data.labels[index];
						if (self.Request.Period === self.Periods[2]) {
							displayText = self.subDateString(displayText);
							if (index === 0 && data.labels.length > 1) {
								const dateFrom = new Date(displayText);
								const dateTo = new Date(self.subDateString(data.labels[index + 1]));
								
								if (dateFrom.getDate() === dateTo.getDate()) {
									displayText += ' - ' + self.subDateString(data.labels[index]);
								} else {
									const beforeDateTo = dateTo;
									beforeDateTo.setDate(dateTo.getDate() - 1);
									displayText += ' - ' + moment(beforeDateTo).format('MM/DD/YYYY');
								}
							} else if ((index + 1) >= data.labels.length) {
								const dateFrom = new Date(displayText);
								const dateTo = self.Request.ReceiveTimeTo;
								displayText += ' - ' + moment(dateTo).format('MM/DD/YYYY');
							} else {
								const dateTo = new Date(self.subDateString(data.labels[index + 1]));
								const beforeDateTo = dateTo;
								beforeDateTo.setDate(dateTo.getDate() - 1);
								displayText += ' - ' + moment(beforeDateTo).format('MM/DD/YYYY');
							}
						}
						return displayText;
					}
				}
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			legend: {
				displayText: true,
				textLimit: 10,
				labels: {
					boxWidth: 15,
					usePointStyle: false
				}
			}
		};

		if (type === 'line') {
			chart.options.scales = {
				yAxes: [{
					ticks: {
						beginAtZero: true,
						// callback: function(value) {if (value % 1 === 0) {return value; }}
					}
				}],
				xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						maxTicksLimit: 11
					}
				}]
			};

			if (chart.options.title.text !== 'Message Avg Time Trend(s)') {
				chart.options.scales.yAxes[0].ticks.callback = function(value) {if (value % 1 === 0) {return value; }};
			}
		}

		if (type === 'pie') {
			chart.options.legend = {
				display: true,
				position: 'left',
				textLimit: 10,
				labels: {
					boxWidth: 15
				}
			};

			chart.options.animation = {
				animateRotate: false
			};
			chart.options.tooltips.mode = 'single';
			chart.options.tooltips.callbacks = {
				label: function (tooltipItem, data) {
					const code = data.labels[tooltipItem.index];
					const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
					const percentage = (value / self.getPieChartCurrentTotalCount(data)) * 100 ;

					return '[' + code + ']: ' + percentage.toFixed(2) + '%' + ', ' + value;
				},
				title: function (tooltipItem, data) {
					const code = data.labels[tooltipItem[0].index];
					const messageTypeName = self.getMessageTypeName(code);
					return messageTypeName;
				}
			};

			chart.options.legend.labels.filter = function(item, data) {
				if (!self.Request.MessageType.Code &&　data.datasets[0].initFlag) {
					for (let i = 0; i < 100; i++) {
						if (data.datasets[0]._meta[i]) {
							for (let index = 0; index < data.labels.length; index++) {
								if (data.labels[index] === '210' ||
									data.labels[index] === '214' ||
									data.labels[index] === '997' ||
									data.labels[index] === 'UKN' ) {
									data.datasets[0]._meta[i].data[index].hidden = true;
								}
							}
							break;
						}
					}
					data.datasets[0].initFlag = false;
				}
				return item;
			};
		}

		if (type === 'bar') {
			chart.options = {
				maintainAspectRatio: false,
				animation: false,
				title: {
					display: true,
					text: title
				},
				tooltips: {
					mode: 'index',
					intersect: false,
					callbacks: {
						title: function (tooltipItem, data) {
							return self.getMessageTypeName(data.labels[tooltipItem[0].index]);
						}
					}
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				legend: {
					display: false
				},
				scales: {
					yAxes: [{
						stacked: true,
						gridLines: {
							display: true
						},
						ticks: {
							beginAtZero: true,
							// callback: function(value) {if (value % 1 === 0) {return value; }}
						}
					}],
					xAxes: [{
						gridLines: {
							display: false
						}
					}]
				}
			};

			if (chart.options.title.text !== 'Message Avg Time(s)') {
				chart.options.scales.yAxes[0].ticks.callback = function(value) {if (value % 1 === 0) {return value; }};
			}
		}
	}

	private truncateChart(chart) {
		this.initChart(chart, chart.type, chart.options.title.text);
	}

	private getWeeHours(date: Date, tomorrow: Boolean = false) {
		const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		if (tomorrow) {
			result.setDate(date.getDate() + 1);
		}
		result.setHours(0, 0, 0, 0);
		return result;
	}

	private getColor(messageType: string): string {
		const filterColor = Colors.filter(item => item.MessageTypeName === messageType);
		if (null == filterColor || undefined === filterColor || filterColor.length <= 0) {
			return 'black';
		}
		return filterColor[0].color;
	}

	constructor(
		private statisticsService: StatisticsService,
		private messagerService: MessagerService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) { }

	private setDefaultDateRange() {
		const now = new Date();
		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(now.getDate() - 7);
		this.Request.ReceiveTime = [oneWeekAgo, now];
		this.Request.ReceiveTimeFrom = oneWeekAgo;
		this.Request.ReceiveTimeTo = now;
	}
	
	ngOnInit() {
		this.initChart(this.totalMessageDoughnutChart, 'pie', 'Total Message');
		this.initChart(this.totalMessageTrendLineChart, 'line', 'Message Process Trend');
		this.initChart(this.failedMessageBarChart, 'bar', 'Failed Message Count');
		this.initChart(this.failedMssageTrendLineChart, 'line', 'Failed Message Trend');
		this.initChart(this.avgTimeBarChart, 'bar', 'Message Avg Time(s)');
		this.initChart(this.avgTimeTrendLineChart, 'line', 'Message Avg Time Trend(s)');

		this.activatedRoute.queryParams.subscribe((params: Params) => {
			const userInfoBase64 = params['userInfo'];
			this.UserInfo = JSON.parse(atob(userInfoBase64));
			this.statisticsService.headerOptions.headers.append('AuthorizationToken', this.UserInfo.authorizationToken);
		});

		let promiseOrganization = this.statisticsService.getOrganization()
			.then(response => {
				this.OrganizationLsit = response.OrganizationList;
				this.Request.Organization = this.OrganizationLsit[0];
			});

		let promisePartner = this.statisticsService.getPartnerList()
			.then(response => {
				this.OrignaTradingPartnerList = [];
				this.LocalPartnerLsit = [];
				this.TradingPartnerList = [];
	
				this.LocalPartnerLsit.push({ Name: 'All' } as Partner);
	
				for (const partner of response.PartnerList) {
					if (partner.Type === 'Local') {
						this.LocalPartnerLsit.push(partner);
						this.TradingPartnerList.push(partner);
					} else if (partner.Type === 'Trading') {
						this.OrignaTradingPartnerList.push(partner);
						this.TradingPartnerList.push(partner);
					}
				}
	
				this.OrignaTradingPartnerList.sort(function(a, b) {
					if (a.Name === 'All') {
						return -1;
					}
					if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
						return 1;
					} 
					if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
						return -1;
					} 
					
					return 0;
				});
	
				this.LocalPartnerLsit.push({ Name: 'Unknown', ID: 0 } as Partner);
				
				return this.statisticsService.getStationList()
					.then(res => {
						this.OrignalStationLsit = [];
						for (let item of res.StationList) {
							if (item.Identity) {
								item.Name += ' - ' + '[' + item.Identity + ']';
							}
		
							this.OrignalStationLsit.push(item);
						}
		
						if (this.UserInfo.PartnerID) {
							for (const item of this.LocalPartnerLsit) {
								if (item.ID === this.UserInfo.PartnerID) {
									this.Request.LocalPartner = item;
									break;
								}
							}
						} else {
							this.Request.LocalPartner = this.LocalPartnerLsit[0];
						}
						this.changeLocalPartner(this.Request.LocalPartner);
		
						this.TradingStationList = [];
						this.TradingStationList.push({ Name: 'All' } as Station);
						this.Request.TradingStation = this.TradingStationList[0];
					});
			});

		const messageTypeListRequest = { organizationid: this.UserInfo.Id };
		let promiseMessageType = this.statisticsService.getMessageType(messageTypeListRequest)
			.then(Response => {
				this.MessageTypeList = [];
				this.MessageTypeList.push({ DisplayName: 'All' } as CustomSetting);
				const customSettingList = Response.CustomSettingList;
				for (const customSetting of Response.CustomSettingList) {
					if (customSetting.Category === 'TransactionType') {
						const messageType = customSetting as CustomSetting;
						messageType.DisplayName = messageType.Name + ' (' + messageType.Code + ' - ' + messageType.Value + ')';
						this.MessageTypeList.push(messageType);
					}
				}
	
				this.Request.MessageType = this.MessageTypeList[0];
	
				this.MessageTypeList.sort(function(a, b) {
					if (a.DisplayName === 'All') {
						return -1;
					}
					if (a.DisplayName > b.DisplayName) {
						return 1;
					} 
					if (a.DisplayName < b.DisplayName) {
						return -1;
					} 
					return 0;
				});
			});

		this.Request.Period = this.Periods[1];
		this.setDefaultDateRange();

		this.busyInit = [promiseOrganization, promisePartner, promiseMessageType];
		
		Promise.all([promiseOrganization, promisePartner, promiseMessageType]).then(
			values => {
				this.search();
			}
		);
	}

	public changeLocalPartner(value) {
		this.LocalStationLsit = [];
		this.LocalStationLsit.push({ Name: 'All' } as Station);

		for (const station of this.OrignalStationLsit) {
			if (this.Request.LocalPartner.ID === station.PartnerID) {
				this.LocalStationLsit.push(station);
			}
		}

		this.LocalStationLsit.push({ Name: 'Unknown', Id: 0 } as Station);

		if (this.UserInfo.StationID) {
			for (const item of this.LocalStationLsit) {
				if (item.Id === this.UserInfo.StationID) {
					this.Request.LocalStation = item;
					break;
				}
			}
		} else {
			this.Request.LocalStation = this.LocalStationLsit[0];
		}

		if (this.Request.LocalPartner.Name === 'All') {
			this.TradingPartnerList = this.OrignaTradingPartnerList;
		} else {
			if (!this.Request.LocalPartner.RelationPartnerIDList) {
				return;
			}
			this.TradingPartnerList = [];
			for (const partnerID of this.Request.LocalPartner.RelationPartnerIDList) {
				for (const partner of this.OrignaTradingPartnerList) {
					if (partner.ID === partnerID) {
						this.TradingPartnerList.push(partner);
					}
				}
			}
		}

		this.TradingPartnerName = '';

		this.TradingStationList = [];
		this.TradingStationList.push({ Name: 'All' } as Station);
		this.Request.TradingStation = this.TradingStationList[0];
	}

	public changeTradingPartner(e: TypeaheadMatch) {
		this.Request.TradingPartner = e.item;
		this.TradingStationList = [];
		this.TradingStationList.push({ Name: 'All' } as Station);

		for (const station of this.OrignalStationLsit) {
			if (this.Request.TradingPartner.ID === station.PartnerID) {
				this.TradingStationList.push(station);
			}
		}

		this.Request.TradingStation = this.TradingStationList[0];
	}

	public tradingPartnerNameChange(e: any) {
		let flag = false;
		let tradingPartnerID = this.Request.TradingPartner.ID;
		for (const item of this.OrignaTradingPartnerList) {
			if (item === e.target.value) {
				this.Request.TradingPartner = item;
				flag = true;
				break;
			}
		}
		if (!flag) {
			tradingPartnerID = null;
		} else {
			tradingPartnerID = this.Request.TradingPartner.ID;
		}

		this.TradingStationList = [];
		this.TradingStationList.push({ Name: 'All' } as Station);

		for (const station of this.OrignalStationLsit) {
			if (tradingPartnerID === station.PartnerID) {
				this.TradingStationList.push(station);
			}
		}

		this.Request.TradingStation = this.TradingStationList[0];
	}

	private getTradingPartnerIDFromName(tradingPartnerName) {
		for (const item of this.TradingPartnerList) {
			if (item.Name === tradingPartnerName) {
				return item.ID;
			}
		}
		this.TradingPartnerName = '';
		return null;
	}

	private getIdOfObject(object) {
		if (object && (object.Id || object.Id === 0 )) {
			return object.Id;
		} else if (object && (object.ID || object.ID === 0 )) {
			return object.ID;
		}
		return null;
	}

	private getMessageTypeValue(messageType: string): string {
		let filter = this.MessageTypeList.filter(item => item.Code === messageType);
		if (null == filter || undefined === filter || filter.length <= 0) {
			return 'undefined';
		}
		return filter[0].Value;
	}

	private setSummaryChartData(response) {
		if (!response.MessageProcessedList) {
			this.truncateChart(this.totalMessageDoughnutChart);
			this.truncateChart(this.failedMessageBarChart);
			this.truncateChart(this.avgTimeBarChart);
			this.totalTableInfo = [];
			this.totalMessageCount = null;
			this.failedMessageCount = null;
			this.successfullCount = null;
			this.inProcessingCount = null;
			return;
		}

		response.MessageProcessedList.sort(function(a, b) {
			if (a.MessageTypeCode > b.MessageTypeCode) {
				return 1;
			}
			if (a.MessageTypeCode < b.MessageTypeCode) {
				return -1;
			}
			return 0;
		});

		this.totalTableInfo = response.MessageProcessedList;
		this.totalMessageCount = response.TotalCount;
		this.failedMessageCount = response.FailedCount;
		this.successfullCount = response.SuccessCount;
		this.inProcessingCount = response.ProcessingCount;

		const labels = [];
		const colors = [];
		const total = [];
		const failure = [];
		const avgTime = [];

		for (const item of response.MessageProcessedList) {
			labels.push(this.getMessageTypeValue(item.MessageType));
			colors.push(this.getColor(item.MessageType));
			total.push(item.TotalCount);
			failure.push(item.FailedCount);
			avgTime.push(item.AverageTime);
		}

		this.totalMessageDoughnutChart.data.labels = labels;
		this.totalMessageDoughnutChart.data.datasets = [{
			label: '',
			data: total,
			backgroundColor: colors,
			borderWidth: 0,
			initFlag: true
		}];

		this.failedMessageBarChart.data.labels = labels;
		this.failedMessageBarChart.data.datasets = [{ label: '', data: failure, backgroundColor: colors }];

		this.avgTimeBarChart.data.labels = labels;
		this.avgTimeBarChart.data.datasets = [{ label: '', data: avgTime, backgroundColor: colors }];
		// this.sortByFailedCount(response.MessageProcessedList);
		// this.sortByAvgTime(response.MessageProcessedList);
	}

	private sortByFailedCount(MessageProcessedList) {
		const labels = [];
		const colors = [];
		const failure = [];

		MessageProcessedList.sort(function(a, b) {
			if (a.MessageTypeCode > b.MessageTypeCode) {
				return 1;
			}
			if (a.MessageTypeCode < b.MessageTypeCode) {
				return -1;
			}
			return 0;
		});

		for (const item of MessageProcessedList) {
			labels.push(this.getMessageTypeValue(item.MessageType));
			colors.push(this.getColor(item.MessageType));
			failure.push(item.FailedCount);
		}

		this.failedMessageBarChart.data.labels = labels;
		this.failedMessageBarChart.data.datasets = [{ label: '', data: failure, backgroundColor: colors }];
	}

	private sortByAvgTime(MessageProcessedList) {
		const labels = [];
		const colors = [];
		const avgTime = [];

		MessageProcessedList.sort(function(a, b) {
			if (a.MessageTypeCode > b.MessageTypeCode) {
				return 1;
			}
			if (a.MessageTypeCode < b.MessageTypeCode) {
				return -1;
			}
			return 0;
		});

		for (const item of MessageProcessedList) {
			labels.push(this.getMessageTypeValue(item.MessageType));
			colors.push(this.getColor(item.MessageType));
			avgTime.push(item.AverageTime);
		}

		this.avgTimeBarChart.data.labels = labels;
		this.avgTimeBarChart.data.datasets = [{ label: '', data: avgTime, backgroundColor: colors }];
	}

	// 设置趋势图数据
	private setTrendChartData(chart, response) {
		if (!response.MessageTrendList || !response.MessageTrendList.length) {
			this.truncateChart(chart);
			return;
		}

		response.MessageTrendList.sort(function(a, b) {
			if (a.MessageTypeCode > b.MessageTypeCode) {
				return 1;
			}
			if (a.MessageTypeCode < b.MessageTypeCode) {
				return -1;
			}
			return 0;
		});

		let labels = [];
		const datasets = [];

		for (const item of response.MessageTrendList) {
			const data = [];
			if (labels.length < item.TrendList.length) {
				labels = [];
				for (const point of item.TrendList) {
					let weekNumber = '';
					if (this.Request.Period.Name === 'Weekly') {
						weekNumber = '(w' + moment(point.PeriodPoint).week() + ')';
					}
					labels.push(moment(point.PeriodPoint).format(this.Request.Period.Format) + weekNumber);
				}
			}

			for (const point of item.TrendList) {
				let value;
				if (chart.options.title.text === this.avgTimeTrendLineChart.options.title.text) {
					value = point.PeriodAverageTime;
				} else {
					value = point.PeriodQuantity;
				}
				data.push(value);
			}

			const lineData: any = {
				label: this.getMessageTypeValue(item.MessageType),
				fill: false,
				data: data
			};

			if (!this.Request.MessageType.Code &&
					(lineData.label === '210' ||
					lineData.label === '214' ||
					lineData.label === '997' ||
					lineData.label === 'UKN' ) ) {
				lineData.hidden = true;
			}

			const lineColor = this.getColor(item.MessageType);
			lineData.backgroundColor = lineColor;
			lineData.borderColor = lineColor;
			lineData.borderWidth = 2;
			lineData.pointRadius = 2;

			datasets.push(lineData);
		}

		chart.data.labels = labels;
		chart.data.datasets = datasets;
	}

	private daysBetween(from: Date, to: Date): number {
		const oneDay = 24 * 60 * 60 * 1000;
		const dateSpan = Math.round(Math.abs(to.getTime() - from.getTime()) / oneDay);

		return dateSpan;
	}

	private monthsBetween(from: Date, to: Date): number {
		const dateSpan = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());

		return dateSpan;
	}


	private setAllCollapse(value: boolean) {
		this.isAvgTimeChartsCollapsed = value;
		this.isErrorMessageTableCollapsed = value;
		this.isFailedMessageChartsCollapsed = value;
		this.isTotalMessageChartsCollapsed = value;
		this.isTotalMessageTableCollapsed = value;
	}

	private getRequest() {
		const request = {
			OrganizationID: this.getIdOfObject(this.Request.Organization),
			LocalPartnerID: this.getIdOfObject(this.Request.LocalPartner),
			LocalStationID: this.getIdOfObject(this.Request.LocalStation),
			MessageType: this.Request.MessageType.Code,
			TradingPartnerID: this.getTradingPartnerIDFromName(this.TradingPartnerName),
			TradingStationID: this.getIdOfObject(this.Request.TradingStation),
			Period: this.Request.Period.Name,
			ReceiveStartTime: this.getWeeHours(this.Request.ReceiveTimeFrom, false),
			ReceiveEndTime: this.getWeeHours(this.Request.ReceiveTimeTo, true),
			TimeZone: MomentTimezone.tz.guess()
			// TimeZone: moment(this.Request.ReceiveTimeFrom).format('Z')
		};

		return request;
	}

	private checkReqest(request) {
		if (this.Request.Period.Name === 'Hourly') {
			const diffDays = this.daysBetween(this.Request.ReceiveTimeFrom, this.Request.ReceiveTimeTo);
			if (diffDays > 7) {
					this.messagerService.warning('Receive time range should be in 7 days.');
					return false;
				}
		}
		if (this.Request.Period.Name === 'Daily') {
			const months = this.monthsBetween(this.Request.ReceiveTimeFrom, this.Request.ReceiveTimeTo) + 1;
			if (months > 3) {
				this.messagerService.warning('Receive time range should be in 3 months.');
				return false;
			}
		}
		if (this.Request.Period.Name === 'Weekly') {
			const months = this.monthsBetween(this.Request.ReceiveTimeFrom, this.Request.ReceiveTimeTo) + 1;
			if (months > 6) {
				this.messagerService.warning('Receive time range should be in 6 months.');
				return false;
			}
		}
		if (this.Request.Period.Name === 'Monthly') {
			const months = this.monthsBetween(this.Request.ReceiveTimeFrom, this.Request.ReceiveTimeTo) + 1;
			if (months > 12) {
				this.messagerService.warning('Receive time range should be in 12 months.');
				return false;
			}
		}

		return true;
	}

	public search() {
		const request = this.getRequest();
		this.LastRequest = request;
		if (!this.checkReqest(request)) {
			return;
		}

		this.setAllCollapse(false);
		let promiseTrendMessage = this.statisticsService.getTrendMessage(request)
			.then(response => {
				if (response && response.Succeeded) {
					this.setTrendChartData(this.totalMessageTrendLineChart, response);
				} else {
					this.messagerService.error(response.errorMessage ? response.errorMessage : response.Errors[0].Message);
					this.truncateChart(this.totalMessageTrendLineChart);
				}
				this.promiseDoneCount++;
				this.checkCollapse();
			});

		let promiseTotalMessage = this.statisticsService.getTotalMessage(request)
			.then(response => {
				if (response && response.Succeeded) {
					this.setSummaryChartData(response);
				} else {
					this.messagerService.error(response.errorMessage ? response.errorMessage : response.Errors[0].Message);
					this.truncateChart(this.totalMessageDoughnutChart);
					this.truncateChart(this.failedMessageBarChart);
					this.truncateChart(this.avgTimeBarChart);
					this.totalTableInfo = [];
					this.totalMessageCount = null;
					this.failedMessageCount = null;
					this.successfullCount = null;
					this.inProcessingCount = null;
				}
				this.promiseDoneCount++;
				this.checkCollapse();
			});

		let promiseTrendFailedMessage = this.statisticsService.getTrendFailedMessage(request)
			.then(response => {
				if (response && response.Succeeded) {
					this.setTrendChartData(this.failedMssageTrendLineChart, response);
				} else {
					this.messagerService.error(response.errorMessage ? response.errorMessage : response.Errors[0].Message);
					this.truncateChart(this.failedMssageTrendLineChart);
				}
				this.promiseDoneCount++;
				this.checkCollapse();
			});

		let promiseTrendAvgMessage = this.statisticsService.getTrendAvgMessage(request)
			.then(response => {
				if (response && response.Succeeded) {
					this.setTrendChartData(this.avgTimeTrendLineChart, response);
				} else {
					this.messagerService.error(response.errorMessage ? response.errorMessage : response.Errors[0].Message);
					this.truncateChart(this.avgTimeTrendLineChart);
				}
				this.promiseDoneCount++;
				this.checkCollapse();
			});

		let promisePopularFailedMessage = this.statisticsService.getPopularFailedMessage(request)
			.then(response => {
				if (response && response.Succeeded) {
					this.failedMessageCountTableInfo = response.MessageList;
				} else {
					this.messagerService.error(response.errorMessage ? response.errorMessage : response.Errors[0].Message);
					this.failedMessageCountTableInfo = [];
				}
				this.promiseDoneCount++;
				this.checkCollapse();
			});

		let promisePopularFailedMessageRate = this.statisticsService.getPopularFailedMessageRate(request)
			.then(response => {
				if (response && response.Succeeded) {
					this.failedMessageRateTableInfo = response.MessageList;
				} else {
					this.messagerService.error(response.errorMessage ? response.errorMessage : response.Errors[0].Message);
					this.failedMessageRateTableInfo = [];
				}
				this.promiseDoneCount++;
				this.checkCollapse();
			});
		
		this.busySearch = [promisePopularFailedMessage, promisePopularFailedMessageRate, promiseTotalMessage, promiseTrendAvgMessage, promiseTrendFailedMessage, promiseTrendMessage];
	}

	private checkCollapse() {
		if (this.promiseDoneCount !== 6) {
			return;
		}
		if (!this.totalMessageDoughnutChart.data.datasets.length && !this.totalMessageTrendLineChart.data.datasets.length) {
			this.isTotalMessageChartsCollapsed = true;
		}
		if (!this.failedMessageBarChart.data.datasets.length && !this.failedMssageTrendLineChart.data.datasets.length) {
			this.isFailedMessageChartsCollapsed = true;
		}
		if (!this.avgTimeBarChart.data.datasets.length && !this.avgTimeTrendLineChart.data.datasets.length) {
			this.isAvgTimeChartsCollapsed = true;
		}
		if (!this.totalTableInfo.length ) {
			this.isTotalMessageTableCollapsed = true;
		}
		if (!this.failedMessageCountTableInfo.length && !this.failedMessageRateTableInfo.length) {
			this.isErrorMessageTableCollapsed = true;
		}

		this.promiseDoneCount = 0;
	}

	public redirectToMessagePage(name, value, extra) {
		let messagePageUrl = environment.eaasPortalBaseUrl_V1 + 'message-v2';

		let paramsDict = this.getQueryStringSource();

		if (name === 'Status') {
			paramsDict.push({ key: 'Status', value: value });
			this.updateOrAddDictionary(paramsDict, { key: 'MessageType', value: extra.MessageType });
		} else if (name === 'PartnerInfo') {
			this.updateOrAddDictionary(paramsDict, { key: 'LocalPartnerID', value: value.LocalPartnerID });
			this.updateOrAddDictionary(paramsDict, { key: 'LocalStationID', value: value.LocalStationID });
			this.updateOrAddDictionary(paramsDict, { key: 'TradingPartnerID', value: value.TradingPartnerID });
			this.updateOrAddDictionary(paramsDict, { key: 'TradingStationID', value: value.TradingStationID });
			this.updateOrAddDictionary(paramsDict, { key: 'Status', value: 'Failed' });
		}

		messagePageUrl = this.setQueryString(messagePageUrl, paramsDict);

		// window.top.location.href = messagePageUrl;
		window.open(messagePageUrl, '_blank');
	}

	private updateOrAddDictionary(dict, newItem) {
		let existFlag = false;

		for (const item of dict) {
			if (item.key === newItem.key) {
				existFlag = true;
				item.value = newItem.value;
				break;
			}
		}

		if (!existFlag) {
			dict.push(newItem);
		}

	}

	private getQueryStringSource() {
		let tradingPartnerID = null;

		for (const item of this.OrignaTradingPartnerList) {
			if (item.Name === this.TradingPartnerName) {
				tradingPartnerID = item.ID;
				break;
			}
		}

		const requestInfo = [
			{
				key: 'OrganizationID',
				// value: this.getIdOfObject(this.Request.Organization)
				value: this.LastRequest.OrganizationID
			},
			{
				key: 'LocalPartnerID',
				// value: this.getIdOfObject(this.Request.LocalPartner)
				value: this.LastRequest.LocalPartnerID
			},
			{
				key: 'LocalStationID',
				// value: this.getIdOfObject(this.Request.LocalStation)
				value: this.LastRequest.LocalStationID
			},
			{
				key: 'MessageType',
				// value: this.Request.MessageType.Code
				value: this.LastRequest.MessageType
			},
			{
				key: 'TradingPartnerID',
				// value: tradingPartnerID
				value: this.LastRequest.TradingPartnerID
			},
			{
				key: 'TradingStationID',
				// value: this.getIdOfObject(this.Request.TradingStation)
				value: this.LastRequest.TradingStationID
			},
			{
				key: 'ReceiveTimeFrom',
				// value: this.getWeeHours(this.Request.ReceiveTimeFrom, false).toISOString()
				value: this.LastRequest.ReceiveStartTime
			},
			{
				key: 'ReceiveTimeTo',
				// value: this.getWeeHours(this.Request.ReceiveTimeTo, true).toISOString()
				value: this.LastRequest.ReceiveEndTime
			},
		];

		return requestInfo;
	}

	public setQueryString(url, dictionary) {
		url += '?';

		for (const param of dictionary) {
			if (param.value || param.value === 0) {
				url += param.key + '=' + param.value + '&';
			}
		}

		url = url.slice(0, -1);

		return url;
	}

	public backToPreviousPage() {
		window.history.back();
	}

}
