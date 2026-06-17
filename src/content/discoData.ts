export interface DiscoInfo {
  id: string;
  name: string;
  fullName: string;
  prefix: string;
  urlPrefix: string;
  jurisdiction: string;
  /** Major cities/districts for city-level keyword targeting (cities[0] = primary city). */
  cities: string[];
  /** Power-sector complaint helpline. 118 is the universal national DISCO helpline.
   *  TODO (facts to verify): replace with the DISCO-specific helpline if you have it. */
  helpline: string;
  /** Official DISCO website, e.g. "www.iesco.com.pk". TODO: fill per DISCO when confirmed. */
  officialWebsite?: string;
  shortDescription: string;
  /** UNIQUE per-DISCO lead paragraph (1–2 sentences) shown in the hero. */
  intro: string;
  /** UNIQUE per-DISCO "About the company" block — company role + territory. */
  about: string;
  /** UNIQUE per-DISCO regional/load context — climate, usage pattern, local issues. */
  regionalContext: string;
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
    cities: ["Islamabad", "Rawalpindi", "Attock", "Jhelum", "Chakwal"],
    helpline: "118",
    shortDescription: "Easily perform your IESCO online bill check for 2026. Retrieve your duplicate electricity bill securely by entering your 14-digit reference number. Instantly view, download, or print your Islamabad electricity bill.",
    intro: "IESCO serves Pakistan's federal capital region, where government offices, planned residential sectors, and the twin-city sprawl of Islamabad and Rawalpindi create one of the country's most power-dependent urban load profiles.",
    about: "The Islamabad Electric Supply Company (IESCO) was carved out of WAPDA's distribution network to manage power across the Pothohar plateau. It supplies the federal capital, the garrison city of Rawalpindi, and the surrounding districts of Attock, Jhelum, and Chakwal — territory that blends high-density urban demand with scattered rural feeders. Because so many federal institutions and businesses sit inside its boundary, IESCO is held to a higher reliability standard than most distribution companies.",
    regionalContext: "Winters on the Pothohar belt are cold, and with frequent gas shortages many capital-region households switch to electric heaters, pushing December–February bills sharply higher. Tracking your IESCO consumption month to month is the easiest way to catch these seasonal spikes before they become unaffordable.",
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
    cities: ["Lahore", "Kasur", "Okara", "Sheikhupura", "Nankana Sahib"],
    helpline: "118",
    shortDescription: "Fast LESCO online bill check. Get your Lahore duplicate electricity bill online in seconds. Just enter your 14-digit reference number to view your WAPDA electricity bill online for 2026.",
    intro: "LESCO powers Lahore — Pakistan's second-largest city — making it one of the busiest and most complaint-heavy distribution companies in the country.",
    about: "The Lahore Electric Supply Company (LESCO) distributes electricity across Lahore, Kasur, Okara, Sheikhupura, and Nankana Sahib. Its network covers a uniquely dense blend of historic walled-city neighbourhoods, sprawling modern housing societies, and heavy commercial and light-industrial zones. The sheer concentration of consumers in metropolitan Lahore means LESCO processes more bills — and more billing disputes — than almost any other DISCO.",
    regionalContext: "Lahore summers are brutal, and round-the-clock air-conditioning from April to September is the single biggest driver of high LESCO bills. Shifting heavy appliance use out of the 6–10 PM peak window and checking your duplicate bill monthly are the two most effective ways city residents keep costs under control.",
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
    cities: ["Multan", "Bahawalpur", "Dera Ghazi Khan", "Khanewal", "Vehari", "Rahim Yar Khan"],
    helpline: "118",
    shortDescription: "Looking for a MEPCO online bill check? Enter your 14-digit reference number for an instant MEPCO bill online check. Download your duplicate electricity bill for Multan and verify your WAPDA electricity bill easily.",
    intro: "MEPCO is the largest distribution company in Pakistan by area, stretching across the vast agricultural plains of southern Punjab.",
    about: "The Multan Electric Power Company (MEPCO) supplies a huge territory including Multan, Bahawalpur, Dera Ghazi Khan, Khanewal, Vehari, and Rahim Yar Khan. Unlike the compact urban DISCOs, MEPCO's load is dominated by agriculture — thousands of tube-wells irrigating the cotton and wheat belt — alongside the urban centres of the old Multan division. This makes it one of the most operationally complex networks in the country.",
    regionalContext: "Southern Punjab records some of the hottest temperatures in Pakistan, and the mix of extreme summer heat and heavy agricultural tube-well usage means MEPCO consumers face large seasonal swings. Farmers on agricultural tariffs especially benefit from checking their bills online each month to verify units and tariff category.",
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
    cities: ["Gujranwala", "Hafizabad", "Sialkot", "Narowal", "Gujrat", "Mandi Bahauddin"],
    helpline: "118",
    shortDescription: "GEPCO online bill check 2026 made easy. Get your Gujranwala duplicate electricity bill online. Enter your 14-digit reference number to perform a secure WAPDA electricity bill online check.",
    intro: "GEPCO serves Pakistan's industrial heartland — the Gujranwala–Sialkot manufacturing corridor.",
    about: "The Gujranwala Electric Power Company (GEPCO) covers Gujranwala, Hafizabad, Sialkot, Narowal, Gujrat, and Mandi Bahauddin. The region is an export powerhouse — Sialkot's surgical instruments and sports goods, Gujranwala's fans and ceramics, Gujrat's electrical industry — so GEPCO carries an unusually high share of small and medium industrial load alongside its residential consumers. It is also consistently among the better-performing DISCOs in bill recovery.",
    regionalContext: "Because so many households in the GEPCO belt also run home-based manufacturing units, electricity costs feed directly into business margins. Regularly checking your GEPCO duplicate bill online helps both households and small workshops track consumption and budget for the tariff and fuel-adjustment changes that hit industrial users hardest.",
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
    cities: ["Faisalabad", "Sargodha", "Mianwali", "Khushab", "Jhang", "Bhakkar", "Toba Tek Singh", "Chiniot"],
    helpline: "118",
    shortDescription: "Quick FESCO online bill check for Faisalabad. Easily perform your FESCO bill check online by entering your 14-digit reference number. Access your duplicate electricity bill instantly.",
    intro: "FESCO powers Faisalabad — the textile capital of Pakistan — and the surrounding agricultural districts of central Punjab.",
    about: "The Faisalabad Electric Supply Company (FESCO) supplies Faisalabad, Sargodha, Mianwali, Khushab, Jhang, Bhakkar, Toba Tek Singh, and Chiniot. Its network balances one of the country's densest concentrations of textile mills and power looms against a large rural base, including the Sargodha citrus belt. FESCO is widely regarded as one of the most efficient distribution companies, with relatively strong recovery and lower line losses.",
    regionalContext: "Power-loom and textile units across the Faisalabad division mean many domestic connections sit close to heavy commercial load, where peak-hour pricing bites hardest. Checking your FESCO bill online each month lets you confirm your tariff slab and spot the seasonal jump that comes with summer irrigation and cooling demand.",
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
    cities: ["Peshawar", "Mardan", "Swat", "Swabi", "Bannu", "Khyber", "Charsadda", "Nowshera"],
    helpline: "118",
    shortDescription: "PESCO online bill check 2026. Quickly check your Peshawar electric supply company duplicate bill online. Enter your 14-digit reference number for an accurate WAPDA electricity bill online check Pakistan.",
    intro: "PESCO distributes electricity across most of Khyber Pakhtunkhwa, one of the most challenging operating environments in the country.",
    about: "The Peshawar Electric Supply Company (PESCO) covers Peshawar, Mardan, Swat, Swabi, Bannu, Charsadda, Nowshera, and the Khyber region. Its territory ranges from dense provincial-capital neighbourhoods to remote mountain valleys, and the company has historically struggled with high line losses and load-shedding. For consumers, that makes accurate, on-demand access to bills especially important.",
    regionalContext: "Cold northern winters drive heavy use of electric heating across the KP plains and valleys, while summer cooling load rises in Peshawar and Mardan. With load-shedding and billing irregularities a common complaint in the region, checking your PESCO duplicate bill online is the quickest way to verify charges and lodge a complaint with your reference number when something looks wrong.",
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
    cities: ["Abbottabad", "Mansehra", "Haripur", "Battagram", "Kohistan", "Torghar"],
    helpline: "118",
    shortDescription: "HAZECO online bill check for 2026. Get your Hazara electric supply company duplicate bill online. Simplify your electricity bill online check by just entering your 14-digit reference number securely.",
    intro: "HAZECO is one of Pakistan's newest distribution companies, created to serve the scenic Hazara Division of Khyber Pakhtunkhwa.",
    about: "The Hazara Electric Supply Company (HAZECO) was carved out of PESCO's network to focus on the Hazara Division — Abbottabad, Mansehra, Haripur, Battagram, Kohistan, and Torghar. The region is mountainous and hydropower-rich, with a mix of small towns, hill stations, and dispersed rural settlements that make distribution physically demanding. As a young company, HAZECO is still building out its consumer services.",
    regionalContext: "Hazara's cooler, hilly climate means lower summer air-conditioning load than the plains, but winter electric heating in towns like Abbottabad and tourist demand in the Galiyat can lift bills seasonally. Because HAZECO is newly separated from PESCO, checking your bill online with your 14-digit reference number is the most reliable way to confirm your account details.",
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
    cities: ["Hyderabad", "Nawabshah", "Mirpur Khas", "Badin", "Thatta", "Tando Allahyar"],
    helpline: "118",
    shortDescription: "Secure HESCO online bill check 2026. Retrieve your Hyderabad electric supply company duplicate bill in a flash. Perform a WAPDA bill online check using your 14 digit reference number today.",
    intro: "HESCO serves the hot, humid districts of lower Sindh around Hyderabad.",
    about: "The Hyderabad Electric Supply Company (HESCO) supplies Hyderabad, Nawabshah, Mirpur Khas, Badin, Thatta, and Tando Allahyar. The network combines the urban load of Hyderabad — Sindh's second city — with extensive rural and agricultural feeders across the lower Indus belt. Like other Sindh DISCOs, HESCO contends with high line losses and a large agricultural consumer base.",
    regionalContext: "Lower Sindh's intense, humid heat keeps cooling demand high for much of the year, so HESCO consumers often see sustained high consumption rather than short seasonal spikes. Reviewing your HESCO duplicate bill online each month helps you track units, confirm your tariff, and quickly flag overbilling on dense urban feeders.",
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
    cities: ["Sukkur", "Larkana", "Jacobabad", "Shikarpur", "Khairpur", "Ghotki", "Kashmor"],
    helpline: "118",
    shortDescription: "Check your SEPCO online bill for 2026 instantly. Enter your 14-digit reference number to view and download your Sukkur Electric Power Company duplicate electricity bill. Free, fast, and official.",
    intro: "SEPCO powers upper Sindh, a region that records some of the highest temperatures on earth.",
    about: "The Sukkur Electric Power Company (SEPCO) was separated from HESCO to manage upper Sindh — Sukkur, Larkana, Jacobabad, Shikarpur, Khairpur, Ghotki, and Kashmor. Its load is heavily agricultural, with extensive tube-well irrigation along the Indus, alongside the urban centres of Sukkur and Larkana. The region's extreme climate and large rural network make reliable supply a constant challenge.",
    regionalContext: "Jacobabad in the SEPCO belt is regularly among the hottest places on the planet, and summer cooling and agricultural load push consumption to extremes. For farmers and households alike, checking the SEPCO bill online is the simplest way to verify units and tariff before paying.",
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
    cities: ["Quetta", "Gwadar", "Sibi", "Zhob", "Turbat", "Khuzdar", "Chaman"],
    helpline: "118",
    shortDescription: "QESCO online bill check 2026. View and download your Quetta Electric Supply Company duplicate electricity bill in seconds. Enter your 14-digit reference number for an instant WAPDA bill check.",
    intro: "QESCO covers Balochistan — by far the largest and most sparsely populated distribution territory in Pakistan.",
    about: "The Quetta Electric Supply Company (QESCO) supplies the entire province of Balochistan, from Quetta and Gwadar to Sibi, Zhob, Turbat, Khuzdar, and Chaman. Power has to travel enormous distances across thinly populated terrain, and the network carries a very large share of subsidised agricultural tube-well load. This combination of vast geography and heavy farm usage makes QESCO operationally unique among the DISCOs.",
    regionalContext: "Balochistan swings between scorching summers and freezing highland winters, and agricultural tube-wells dominate consumption across the province. Because tariff and subsidy rules for farm connections change frequently, QESCO consumers benefit from checking their duplicate bill online every month to confirm their category and charges.",
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
    cities: ["Khyber", "Bajaur", "Mohmand", "Kurram", "North Waziristan", "South Waziristan", "Orakzai"],
    helpline: "118",
    shortDescription: "TESCO online bill check 2026. Check and download your Tribal Electric Supply Company duplicate electricity bill instantly. Use your 14-digit reference number for a secure WAPDA bill check.",
    intro: "TESCO is Pakistan's newest distribution company, set up to serve the merged tribal districts of Khyber Pakhtunkhwa.",
    about: "The Tribal Electric Supply Company (TESCO) distributes power across the former FATA region — Khyber, Bajaur, Mohmand, Kurram, North and South Waziristan, and Orakzai. These districts were merged into Khyber Pakhtunkhwa and are still developing their electricity infrastructure, often under special subsidised or flat-rate arrangements. TESCO's consumer base is dispersed across difficult, low-density terrain.",
    regionalContext: "As the tribal districts integrate into the national grid, metering and billing are still maturing, so consumers should keep close track of their accounts. Checking your TESCO bill online with the 14-digit reference number is the most dependable way to confirm charges and connection details as the system develops.",
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

/** Returns the current month + year in Pakistan time, e.g. "June 2026".
 *  Computed in Asia/Karachi so the month flips at Pakistan midnight regardless of
 *  where the build runs. Used in titles, meta descriptions, H1s and on-page content.
 *  NOTE: in the pre-rendered static HTML this is fixed at BUILD time — the monthly
 *  GitHub Action (.github/workflows/monthly-rebuild.yml) rebuilds the site on the
 *  1st of each month so the static pages always show the current month. */
export const getCurrentMonthYear = (): string =>
  new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Karachi",
  });

