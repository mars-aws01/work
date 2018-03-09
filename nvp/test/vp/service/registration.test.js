'use strict';
describe('controller: vp-cache-registration', function () {

    beforeEach(module('vf-cache-apiSetting'));
    beforeEach(module('vp-api-registration'));
    beforeEach(module('vp-cache-registration'));

    var registrationHelper;

    beforeEach(inject(function ($rootScope, _registration_) {
        registrationHelper = _registration_;
    }));

    describe('Function Test', function () {
        it('should have config', function () {
            var testConfig = {
                CompanyInformation: {
                    VendorType: { type: "string", req: true, },
                    CompanyName: { type: "string", req: true, maxlength: 200 },
                    DBA: { type: "string", maxlength: 80 },
                    WebsiteURL: { type: "string", maxlength: 50 },
                    TaxID: { type: "string", req: true, maxlength: 10, pattern: /^[0-9]+(-[0-9]+)*$/ },
                    EmployeesNumber: { type: "number", req: true, maxlength: 9, min: 0, max: 999999999, pattern: /^\d{1,9}$/ },
                    PreferredPayMethod: { type: "string", req: true, maxlength: 4 },
                    PreferredCurrency: { type: "string", req: true, maxlength: 3 },
                    DunsNumber: { type: "string", maxlength: 11, pattern: /^(\d{2}[-]\d{3}[-]\d{4})?$/ },
                    IncorporationState: { type: "string", maxlength: 3 },
                    BusinessType: { type: "string", maxlength: 30 },
                    PublicCompanyStockSymbol: { type: "string", maxlength: 100 },
                    EstablishedYear: { type: "number", min: 0, max: 9999, pattern: /^\d{0,4}$/ },
                    TotalAnnualRevenue: { type: "number", min: 0, max: 9999999999.99, pattern: /(^\d{0,10}([.]\d{1,2})?)$/ },
                    ProjectRevenue: { type: "number", min: 0, max: 9999999999.99, pattern: /(^\d{0,10}([.]\d{1,2})?)$/ },
                    InvolvedDescription: { type: "string", maxlength: 2000 }
                },
                StandardLegalTerms: {
                    SignBy: { type: "string", req: true, maxlength: 15 },
                    Title: { type: "string", req: true, maxlength: 20 },
                    PrintedName: { type: "string", req: true, maxlength: 15 },
                    Date: { req: true }
                },
                SupportingDocument: {
                    BankInformation: {
                        BankCountry: { type: "string", req: true, maxlength: 3 },
                        BankKey: { type: "string", req: true, maxlength: 15 },
                        BankName: { type: "string", req: true, maxlength: 60 },
                        Region: { type: "string", req: true, maxlength: 3 },
                        Street: { type: "string", req: true, maxlength: 35 },
                        City: { type: "string", req: true, maxlength: 35 },
                        BankBranch: { type: "string", req: true, maxlength: 100 },
                        BankContactPhoneNumber: { type: "string", req: true, maxlength: 18 },
                        SwiftCode: { type: "string", req: true, maxlength: 11 },
                        NameOnAccount: { type: "string", req: true, maxlength: 60 },
                        AccountNumber: { type: "string", req: true, maxlength: 18 },
                        IBAN: { type: "string", req: true, maxlength: 34 },
                        ValidFrom: { req: true },
                        IntermediaryBankRouting: { type: "string", maxlength: 50 },
                        IntermediaryBank: { type: "string", maxlength: 50 }
                    }
                },
                Address: {
                    Address1: { type: "string", req: true, maxlength: 100 },
                    Address2: { type: "string", maxlength: 100 },
                    City: { type: "string", req: true, maxlength: 45 },
                    StateProvince: { type: "string", req: true, maxlength: 32 },
                    ZipPostalCode: { type: "string", req: true, maxlength: 10 },
                    Country: { type: "string", req: true, maxlength: 15 }
                },
                Contact: {
                    Name: { type: "string", req: true, maxlength: 80 },
                    JobTitle: { type: "string", maxlength: 50 },
                    Email: { type: "string", req: true, maxlength: 80 },
                    Phone: { type: "string", req: true, maxlength: 20 }
                },
                UploadFile: {
                    maxCount: 5,
                    maxSize: 2,
                    rejects: ["exe", "bat", "com"],
                    filenamePattern: /^[^\u4e00-\u9fa5]{1,75}$/,
                    filenamePatternTip: "File name cannot contain Chinese and length less than 75.",
                    attachmentType_w9: "05",
                    attachmentType_terms: "10",
                    attachmentType_void: "14",
                    attachmentType_bank: "15",
                    attachmentType_2year: "13",
                    attachmentType_db: "11",
                    attachmentType_standard: "02"
                }
            };
            registrationHelper.should.have.property('config');
            registrationHelper.config.should.be.eql(testConfig);
        });

        describe('Regex Check', function () {

            describe('Tax ID', function () {
                it('first char must be Numbers | 首字母只能是数字', function () {
                    var reg = registrationHelper.config.CompanyInformation.TaxID.pattern;
                    var result = reg.test('x33');
                    result.should.be.false;
                });

                it('only contain Numbers and "-" | 只能包含数字和中划线', function () {
                    var reg = registrationHelper.config.CompanyInformation.TaxID.pattern;
                    var result = reg.test('33-223');
                    result.should.be.true;
                });

                it('only contain Numbers and "-" | 包含字母错误', function () {
                    var reg = registrationHelper.config.CompanyInformation.TaxID.pattern;
                    var result = reg.test('33-22x3');
                    result.should.be.false;
                });

                it('only contain Numbers and "-" | 连续中划线错误', function () {
                    var reg = registrationHelper.config.CompanyInformation.TaxID.pattern;
                    var result = reg.test('33--223');
                    result.should.be.false;
                });

                it('only contain Numbers and "-" | 都是数字正确', function () {
                    var reg = registrationHelper.config.CompanyInformation.TaxID.pattern;
                    var result = reg.test('33223');
                    result.should.be.true;
                });

                it('only contain Numbers and "-" | 都是中划线错误', function () {
                    var reg = registrationHelper.config.CompanyInformation.TaxID.pattern;
                    var result = reg.test('---');
                    result.should.be.false;
                });

                it('only contain Numbers and "-" | 中划线在最后错误', function () {
                    var reg = registrationHelper.config.CompanyInformation.TaxID.pattern;
                    var result = reg.test('222-333-');
                    result.should.be.false;
                });
            });

            describe('Employees Number', function () {

                it('only contain Numbers | 只能包含数字', function () {
                    var reg = registrationHelper.config.CompanyInformation.EmployeesNumber.pattern;
                    var result = reg.test('2565');
                    result.should.be.true;
                });

                it('only contain Numbers | 包含字母错误', function () {
                    var reg = registrationHelper.config.CompanyInformation.EmployeesNumber.pattern;
                    var result = reg.test('3322x3');
                    result.should.be.false;
                });

                it('only contain Numbers | 包含特殊字符错误', function () {
                    var reg = registrationHelper.config.CompanyInformation.EmployeesNumber.pattern;
                    var result = reg.test('33%$3');
                    result.should.be.false;
                });

                it('only contain Numbers | 不能超过9位数', function () {
                    var reg = registrationHelper.config.CompanyInformation.EmployeesNumber.pattern;
                    var result = reg.test('1234567891');
                    result.should.be.false;
                });

            });

            describe('Duns Number', function () {
                it('format: xx-xxx-xxxx and only Numbers', function () {
                    var reg = registrationHelper.config.CompanyInformation.DunsNumber.pattern;
                    var result = reg.test('22-333-4444');
                    result.should.be.true;
                });

                it('format: xx-xxx-xxxx and only Numbers | 包含字母错误', function () {
                    var reg = registrationHelper.config.CompanyInformation.DunsNumber.pattern;
                    var result = reg.test('22-3x3-4444');
                    result.should.be.false;
                });

                it('format: xx-xxx-xxxx and only Numbers | 包含特殊字符错误', function () {
                    var reg = registrationHelper.config.CompanyInformation.DunsNumber.pattern;
                    var result = reg.test('22-3$3-4444');
                    result.should.be.false;
                });

                it('format: xx-xxx-xxxx and only Numbers | 格式错误', function () {
                    var reg = registrationHelper.config.CompanyInformation.DunsNumber.pattern;
                    var result = reg.test('22-33-4444');
                    result.should.be.false;
                });

                it('format: xx-xxx-xxxx and only Numbers | 超过长度错误', function () {
                    var reg = registrationHelper.config.CompanyInformation.DunsNumber.pattern;
                    var result = reg.test('22-333-4444x');
                    result.should.be.false;
                });
            });

            describe('Upload File Name', function () {
                it('File name cannot contain Chinese and length less than 75.', function () {
                    var reg = registrationHelper.config.UploadFile.filenamePattern;
                    var result = reg.test('test-FileName');
                    result.should.be.true;
                });

                it('File name cannot contain Chinese and length less than 75. | 长度为0错误', function () {
                    var reg = registrationHelper.config.UploadFile.filenamePattern;
                    var result = reg.test('');
                    result.should.be.false;
                });

                it('File name cannot contain Chinese and length less than 75. | 包含中文错误', function () {
                    var reg = registrationHelper.config.UploadFile.filenamePattern;
                    var result = reg.test('test-File哈哈Name');
                    result.should.be.false;
                });

                it('File name cannot contain Chinese and length less than 75. | 超过75长度错误', function () {
                    var reg = registrationHelper.config.UploadFile.filenamePattern;
                    var result = reg.test('test-FileNameFileNameFileNameFileNameFileNameFileNameFileNameFileNameFileNameFileName');
                    result.should.be.false;
                });
            });

        });

        describe('init data funtion', function() {
           // this.timeout(15000);
            it('需要等待下拉框数据API请求都成功之后，callback才执行', function () {
                registrationHelper.initData(function() {
                    console.log(registrationHelper.poData.vendortype);
                });
                
            });
            
        });
    });



});
