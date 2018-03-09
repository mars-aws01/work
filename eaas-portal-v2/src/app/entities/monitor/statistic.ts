
export class EditInfo {
    EditDate: Date;
    EditUser: string;
    InDate: Date;
    InUser: string;
}

export class StatisticRequest {
    Organization: Organization;
    LocalPartner: Partner;
    LocalStation: Station;
    MessageType: CustomSetting;
    TradingPartner: Partner;
    TradingStation: Station;
    Period: string | any;
    ReceiveTime: Date[];
    ReceiveTimeFrom: Date;
    ReceiveTimeTo: Date;
}

export class Organization {
    As2ReceiveUrlAsyncPrd: string;
    As2ReceiveUrlAsyncTesting: string;
    As2ReceiveUrlPrd: string;
    As2ReceiveUrlTesting: string;
    CertificateID: number;
    ContactList: string;
    Description: string;
    EDIServer: string;
    EditDate: Date;
    EditUser: string;
    Id: number;
    InDate: Date;
    InUser: string;
    MqSubscriberApiPrd: string;
    MqSubscriberApiTesting: string;
    Name: string;
    OrganizationID: number;
    Status: string;
}

export class Contact {
    Company: string;
    EditDate: Date;
    EditUser: string;
    Email: string;
    Id: number;
    InDate: Date;
    InUser: string;
    Name: string;
    OrganizationID: number;
    OwnerID: number;
    OwnerType: string;
}

export class Partner {
    CertificateID: number;
    DeploymentID: number;
    EditDate: Date;
    EditUser: string;
    ID: number;
    InDate: Date;
    InUser: string;
    Name: string;
    OrganizationID: number;
    RelationPartnerIDList: number[];
    StationIdentityList: string[];
    Status: string;
    Type: string;
}

export class Station {
    DeploymentID: number;
    Description: string;
    EditDate: Date;
    EditUser: string;
    Id: number;
    Identity: string;
    InDate: Date;
    InUser: string;
    Name: string;
    NotificationSetting: NotificationSetting;
    OrganizationID: number;
    PartnerID: number;
    Status: string;
}

export class NotificationSetting {
    BatchInterval: number;
    BatchSize: string;
    EditDate: Date;
    EditUser: string;
    EmailAddress: string;
    Id: number;
    InDate: Date;
    InUser: string;
    NotificationMode: string;
    OrganizationID: number;
    OwnerID: number;
    OwnerType: string;
    ReceiveNotificationEnabled: boolean;
}

export class CustomSetting {
    Category: string;
    Code: string;
    Id: number;
    InDate: Date;
    InUser: string;
    Name: string;
    DisplayName: string;
    OrganizationID: number;
    ParentSettingID: number;
    Value: string;
}

// Statistics Message

export class TrendData {
    PeriodPoint: Date;
    PeriodValue: number;
}

export class TrendMessage {
    MessageType: string;
    MessageTypeName: string;
    TrendList: TrendData[];
}

export class ProcessedMessage {
    MessageType: string;
    MessageTypeName: string;
    TotalCount: number;
    SuccessCount: number;
    FailedCount: number;
    AverageTime: number;
}

export class TotalProcessedMessage {
    TotalCount: number;
    SuccessCount: number;
    FailedCount: number;
    AverageTime: number;
    MessageProcessedList: ProcessedMessage[];
}

//const variable

export const Colors: Array<any> = [
    { MessageTypeName: 'UKN', color: '#D2082D' },
    { MessageTypeName: 'IA', color: '#A2DOCF' },
    { MessageTypeName: 'FA', color: '#F5D77A' },
    { MessageTypeName: 'IB', color: '#CBC9D0' },
    { MessageTypeName: 'IN', color: '#3CD0BD' },
    { MessageTypeName: 'IM', color: '#CAA8E6' },
    { MessageTypeName: 'MZ', color: '#FCE7CC' },
    { MessageTypeName: 'PD', color: '#FFB19E' },
    { MessageTypeName: 'SC', color: '#FF7682' },
    { MessageTypeName: 'PO', color: '#8BE6B4' },
    { MessageTypeName: 'PR', color: '#4670BA' },
    { MessageTypeName: 'SH', color: '#F78BD1' },
    { MessageTypeName: 'QM', color: '#F2D1BA' },
    { MessageTypeName: 'PC', color: '#8DC63F' },
    { MessageTypeName: 'CA', color: '#A86FBA' },
    { MessageTypeName: 'OW', color: '#9FC3E6' },
    { MessageTypeName: 'SW', color: '#F4791F' }
]