'use strict';
describe('controller: vf-self-testing-connection', function () {

    var scope;
    var rootScope;
    var ctrl;
    var filter;
    var currentDate;
    var pageContent;
    var common;
    var $httpBackend;
    var temp_ftpItem;
    var temp_as2Item;

    beforeEach(module('negServices')); //include common
    beforeEach(module('vf-cache-apiSetting')); //include apiSetting
    beforeEach(module('pascalprecht.translate')); //include $translate
    beforeEach(module('vf-api-self-testing')); //include api
    beforeEach(module('vf-cache-self-testing')); //include cache
    beforeEach(module('angularFileUpload'));
    beforeEach(module('vf-self-testing-connection'));

    beforeEach(inject(function ($rootScope, $controller, _common_, $filter, _$templateCache_, _$compile_,$compile,$routeParams) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        ctrl = $controller('SelfTestingConnectionCtrl', {
            $scope: scope,
            common: _common_,
            $routeParams:{action:'add'}
        });

        filter = $filter;
        common = _common_;
        common.currentUser = { VendorNumber: '0', ID: '47de65c5-2701-460a-b758-016280d7f12a' }
        //$compile(angular.element(pageContent))(scope);
    }));

    describe('Function Test', function () {
        //Common
        describe('Common', function() {

        });

        //Module - Survey
        describe('Module - Survey', function () {
            describe('Maxlength', function(){
                it('should have maxlength',function(){
                    scope.should.have.property('maxlength');
                });

                it('max length of ConnectionName should be 100', function() {
                    scope.maxlength.connectionName.should.be.eql(100);
                });
                it('max length of server should be 150', function() {
                    scope.maxlength.server.should.be.eql(150);
                });
                it('max length of userName should be 50', function() {
                    scope.maxlength.userName.should.be.eql(50);
                });
                it('max length of password should be 50', function() {
                    scope.maxlength.password.should.be.eql(50);
                });
                it('max length of directory should be 250', function() {
                    scope.maxlength.directory.should.be.eql(250);
                });
                it('max length of as2id should be 150', function() {
                    scope.maxlength.as2id.should.be.eql(40);
                });
                it('max length of as2url should be 250', function() {
                    scope.maxlength.as2url.should.be.eql(250);
                });
            });
        });

        describe('Module - Validator', function() {
            it('url should be valid',function(){
                scope.should.have.property('urlReg');
                var reg = scope.urlReg;
                var result1 = reg.test('asdfasdf');
                result1.should.be.equal(false);

                var result2 = reg.test('http://as2.newegg.com/eaas-test/receive');
                result2.should.be.equal(true);

                var result3 = reg.test('http://192.168.1.10:4000');
                result3.should.be.equal(true);

                var result4 = reg.test('https://10.1.41.27/1MoveIn/EDIMoveIn/Domain/ExtMKT/%5B20151008%5DCRL4736_Rosewill_HomeDepot_fix/');
               result4.should.be.equal(true);
                
               var result5 = reg.test('http://');
               result5.should.be.equal(false);

               var result6 = reg.test('ftp://192.168.1.10');
               result6.should.be.equal(false);



            });

            it('directory should be valid',function(){
                scope.should.have.property('directoryReg');
                var reg = scope.directoryReg;
                var result1 = reg.test('inbound');
                result1.should.be.equal(false);

                var result2 = reg.test('/inbound');
                result2.should.be.equal(true);

                var result3 = reg.test('/inbound/');
                result3.should.be.equal(false);

                var result4 = reg.test('/inbound/?');
                result4.should.be.equal(false);

                var result5 = reg.test('/inbound/*');
                result5.should.be.equal(false);

                var result6 = reg.test('/inbound/新建文件夹');
                result6.should.be.equal(true);

                var result7 = reg.test('inbound/新建文件夹/');
                result7.should.be.equal(false);


            });
        });


    });

    describe('Unit Test', function () {
        it('should have connectionTypeList',function(){
            var list = [{
                text: 'Test Connection',
                value: 'Test'
            }, {
                text: 'Production Connection',
                value: 'Production'
            }];
            scope.should.have.property('connectionTypeList');
            scope.connectionTypeList.should.be.eql(list);
        });

        it('should have connectionProtocolList',function(){
            var list = [{
                text: 'AS2',
                value: 'AS2'
            }, {
                text: 'FTP',
                value: 'FTP'
            }];
            scope.should.have.property('connectionProtocolList');
            scope.connectionProtocolList.should.be.eql(list);
        });

        it('should have entity',function(){
            var entity = {
                ConnectionType: "Test",
                ConnectionProtocol: "AS2"
            };
            scope.should.have.property('entity');
            scope.entity.should.be.eql(entity);
        });

        it('should have default VendorAS2Profile',function(){
            var entity = {
                Encryption: "DES3",
                Signing: "SHA1"
            };
            scope.entity.should.have.not.property('VendorAS2Profile');
            scope.initAS2Profile();
            scope.entity.VendorAS2Profile.should.be.eql(entity);
        });

        it('should have NeweggCerAddress',function(){
            var address = {
                Test: 'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg_Testing_AS2_Public.cer',
                Production: 'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg_Production_AS2_Public.cer'
            };
            scope.neweggCerAddress.should.be.eql(address);
        });

        describe('init',function(){
            it('add connection',function(){
                var entity = {
                    ConnectionType:"Test",
                    ConnectionProtocol:"AS2"
                };
                scope.initConnection();
                scope.entity.should.be.eql(entity);
            });

            it('init AS2 Profile|ConnectionProtocol:FTP', function() {
                scope.entity.ConnectionProtocol = 'FTP';
                scope.initAS2Profile();

                scope.entity.should.have.not.property('VendorAS2Profile');
            });
        });

        describe('Connection request item', function () {
            beforeEach(function(){
                temp_ftpItem = {
                    "ConnectionType": "Test",
                    "ConnectionProtocol": "FTP",
                    "VendorFtpProfile": {
                        "Port": "21",
                        "Server": "10.1.24.161",
                        "UserName": "Test",
                        "Password": "aaa",
                        "InboundDirectory": "/inbound",
                        "OutboundDirectory": "/outbound"
                    },
                    "ConnectionName": "Test_FTP_Connect_23381",
                };

                temp_as2Item = {
                    "ConnectionType": "Test",
                    "ConnectionProtocol": "AS2",
                    "NeweggAS2Profile": {
                        "ID": "NeweggQT",
                        "Url": "http://as2.newegg.com/eaas-test/receive",
                        "Encryption": "DES3",
                        "Signing": "SHA1"
                    },
                    "VendorAS2Profile": {
                        "Encryption": "RC2",
                        "Signing": "SHA1",
                        "ID": "test",
                        "Url": "http://as2.newegg.com/eaas-test/receive"
                    },
                    "ConnectionName": "Test_AS2_23381",
                    "VendorCertificate": {
                        "CertificateId": "480153ca-8af2-4bdd-952b-0a78eaadbe1c",
                        "FileName": "secure.editrader.net 2018 BASE64..cer",
                        "DownloadAddress": "http://10.1.24.144:8021/EDI/VendorPortal/secure.editrader.net%202018%20BASE64..3decf393-eae4-4f41-8574-e38ed26df401.cer",
                        "Subject": "CN=secure.editrader.net, OU=Domain Control Validated - QuickSSL(R) Premium, OU=See www.geotrust.com/resources/cps (c)14, OU=GT44979214, SERIALNUMBER=PKCYOjzAL2-zXkGkfuUUlResLY/JnAFC",
                        "ThumbPrint": "27E6BC7781D7AD2299F55902DDCF74C70C3AF3D6",
                        "IssueTo": "secure.editrader.net",
                        "IssueBy": "GeoTrust DV SSL CA",
                        "ValidFrom": "/Date(1390137977000+0800)/",
                        "ValidTo": "/Date(1524443103000+0800)/",
                        "SerialNumber": "085E57",
                        "SignatureAlgorithm": "sha1RSA",
                        "Succeed": true,
                        "message": ""
                    },
                    "action1": "connection",
                    "RequestUser": "47de65c5-2701-460a-b758-016280d7f12a",
                    "VendorNumber": "23381"
                };
            });
            it('save FTP connection',function(){
                var expectEntity = {
                    "ConnectionType": "Test",
                    "ConnectionProtocol": "FTP",
                    "VendorFtpProfile": {
                        "Port": "21",
                        "Server": "10.1.24.161",
                        "UserName": "Test",
                        "Password": "aaa",
                        "InboundDirectory": "/inbound",
                        "OutboundDirectory": "/outbound"
                    },
                    "ConnectionName": "Test_FTP_Connect_23381",
                    "action1": "connection",
                    "RequestUser": common.currentUser.ID,
                    "VendorNumber": common.currentUser.VendorNumber
                };
                var actualEntity = scope.getConnectionRequestItem(temp_ftpItem,undefined);
                expectEntity.should.be.eql(actualEntity);
            });
            it('submit FTP connection',function(){
                var expectEntity = {
                    "ConnectionType": "Test",
                    "ConnectionProtocol": "FTP",
                    "VendorFtpProfile": {
                        "Port": "21",
                        "Server": "10.1.24.161",
                        "UserName": "Test",
                        "Password": "aaa",
                        "InboundDirectory": "/inbound",
                        "OutboundDirectory": "/outbound"
                    },
                    "ConnectionName": "Test_FTP_Connect_23381",
                    "action1": "connection",
                    "action2": "submit",
                    "RequestUser": common.currentUser.ID,
                    "VendorNumber": common.currentUser.VendorNumber
                };
                var actualEntity = scope.getConnectionRequestItem(temp_ftpItem,'submit');
                expectEntity.should.be.eql(actualEntity);
            });
            it('save as2 connection',function(){
                var expectEntity = {
                    "ConnectionType": "Test",
                    "ConnectionProtocol": "AS2",
                    "NeweggAS2Profile": {
                        "ID": "NeweggQT",
                        "Url": "http://as2.newegg.com/eaas-test/receive",
                        "Encryption": "DES3",
                        "Signing": "SHA1"
                    },
                    "VendorAS2Profile": {
                        "Encryption": "RC2",
                        "Signing": "SHA1",
                        "ID": "test",
                        "Url": "http://as2.newegg.com/eaas-test/receive"
                    },
                    "ConnectionName": "Test_AS2_23381",
                    "VendorCertificate": {
                        "CertificateId": "480153ca-8af2-4bdd-952b-0a78eaadbe1c",
                        "FileName": "secure.editrader.net 2018 BASE64..cer",
                        "DownloadAddress": "http://10.1.24.144:8021/EDI/VendorPortal/secure.editrader.net%202018%20BASE64..3decf393-eae4-4f41-8574-e38ed26df401.cer",
                        "Subject": "CN=secure.editrader.net, OU=Domain Control Validated - QuickSSL(R) Premium, OU=See www.geotrust.com/resources/cps (c)14, OU=GT44979214, SERIALNUMBER=PKCYOjzAL2-zXkGkfuUUlResLY/JnAFC",
                        "ThumbPrint": "27E6BC7781D7AD2299F55902DDCF74C70C3AF3D6",
                        "IssueTo": "secure.editrader.net",
                        "IssueBy": "GeoTrust DV SSL CA",
                        "ValidFrom": "/Date(1390137977000+0800)/",
                        "ValidTo": "/Date(1524443103000+0800)/",
                        "SerialNumber": "085E57",
                        "SignatureAlgorithm": "sha1RSA",
                        "Succeed": true,
                        "message": ""
                    },
                    "action1": "connection",
                    "RequestUser": common.currentUser.ID,
                    "VendorNumber": common.currentUser.VendorNumber
                };
                var actualEntity = scope.getConnectionRequestItem(temp_as2Item,undefined);
                expectEntity.should.be.eql(actualEntity);
            });
            it('submit as2 connection',function(){
                var expectEntity = {
                    "ConnectionType": "Test",
                    "ConnectionProtocol": "AS2",
                    "NeweggAS2Profile": {
                        "ID": "NeweggQT",
                        "Url": "http://as2.newegg.com/eaas-test/receive",
                        "Encryption": "DES3",
                        "Signing": "SHA1"
                    },
                    "VendorAS2Profile": {
                        "Encryption": "RC2",
                        "Signing": "SHA1",
                        "ID": "test",
                        "Url": "http://as2.newegg.com/eaas-test/receive"
                    },
                    "ConnectionName": "Test_AS2_23381",
                    "VendorCertificate": {
                        "CertificateId": "480153ca-8af2-4bdd-952b-0a78eaadbe1c",
                        "FileName": "secure.editrader.net 2018 BASE64..cer",
                        "DownloadAddress": "http://10.1.24.144:8021/EDI/VendorPortal/secure.editrader.net%202018%20BASE64..3decf393-eae4-4f41-8574-e38ed26df401.cer",
                        "Subject": "CN=secure.editrader.net, OU=Domain Control Validated - QuickSSL(R) Premium, OU=See www.geotrust.com/resources/cps (c)14, OU=GT44979214, SERIALNUMBER=PKCYOjzAL2-zXkGkfuUUlResLY/JnAFC",
                        "ThumbPrint": "27E6BC7781D7AD2299F55902DDCF74C70C3AF3D6",
                        "IssueTo": "secure.editrader.net",
                        "IssueBy": "GeoTrust DV SSL CA",
                        "ValidFrom": "/Date(1390137977000+0800)/",
                        "ValidTo": "/Date(1524443103000+0800)/",
                        "SerialNumber": "085E57",
                        "SignatureAlgorithm": "sha1RSA",
                        "Succeed": true,
                        "message": ""
                    },
                    "action1": "connection",
                    "action2": "submit",
                    "RequestUser": common.currentUser.ID,
                    "VendorNumber": common.currentUser.VendorNumber
                };
                var actualEntity = scope.getConnectionRequestItem(temp_as2Item,"submit");
                expectEntity.should.be.eql(actualEntity);
            });
        });
    });

});
