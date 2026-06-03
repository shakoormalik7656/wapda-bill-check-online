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
  }
};

export const getAllDiscos = () => Object.values(DISCO_DATA);
