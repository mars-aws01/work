var NEG = NEG || {};

NEG.title = "Newegg Vendor Portal";
NEG.Env = "gqc";
NEG.debug = false;
NEG.DomainName = "VendorPortal";
//Log的相关配置，主要用于记录客户端的Log
NEG.LogGlobal = "VendorPortal";
NEG.LogLocal = "Client";
NEG.LogCategory = "ExceptionLog";

NEG.PortalTokenKey = "x-vp-token";
NEG.HomeRoutePath = "/";

NEG.languages = {
    'en-us': "English",
    'zh-cn': '简体中文',
    'zh-tw': '繁體中文'
}

if (NEG.Env === "gdev") {
    NEG.NewkitAPI = "http://10.16.75.30:9015/api"; // Newkit自身API地址，请不要修改
    NEG.MpsApi = "http://scmisbiztalk01:8100/vendor-portal/v1/user";
    NEG.APIGatewayAddress = "http://10.16.75.24:3000"; //Gateway地址，用于拼接API地址
    NEG.VendorPortal_API = "http://scmisbiztalk01:8100/vendor-portal";  //http://10.16.75.24:3000/vendor-portal
    NEG.PO_DFIS_URL = "http://10.1.24.133/POFile/Vendorattachment/";
    NEG.PO_EIMS_API = "http://10.16.76.248:9102";
    NEG.IMCreation_DFIS_URL = "http://10.1.24.133/IMCreation/";
    NEG.Applications =
    {
        "Newkit": "1f48a705-b734-476c-b32b-29359177c122",
        "NeweggCentral": "dfbc65d8-9205-4336-9521-647f450d8b43",
        "EDI": "8767a1d1-7efe-4666-8646-e0e97bb073e2"
    }
}
else if (NEG.Env === "gqc") {
    NEG.NewkitAPI = "http://10.1.24.130:3000/newegg-central-2/v1"; // Newkit自身API地址，请不要修改
    NEG.MpsApi = "http://10.1.24.188:8899/sandbox/V1";
    NEG.APIGatewayAddress = "http://10.16.75.24:3000"; //Gateway地址，用于拼接API地址 http://10.1.24.130:3000
    NEG.VendorPortal_API = "http://10.1.24.130:3000/vendor-portal"; //   http://10.1.24.130:3000/vendor-portal
    NEG.PO_DFIS_URL = "http://10.1.24.133/POFile/Vendorattachment/";
    NEG.PO_EIMS_API = "http://10.16.76.248:9102";
    NEG.IMCreation_DFIS_URL = "http://10.1.24.133/IMCreation/";
    NEG.Applications =
    {
        "NeweggCentral 2.0": "4b60ee12-3754-4992-9ad5-019a90534302"
    }
}
else if (NEG.Env === "prd-testing") {
    NEG.NewkitAPI = "http://sandboxapis.newegg.org/newegg-central-2/v1"; // Newkit自身API地址，请不要修改
    NEG.MpsApi = "http://10.16.75.30:8899/mps/v1";
    NEG.APIGatewayAddress = "http://sandboxapis.newegg.org"; //Gateway地址，用于拼接API地址  http://sandboxapis.newegg.org
    NEG.VendorPortal_API = "http://sandboxapis.newegg.org/vendor-portal";  //https://apis.newegg.com/vendor-portal   
    NEG.PO_DFIS_URL = "https://ssl-images.newegg.com/POFile/Vendorattachment/";
    NEG.PO_EIMS_API = "http://10.16.76.248:9102";
    NEG.IMCreation_DFIS_URL = "https://ssl-images.newegg.com/IMCreation/";
    NEG.Applications =
    {
        "NeweggCentral 2.0": "0915dbb7-27f5-4740-9e50-2bc9c0fb3378"
    }
}
else if (NEG.Env === "prd") {
    NEG.NewkitAPI = "https://apis.newegg.org/newegg-central-2/v1"; // Newkit自身API地址，请不要修改
    NEG.MpsApi = "http://10.16.75.30:8899/mps/v1";
    NEG.APIGatewayAddress = "https://apis.newegg.com"; //Gateway地址，用于拼接API地址  http://sandboxapis.newegg.org
    NEG.VendorPortal_API = "https://apis.newegg.com/vendor-portal";  //https://apis.newegg.com/vendor-portal   http://sandboxapis.newegg.org/vendor-portal
    NEG.PO_DFIS_URL = "https://ssl-images.newegg.com/POFile/Vendorattachment/";
    NEG.PO_EIMS_API = "http://10.16.76.248:9102";
    NEG.IMCreation_DFIS_URL = "https://ssl-images.newegg.com/IMCreation/";
    NEG.Applications =
    {
        "NeweggCentral 2.0": "0915dbb7-27f5-4740-9e50-2bc9c0fb3378"
    }
}
