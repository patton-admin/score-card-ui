//to get available visa types fro the application...
export const getAvailableVisaTypes = () => {
  return [
    { vid: "H1B", visaType: "H1B" },
    { vid: "USC", visaType: "USC" },
    { vid: "GC", visaType: "GC" },
    { vid: "H4", visaType: "H4" },
    { vid: "OPT", visaType: "OPT" },
    { vid: "TN", visaType: "TN" },
    { vid: "ANY VISA", visaType: "ANY VISA" },
  ];
};

//to get available priority fro the application...
export const getAvailablePriority = () => {
  return [
    { pid: "Exclusive", priorityType: "Exclusive" },
    { pid: "High", priorityType: "High" },
    { pid: "Low", priorityType: "Low" },
    { pid: "Medium", priorityType: "Medium" },
  ];
};

//to get available practice Area fro the application...
export const getAvailablePracticeArea = (state) => {
  let lovs = state.util.lovs;
  let lovList = lovs.map((e) => {
    e.displayStatusLov = e.status === true ? "1" : "0";
    return e;
  });
  // return [
  //   { prAreaid: "PrcplJ2ee", practiceArea: "Principal Java/J2EE" },
  //   { prAreaid: "FullstackJ2ee", practiceArea: "FullStack" },
  //   { prAreaid: "BackendJ2ee", practiceArea: "Backend Java/J2EE" },
  //   { prAreaid: "J2ee", practiceArea: "Sr.Java/J2EE" },
  //   { prAreaid: "J2eeDevCore", practiceArea: "Sr.Java Developer-Core" },
  //   { prAreaid: "J2eeKafka", practiceArea: "Sr.Java&kafka" },
  //   { prAreaid: "J2EEMule", practiceArea: "Sr.Java&Mulesoft" },
  //   { prAreaid: "NodeReact", practiceArea: "Sr.node&react" },
  //   { prAreaid: "Salesforce", practiceArea: "Salesforce" },
  //   { prAreaid: "Mulesoft", practiceArea: "Mulesoft" },
  //   { prAreaid: "BigData", practiceArea: "Big data" },
  //   { prAreaid: ".Net Developer", practiceArea: ".Net" },
  //   { prAreaid: "Java/J2EE", practiceArea: "Java/J2EE" },
  //   { prAreaid: "Analyst", practiceArea: "Analyst" },
  //   { prAreaid: "Embedded", practiceArea: "Embedded" },
  //   { prAreaid: "IOT", practiceArea: "Iot" },
  //   { prAreaid: "SAP", practiceArea: "SAP" },
  // ];

  // console.log("getAvailablePracticeArea -> lovList", lovList);
  return lovList;
};

//to get available practice Area fro the application...
export const getValidPracticeArea = (state) => {
  let lovs = state.util.lovs;
  let finalValidLovs = [];

  let lovList = lovs.map((e) => {
    e.displayStatusLov = e.status === true ? "1" : "0";
    return e;
  });
  if (lovList.length > 0) {
    finalValidLovs = lovList.filter((e) => e.status === true);
  }

  return finalValidLovs;
};
