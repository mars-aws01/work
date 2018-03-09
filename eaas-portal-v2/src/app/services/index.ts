import { StatisticsService } from './monitor/statistics.service';
import { StatisticsMockService } from './monitor/statisticsMock.service';
import { MessagerService } from './common/messager.service';
import { BsModalService } from 'ngx-bootstrap/modal';

export{
    StatisticsService,
    StatisticsMockService,
    MessagerService
};

export const ALL_SERVICES = [
    StatisticsService,
    StatisticsMockService,
    MessagerService,
    BsModalService
];