/**
 * Generates a set of high-intent, query-matched FAQs for any DISCO from its data.
 * These mirror the real Google Search Console queries (by reference number, by
 * customer ID, duplicate/print, free, helpline, previous months) and are merged
 * with each DISCO's hand-written FAQs so every page ships 8–10 Q&As + FAQ schema.
 */
export const buildCommonFaqs = (
  disco: DiscoInfo
): { question: string; answer: string }[] => {
  const primaryCity = disco.cities[0] ?? disco.jurisdiction;
  // Kept deliberately short (3 universal Q&As) so each page's UNIQUE hand-written
  // FAQs dominate and the generated text doesn't read as duplicated across DISCOs.
  return [
    {
      question: `Can I check my ${disco.name} bill by customer ID, CNIC, or name?`,
      answer: `Officially, ${disco.name} duplicate bills are retrieved using the 14-digit reference number. A 10-digit customer ID works on some payment apps (1Link), but checking by CNIC or name is not supported for privacy reasons. Keep your 14-digit reference number handy for the most reliable ${disco.name} bill check online.`,
    },
    {
      question: `Is the ${disco.name} online bill check free?`,
      answer: `Yes. Checking and downloading your ${disco.name} (${disco.fullName}) duplicate electricity bill through our portal is 100% free. There is no registration, no app download, and no login — just your 14-digit reference number for ${primaryCity} and all ${disco.name} areas.`,
    },
    {
      question: `What is the ${disco.name} helpline / complaint number?`,
      answer: `You can reach the universal power-sector complaint helpline at ${disco.helpline}, available 24/7 from any Pakistani mobile or landline to report ${disco.name} faults, overbilling, or billing disputes. For meter or tariff corrections, quote your 14-digit reference number.`,
    },
  ];
};
