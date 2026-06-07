export interface DiscoInfo {
  id: string;
  name: string;
  fullName: string;
  prefix: string;
  urlPrefix: string;
  jurisdiction: string;
  shortDescription: string;
  faqs: { question: string; answer: string }[];
}

export const DISCO_DATA: Record<string, DiscoInfo> = {
  iesco: {
    id: "iesco",
    name: "IESCO",
    fullName: "Islamabad Electric Supply Company",
    prefix: "iesco",
    urlPrefix: "https://bill.pitc.com.pk/iescobill",
    jurisdiction: "Islamabad, Rawalpindi, Attock, Jhelum, and Chakwal",
    shortDescription: "Easily perform your IESCO online bill check for 2026. Retrieve your duplicate electricity bill securely by entering your 14-digit reference number. Instantly view, download, or print your Islamabad electricity bill.",
    faqs: [
      {
        question: "How can I check my IESCO bill online?",
        answer: "To perform an IESCO online bill check, simply select IESCO as your provider and enter your 14-digit reference number in our tool for an instant duplicate bill retrieval."
      },
      {
        question: "Where can I find my IESCO 14-digit reference number?",
        answer: "The 14-digit reference number for your electricity bill online check is printed on the top-left or top-right corner of your old physical WAPDA bill."
      },
      {
        question: "How to pay my IESCO duplicate bill online?",
        answer: "After checking your duplicate bill, you can pay via JazzCash, Easypaisa, or online banking by entering the same 14-digit reference number."
      }
    ]
  },
  lesco: {
    id: "lesco",
    name: "LESCO",
    fullName: "Lahore Electric Supply Company",
    prefix: "lesco",
    urlPrefix: "https://bill.pitc.com.pk/lescobill",
    jurisdiction: "Lahore, Kasur, Okara, and Sheikhupura",
    shortDescription: "Fast LESCO online bill check. Get your Lahore duplicate electricity bill online in seconds. Just enter your 14-digit reference number to view your WAPDA electricity bill online for 2026.",
    faqs: [
      {
        question: "How do I do a LESCO online bill check by reference number?",
        answer: "Enter your exact 14-digit LESCO reference number in the search form to check your duplicate electricity bill online."
      },
      {
        question: "Can I check my LESCO online bill by customer ID or name?",
        answer: "No, a LESCO online bill check by name or CNIC is not officially supported. You must use your 14-digit reference number or a 10-digit customer ID."
      },
      {
        question: "How do I download my LESCO duplicate bill as a PDF?",
        answer: "Once your bill is fetched using our online bill check Pakistan tool, click on the print button or use Ctrl+P to save it as a PDF document."
      }
    ]
  },
  mepco: {
    id: "mepco",
    name: "MEPCO",
    fullName: "Multan Electric Power Company",
    prefix: "mepco",
    urlPrefix: "https://bill.pitc.com.pk/mepcobill",
    jurisdiction: "Multan, Bahawalpur, Dera Ghazi Khan, and surrounding southern Punjab regions",
    shortDescription: "Looking for a MEPCO online bill check? Enter your 14-digit reference number for an instant MEPCO bill online check. Download your duplicate electricity bill for Multan and verify your WAPDA electricity bill easily.",
    faqs: [
      {
        question: "How can I get my MEPCO duplicate bill online?",
        answer: "Simply provide your 14-digit MEPCO reference number in our online electricity bill check portal to retrieve a free copy of your MEPCO duplicate bill."
      },
      {
        question: "Are there any charges for a MEPCO bill check online?",
        answer: "No, performing a MEPCO bill online check through our portal is completely free and instant for all Multan region consumers."
      },
      {
        question: "Can I receive MEPCO bill SMS alerts?",
        answer: "Yes, you can register for SMS alerts via the official www.mepco.com.pk portal to get your billing amounts delivered to your phone."
      }
    ]
  },
  gepco: {
    id: "gepco",
    name: "GEPCO",
    fullName: "Gujranwala Electric Power Company",
    prefix: "gepco",
    urlPrefix: "https://bill.pitc.com.pk/gepcobill",
    jurisdiction: "Gujranwala, Hafizabad, Sialkot, Narowal, Gujrat, and Mandi Bahauddin",
    shortDescription: "GEPCO online bill check 2026 made easy. Get your Gujranwala duplicate electricity bill online. Enter your 14-digit reference number to perform a secure WAPDA electricity bill online check.",
    faqs: [
      {
        question: "How do I perform a GEPCO online bill check?",
        answer: "Type your 14-digit reference number into our portal to instantly check your GEPCO duplicate bill online."
      },
      {
        question: "Is www.gepco.com.pk bill check online free?",
        answer: "Yes! Our platform provides a free, seamless 2026 WAPDA bill online check for all GEPCO customers in the Gujranwala region."
      },
      {
        question: "Can I do a GEPCO bill online check using my CNIC?",
        answer: "A valid 14-digit reference number is typically required. Checking purely by CNIC is not officially supported for GEPCO online bills."
      }
    ]
  },
  fesco: {
    id: "fesco",
    name: "FESCO",
    fullName: "Faisalabad Electric Supply Company",
    prefix: "fesco",
    urlPrefix: "https://bill.pitc.com.pk/fescobill",
    jurisdiction: "Faisalabad, Sargodha, Mianwali, Khushab, Jhang, Bhakkar, T.T Singh, and Chiniot",
    shortDescription: "Quick FESCO online bill check for Faisalabad. Easily perform your FESCO bill check online by entering your 14-digit reference number. Access your duplicate electricity bill instantly.",
    faqs: [
      {
        question: "How can I check my FESCO 14-digit duplicate bill online?",
        answer: "Find your 14-digit reference number from an old paper bill, select FESCO, and hit search to get your duplicate bill instantly."
      },
      {
        question: "Where can I find the FESCO bill check online portal?",
        answer: "You can securely use our tool which fetches the duplicate bill directly from the official www.fesco.com.pk servers."
      },
      {
        question: "How to print my previous FESCO bill online?",
        answer: "Once the FESCO bill check online process is complete and your bill is loaded, press Ctrl+P to print or save the previous month's duplicate bill."
      }
    ]
  },
  pesco: {
    id: "pesco",
    name: "PESCO",
    fullName: "Peshawar Electric Supply Company",
    prefix: "pesco",
    urlPrefix: "https://bill.pitc.com.pk/pescobill",
    jurisdiction: "Peshawar, Khyber, Swat, Mardan, Hazara, Bannu, Swabi, and surrounding areas",
    shortDescription: "PESCO online bill check 2026. Quickly check your Peshawar electric supply company duplicate bill online. Enter your 14-digit reference number for an accurate WAPDA electricity bill online check Pakistan.",
    faqs: [
      {
        question: "How to check my PESCO online bill?",
        answer: "Provide your 14-digit reference number to perform a highly accurate PESCO online bill check for the current or previous month."
      },
      {
        question: "What is required for www.pesco.gov.pk bill check online?",
        answer: "Only your 14-digit reference number is required to access your PESCO duplicate electricity bill."
      },
      {
        question: "Is it possible to do a PESCO bill check online by name?",
        answer: "Unfortunately, you cannot search by name. You must use your unique 14-digit reference number allocated by PESCO."
      }
    ]
  },
  hazeco: {
    id: "hazeco",
    name: "HAZECO",
    fullName: "Hazara Electric Supply Company",
    prefix: "hazeco",
    urlPrefix: "https://bill.pitc.com.pk/hazecobill",
    jurisdiction: "Hazara Division",
    shortDescription: "HAZECO online bill check for 2026. Get your Hazara electric supply company duplicate bill online. Simplify your electricity bill online check by just entering your 14-digit reference number securely.",
    faqs: [
      {
        question: "How to perform a HAZECO online bill check?",
        answer: "Select HAZECO from the list, input your 14-digit reference number, and we will secure your duplicate bill directly from the official portal."
      },
      {
        question: "Where is the 14-digit number for HAZECO bill check?",
        answer: "Look at the top left corner of any old physical HAZECO bill to locate your 14-digit reference number."
      },
      {
        question: "What is HAZECO?",
        answer: "HAZECO stands for Hazara Electric Supply Company, providing electricity distribution to the Hazara Division. Use our tool for your monthly HAZECO online bill check."
      }
    ]
  },
  hesco: {
    id: "hesco",
    name: "HESCO",
    fullName: "Hyderabad Electric Supply Company",
    prefix: "hesco",
    urlPrefix: "https://bill.pitc.com.pk/hescobill",
    jurisdiction: "Hyderabad, Nawabshah, Laar, and surrounding regions in Sindh",
    shortDescription: "Secure HESCO online bill check 2026. Retrieve your Hyderabad electric supply company duplicate bill in a flash. Perform a WAPDA bill online check using your 14 digit reference number today.",
    faqs: [
      {
        question: "How can I check my HESCO duplicate bill online?",
        answer: "Enter your exact 14-digit reference number in our online bill check Pakistan tool to retrieve your HESCO duplicate bill."
      },
      {
        question: "Can I check my HESCO bill online via SMS?",
        answer: "While you can check the HESCO bill online through our portal via internet, for SMS alerts, you need to register on the official HESCO website."
      },
      {
        question: "Where to do a HESCO bill online check for previous months?",
        answer: "By entering your 14-digit reference number, the portal fetches your latest HESCO online bill. Previous month totals are usually summarized inside the loaded bill."
      }
    ]
  },
  sepco: {
    id: "sepco",
    name: "SEPCO",
    fullName: "Sukkur Electric Power Company",
    prefix: "sepco",
    urlPrefix: "https://bill.pitc.com.pk/sepcobill",
    jurisdiction: "Sukkur, Larkana, Jacobabad, Shikarpur, Khairpur, Ghotki, Kashmor, and surrounding upper Sindh regions",
    shortDescription: "Check your SEPCO online bill for 2026 instantly. Enter your 14-digit reference number to view and download your Sukkur Electric Power Company duplicate electricity bill. Free, fast, and official.",
    faqs: [
      {
        question: "How do I check my SEPCO bill online?",
        answer: "Select SEPCO from the provider dropdown, enter your 14-digit reference number, and click 'Get Bill' to instantly retrieve your Sukkur Electric Power Company duplicate bill."
      },
      {
        question: "Which areas does SEPCO supply electricity to?",
        answer: "SEPCO (Sukkur Electric Power Company) distributes electricity to Sukkur, Larkana, Jacobabad, Shikarpur, Khairpur, Ghotki, Kashmor, and the surrounding upper Sindh districts."
      },
      {
        question: "Can I download my SEPCO duplicate bill as a PDF?",
        answer: "Yes. Once your SEPCO duplicate bill loads via our portal, use your browser's print function (Ctrl+P) and select 'Save as PDF' to keep a digital copy for bank payments or records."
      }
    ]
  },
  qesco: {
    id: "qesco",
    name: "QESCO",
    fullName: "Quetta Electric Supply Company",
    prefix: "qesco",
    urlPrefix: "https://bill.pitc.com.pk/qescobill",
    jurisdiction: "Quetta, Gwadar, Sibi, Zhob, Turbat, Khuzdar, Chaman, and surrounding Balochistan regions",
    shortDescription: "QESCO online bill check 2026. View and download your Quetta Electric Supply Company duplicate electricity bill in seconds. Enter your 14-digit reference number for an instant WAPDA bill check.",
    faqs: [
      {
        question: "How can I perform a QESCO online bill check?",
        answer: "Enter your 14-digit QESCO reference number in our bill checker and click 'Get Bill'. Your official duplicate bill from the PITC portal will be ready in seconds."
      },
      {
        question: "What areas fall under QESCO jurisdiction?",
        answer: "QESCO (Quetta Electric Supply Company) covers electricity distribution across Balochistan, including Quetta, Gwadar, Sibi, Zhob, Turbat, Khuzdar, and Chaman."
      },
      {
        question: "Is QESCO bill check online free?",
        answer: "Yes. Checking your QESCO duplicate electricity bill through our platform is completely free. No registration or account is required — just your 14-digit reference number."
      }
    ]
  },
  tesco: {
    id: "tesco",
    name: "TESCO",
    fullName: "Tribal Electric Supply Company",
    prefix: "tesco",
    urlPrefix: "https://bill.pitc.com.pk/tescobill",
    jurisdiction: "Tribal districts of Khyber Pakhtunkhwa including Khyber, Bajaur, Mohmand, Kurram, North Waziristan, South Waziristan, and Orakzai",
    shortDescription: "TESCO online bill check 2026. Check and download your Tribal Electric Supply Company duplicate electricity bill instantly. Use your 14-digit reference number for a secure WAPDA bill check.",
    faqs: [
      {
        question: "How do I check my TESCO electricity bill online?",
        answer: "Select TESCO from the provider list, enter your 14-digit reference number, and click 'Get Bill' to load your official Tribal Electric Supply Company duplicate bill."
      },
      {
        question: "Which tribal districts does TESCO serve?",
        answer: "TESCO (Tribal Electric Supply Company) provides electricity distribution to the merged tribal districts of KPK, including Khyber, Bajaur, Mohmand, Kurram, North Waziristan, South Waziristan, and Orakzai."
      },
      {
        question: "Where is my TESCO 14-digit reference number?",
        answer: "Your 14-digit TESCO reference number is printed at the top of any previous physical electricity bill. It is the primary key needed to fetch your duplicate bill online."
      }
    ]
  }
};

export const getAllDiscos = () => Object.values(DISCO_DATA);
