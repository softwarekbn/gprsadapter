export  class ResourceURI {
    private static host = 'http://192.168.1.10:5000';
    // private static hostP = 'http://192.168.1.10:5000/api/victor/';
    // private static hostl = 'http://192.168.1.10:5005';
    public static pLogin = ResourceURI.host + '/login';  // for login post api

    
                                //All GET API
    //uploads leads file
    public static pUploadLeads = ResourceURI.host + '/api/Leads/ExcelUpload';
    // assignee list
   // public static gAssigneeList = ResourceURI.host + '/api/account/Users?userName=@userNameMobile' ;

    // count of different leads
    public static gLeadCount = ResourceURI.host + '/api/Leads/leadStatusCounts?username=';

    // get raw leads by userName
    public static gRawLeads =ResourceURI.host + '/api/Leads/Company/RawLeads?userName=';
     
    // get raw leads by companyId
     public static gRawLeadsCmp =ResourceURI.host + '/api/Leads/Company/RawLeads?companyId=';

    //get leads by statusId
    //'/api/Leads/Company?username=vedagya19&statusid='
    public static gLeadsByStatusId =ResourceURI.host + '/api/Leads/Company?username=';

    // get raw leads 10 at a time with page number
    public static gTenRawLeadsPno =ResourceURI.host + '/api/leads/Company/RawLeadsWithPaging?userName=';
                   
    // '/api/leads/Company/RawLeadsWithPaging?userName=vedagya19&pagesize=10&pagenumber=';
    // get raw leads 10 at a time with page number
    public static gTenRawLeadsPnoN =ResourceURI.host + 
                    '/api/leads/Company/RawLeadsWithPaging?userName=';
    // post a project
    public static pProject = ResourceURI.host + '/api/Account/Project';

    // get all documents
    ///api/Account/Projects?userName=vedagya19
    public static gAllDocuments = ResourceURI.host + '/api/Account/Projects?userName=';

    // get documents of a project by projectId
    public static gDocumentByProjectID = ResourceURI.host + '/api/Account/Project/';

    // post document of a project
    //http://api.victorcalls.com/api/account/Project/1/Document
    public static pDocumentOfProject = ResourceURI.host + '/api/account/Project/';

    // public static pAddUserP = ResourceURI.hostP+ 'addUser';
    //api/account/register:   http://api.victorcalls.com/api/account/register
    public static pAddUser = ResourceURI.host + '/api/account/register';
    //add device
    public static pDevice = ResourceURI.host + '/api/Account/Device';
    //http://api.victorcalls.com/api/Account/Users?userName=vedagya19: get user
    //http://api.victorcalls.com/api/Account/Roles : get user role
    //
    public static gUserRole = ResourceURI.host + '/api/Account/Roles';
//http://api.victorcalls.com/api/Account/Projects?userName=vedagya19
    public static gUserProject = ResourceURI.host +'/api/Account/Projects?userName=';

    //update user
    public static uUser = ResourceURI.host +'/api/account/User';

    //delete user
    public static dUser = ResourceURI.host +'/api/account/delete';
    
    // get user by login userName
    public static gUser = ResourceURI.host + '/api/Account/Users/';

    // get device by login userName
    public static gDevice = ResourceURI.host + '/api/Account/Device';
    public static gProtocol = ResourceURI.host + '/api/Account/Device/';
    public static gObject = ResourceURI.host + '/api/Account/Device/';

    // get user by companyId
    public static gUserCmp = ResourceURI.host + '/api/Account/Users?companyId=';

    //get companies http://api.victorcalls.com/api/Account/Companies
    public static gCompanies = ResourceURI.host + '/api/Account/Companies';

    public static gCompany = ResourceURI.host + '/api/Account/Company';

    //PUT: update company
    //http://api.victorcalls.com/api/Account/Company/<companyId>
    public static uCompany = ResourceURI.host + '/api/Account/Company/';
  
// add company: POST
    public static pCompany = ResourceURI.host + '/api/Account/Company/';

    public static dCompany = ResourceURI.host + '/api/Account/Company/delete';

    //  getting integrations of a company - 
    //http://api.victorcalls.com/api/Account/Company/1/Integrations
    public static gIntegrataions = ResourceURI.host + '/api/Account/Company/';

    //getting particular integration 
    //http://api.victorcalls.com/api/Account/Company/1/Integrations/1
    //public static gIntegration = ResourceURI.host + '/api/Account/Company/1/Integrations/1';

   //http://api.victorcalls.com/api/Account/Company/1/Integrations
   public static pIntegration = ResourceURI.host + '/api/Account/Company/';

   //http://api.victorcalls.com/api/account/projects?userName=vedagya19  get projects
   

   // get projects list
   public static gAllProjects = ResourceURI.host +'/api/account/projects?userName=';

   //get project by companyId
   public static gProjectsOfCompany = ResourceURI.host+ '/api/Account/Projects?companyId=';


   //post seleted leads
   public static pLeads = ResourceURI.host +'/api/Leads/';

   //http://api.victorcalls.com/api/account/Project/1/Users  get users
   public static gUsers = ResourceURI.host +'/api/account/Project/';

   //get locations
  // public static gLocations = ResourceURI.host + 'api/leads/locations?userName=';

  //50.62.160.53/ph12513175871/Modinagar@7/21
  public static gLocations = ResourceURI.host + '/api/leads/locations?userName=';

  //get Api for getting Leads
  //api/Leads/Company?CompanyID=1&statusid=2
  public static gLeadsWithStatusIdAndCompanyId = ResourceURI.host + '/api/Leads/Company?CompanyID=';

  //get rawLeads by companyId with pagination
    public static gRawLeadsByCompId = ResourceURI.host + '/api/Leads/Company/RawLeadsWithPaging?CompanyID=';
///api/account/LeadSource/Validate?startDate=09/11/2018&endDate=11/11/2018&CompanyId=46
    public static pTestIntegration = ResourceURI.host + '/api/account/LeadSource/Validate?';


    //http://192.168.1.10:5005/api/companies/

    //  public static gtestapi = ResourceURI.hostl + '/api/companies/';
}