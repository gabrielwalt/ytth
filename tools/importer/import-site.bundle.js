/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-site.js
  var import_site_exports = {};
  __export(import_site_exports, {
    default: () => import_site_default
  });

  // tools/importer/url-map-data.js
  var url_map_data_default = { "pdfHost": "https://www.yourtracktohealth.com", "pages": { "": { "path": "/index", "action": "done", "redirectTo": "/index", "title": "Home", "forceTitle": false, "section": "Home", "template": "homepage" }, "benefits.aspx?menuid=2": { "path": "/benefits-coverage", "action": "merge", "redirectTo": "/benefits-coverage", "title": "Benefits", "forceTitle": false, "section": "Benefits", "template": "section landing / hub" }, "pagecontent.aspx?menuid=7": { "path": "/benefits-coverage/medical-plans", "action": "page", "redirectTo": "/benefits-coverage/medical-plans", "title": "Medical", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "content.aspx?menuid=318": { "path": "/benefits-coverage/nurses-telemedicine", "action": "page", "redirectTo": "/benefits-coverage/nurses-telemedicine", "title": "24/7 nurses & telemedicine", "forceTitle": true, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuname=railroadhealthlink": { "path": "/benefits-coverage/nurses-telemedicine", "action": "page", "redirectTo": "/benefits-coverage/nurses-telemedicine", "title": "24/7 nurses & telemedicine", "forceTitle": true, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuid=8": { "path": "/benefits-coverage/prescription-drugs", "action": "page", "redirectTo": "/benefits-coverage/prescription-drugs", "title": "Prescription Drugs", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuid=9": { "path": "/benefits-coverage/behavioral-mental-health", "action": "page", "redirectTo": "/benefits-coverage/behavioral-mental-health", "title": "Behavioral, Mental & Substance Use", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuid=295": { "path": "/benefits-coverage/nurses-telemedicine", "action": "merge", "redirectTo": "/benefits-coverage/nurses-telemedicine", "title": "24/7 Telemedicine", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuid=425": { "path": "/health-programs/bone-joint-surgery", "action": "page", "redirectTo": "/health-programs/bone-joint-surgery", "title": "Orthopedic Surgery Program", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuid=302": { "path": "/health-programs/second-opinion", "action": "page", "redirectTo": "/health-programs/second-opinion", "title": "Medical Expert Second Opinion", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuid=309": { "path": "/health-programs/health-benefits-advocates", "action": "page", "redirectTo": "/health-programs/health-benefits-advocates", "title": "Health & Benefits Advocates", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuid=376": { "path": "/benefits-coverage/cardiac-care-program", "action": "page", "redirectTo": "/benefits-coverage/cardiac-care-program", "title": "Cardiac Care Program COE", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuid=10": { "path": "/benefits-coverage/dental", "action": "page", "redirectTo": "/benefits-coverage/dental", "title": "Dental", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuid=11": { "path": "/benefits-coverage/vision", "action": "page", "redirectTo": "/benefits-coverage/vision", "title": "Vision", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuid=12": { "path": "/benefits-coverage/life-insurance", "action": "page", "redirectTo": "/benefits-coverage/life-insurance", "title": "Life Insurance and AD&D", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "pagecontent.aspx?menuid=13": { "path": "/benefits-coverage/supplemental-sickness", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness", "title": "Supplemental Sickness", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "content.aspx?menuid=26": { "path": "/benefits-coverage/savings-spending-accounts/fsa", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa", "title": "Flexible Spending Account", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuname=health flexible spending account": { "path": "/benefits-coverage/savings-spending-accounts/fsa", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa", "title": "Flexible Spending Account", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuid=468": { "path": "/benefits-coverage/savings-spending-accounts/hsa", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/hsa", "title": "Health Savings Account", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuname=health savings account": { "path": "/benefits-coverage/savings-spending-accounts/hsa", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/hsa", "title": "Health Savings Account", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "pagecontent.aspx?menuid=422": { "path": "/benefits-coverage/benefits-at-a-glance", "action": "page", "redirectTo": "/benefits-coverage/benefits-at-a-glance", "title": "See benefits info at a glance", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=331": { "path": "/benefits-coverage/make-the-most-of-your-benefits", "action": "page", "redirectTo": "/benefits-coverage/make-the-most-of-your-benefits", "title": "Tips to Make the Most of Benefits", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "coverage.aspx?menuid=3": { "path": "/benefits-coverage/coverage-eligibility", "action": "page", "redirectTo": "/benefits-coverage/coverage-eligibility", "title": "Coverage", "forceTitle": false, "section": "Coverage", "template": "section landing / hub" }, "newspage.aspx?menuname=latestnewsnewbenefits2018": { "path": "/benefits-coverage/medical-plans/how-the-plans-work", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/how-the-plans-work", "title": "How the plan works: at a glance", "forceTitle": false, "section": "Coverage", "template": "plan detail with tables" }, "newspage.aspx?menuid=286": { "path": "/benefits-coverage/medical-plans/how-the-plans-work", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/how-the-plans-work", "title": "How the plan works: at a glance", "forceTitle": false, "section": "Coverage", "template": "plan detail with tables" }, "howplanworks": { "path": "/benefits-coverage/medical-plans/how-the-plans-work", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/how-the-plans-work", "title": "How the plan works: at a glance", "forceTitle": false, "section": "Coverage", "template": "plan detail with tables" }, "pagecontent.aspx?menuid=27": { "path": "/benefits-coverage/dependents", "action": "page", "redirectTo": "/benefits-coverage/dependents", "title": "Dependent Definition", "forceTitle": false, "section": "Coverage", "template": "article / program detail" }, "benefitlookup.aspx?menuid=28": { "path": "/benefits-coverage/benefit-lookup", "action": "page", "redirectTo": "/benefits-coverage/benefit-lookup", "title": "Medical Benefit and Summary of Benefits & Coverage Lookup", "forceTitle": false, "section": "Coverage", "template": "interactive tool / lookup" }, "benefitlookup.aspx?menuname=uhc cov medical benefit lookup": { "path": "/benefits-coverage/benefit-lookup", "action": "page", "redirectTo": "/benefits-coverage/benefit-lookup", "title": "Medical Benefit and Summary of Benefits & Coverage Lookup", "forceTitle": false, "section": "Coverage", "template": "interactive tool / lookup" }, "pagecontent.aspx?menuid=29": { "path": "/contact-forms/forms", "action": "page", "redirectTo": "/contact-forms/forms", "title": "Forms", "forceTitle": false, "section": "Coverage", "template": "forms & documents list" }, "pagecontent.aspx?menuname=uhc cov forms": { "path": "/contact-forms/forms", "action": "page", "redirectTo": "/contact-forms/forms", "title": "Forms", "forceTitle": false, "section": "Coverage", "template": "forms & documents list" }, "pagecontent.aspx?menuid=30": { "path": "/benefits-coverage/continue-coverage", "action": "page", "redirectTo": "/benefits-coverage/continue-coverage", "title": "Cobra", "forceTitle": false, "section": "Coverage", "template": "article / program detail" }, "pagecontent.aspx?menuid=158": { "path": "/contact-forms/plan-documents", "action": "page", "redirectTo": "/contact-forms/plan-documents", "title": "Summary Plan Description (SPD) Library", "forceTitle": false, "section": "Coverage", "template": "forms & documents list" }, "pagecontent.aspx?menuname=uhc cov spd library": { "path": "/contact-forms/plan-documents", "action": "page", "redirectTo": "/contact-forms/plan-documents", "title": "Summary Plan Description (SPD) Library", "forceTitle": false, "section": "Coverage", "template": "forms & documents list" }, "pagecontent.aspx?menuid=169": { "path": "/privacy-notice", "action": "page", "redirectTo": "/privacy-notice", "title": "Notice of Privacy Practices", "forceTitle": false, "section": "Coverage", "template": "legal / utility" }, "pagecontent.aspx?menuid=414": { "path": "/benefits-coverage/healthcare-transparency", "action": "page", "redirectTo": "/benefits-coverage/healthcare-transparency", "title": "Healthcare Transparency", "forceTitle": false, "section": "Coverage", "template": "article / program detail" }, "pagecontent.aspx?menuname=healthcaretransparency": { "path": "/benefits-coverage/healthcare-transparency", "action": "page", "redirectTo": "/benefits-coverage/healthcare-transparency", "title": "Healthcare Transparency", "forceTitle": false, "section": "Coverage", "template": "article / program detail" }, "pagecontent.aspx?menuid=466": { "path": "/benefits-coverage/medical-plans/hdhp", "action": "merge", "redirectTo": "/benefits-coverage/medical-plans/hdhp", "title": "Understanding the High Deductible Health Plan (HDHP)", "forceTitle": false, "section": "Coverage", "template": "FAQ / accordion" }, "livehealthy.aspx?menuid=5": { "path": "/health-programs", "action": "page", "redirectTo": "/health-programs", "title": "Healthy Living", "forceTitle": false, "section": "Healthy Living", "template": "section landing / hub" }, "livehealthy.aspx?menuname=wellness": { "path": "/health-programs", "action": "page", "redirectTo": "/health-programs", "title": "Healthy Living", "forceTitle": false, "section": "Healthy Living", "template": "section landing / hub" }, "wellnesspagecontent.aspx?menuname=wellnessscreening": { "path": "/health-programs/preventive-screenings", "action": "page", "redirectTo": "/health-programs/preventive-screenings", "title": "Prevention is the best form of protection", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=437": { "path": "/health-programs/preventive-screenings", "action": "page", "redirectTo": "/health-programs/preventive-screenings", "title": "Prevention is the best form of protection", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=backjointpain": { "path": "/health-programs/back-joint-pain", "action": "page", "redirectTo": "/health-programs/back-joint-pain", "title": "A map for helping manage pain", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=446": { "path": "/health-programs/back-joint-pain", "action": "page", "redirectTo": "/health-programs/back-joint-pain", "title": "A map for helping manage pain", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=diabetes": { "path": "/health-programs/diabetes", "action": "page", "redirectTo": "/health-programs/diabetes", "title": "Managing diabetes and prediabetes", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=449": { "path": "/health-programs/diabetes", "action": "page", "redirectTo": "/health-programs/diabetes", "title": "Managing diabetes and prediabetes", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "retirement.aspx?menuid=4": { "path": "/retirement", "action": "page", "redirectTo": "/retirement", "title": "Retirement", "forceTitle": false, "section": "Retirement", "template": "section landing / hub" }, "retirement.aspx?menuname=retirement": { "path": "/retirement", "action": "page", "redirectTo": "/retirement", "title": "Retirement", "forceTitle": false, "section": "Retirement", "template": "section landing / hub" }, "retirementpagecontent.aspx?menuid=58": { "path": "/retirement/coverage-options", "action": "page", "redirectTo": "/retirement/coverage-options", "title": "Coverage Options", "forceTitle": false, "section": "Retirement", "template": "article / program detail" }, "retirementpagecontent.aspx?menuid=60": { "path": "/retirement/early-retirees", "action": "page", "redirectTo": "/retirement/early-retirees", "title": "Early Retirees - GA-46000 and GA-23111 Plan E", "forceTitle": false, "section": "Retirement", "template": "article / program detail" }, "retirementpagecontent.aspx?menuid=64": { "path": "/retirement/plans-a-b-c-cobra", "action": "page", "redirectTo": "/retirement/plans-a-b-c-cobra", "title": "GA-23111 Plans A, B, C and COBRA", "forceTitle": false, "section": "Retirement", "template": "article / program detail" }, "retirementpagecontent.aspx?menuid=61": { "path": "/retirement/medicare-plan-f", "action": "page", "redirectTo": "/retirement/medicare-plan-f", "title": "Medicare and GA-23111 Plan F", "forceTitle": false, "section": "Retirement", "template": "article / program detail" }, "retirementpagecontent.aspx?menuid=66": { "path": "/retirement/forms", "action": "page", "redirectTo": "/retirement/forms", "title": "Essential Forms", "forceTitle": false, "section": "Retirement", "template": "forms & documents list" }, "retirementpagecontent.aspx?menuname=retirement essential forms": { "path": "/retirement/forms", "action": "page", "redirectTo": "/retirement/forms", "title": "Essential Forms", "forceTitle": false, "section": "Retirement", "template": "forms & documents list" }, "retirementpagecontent.aspx?menuid=317": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Retirement/Eligibility_GA48000.pdf", "title": "Important Announcements", "forceTitle": false, "section": "Retirement", "template": "PDF-wrapper stub (archived article)" }, "retirementpagecontent.aspx?menuname=retirementannounce": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Retirement/Eligibility_GA48000.pdf", "title": "Important Announcements", "forceTitle": false, "section": "Retirement", "template": "PDF-wrapper stub (archived article)" }, "contactus.aspx?menuid=6": { "path": "/contact-forms", "action": "page", "redirectTo": "/contact-forms", "title": "Contact Us", "forceTitle": false, "section": "Contact Us", "template": "contact" }, "contactus.aspx?menuid=6&service=nurselink": { "path": "/contact-forms", "action": "page", "redirectTo": "/contact-forms", "title": "Contact Us", "forceTitle": false, "section": "Contact Us", "template": "contact" }, "newspage.aspx?menuname=latestnewsknowwheretogo": { "path": "/news/options-to-take-care-of-your-health", "action": "page", "redirectTo": "/news/options-to-take-care-of-your-health", "title": "Options to take care of your health", "forceTitle": false, "section": "News & Announcements", "template": "news / announcement" }, "newspage.aspx?menuid=361": { "path": "/news/options-to-take-care-of-your-health", "action": "page", "redirectTo": "/news/options-to-take-care-of-your-health", "title": "Options to take care of your health", "forceTitle": false, "section": "News & Announcements", "template": "news / announcement" }, "benefitsdirectory.aspx": { "path": "/contact-forms/benefits-directory", "action": "page", "redirectTo": "/contact-forms/benefits-directory", "title": "All your benefits contact info", "forceTitle": false, "section": "Utility / Other", "template": "contact" }, "latest_news_archives.aspx": { "path": "/news", "action": "page", "redirectTo": "/news", "title": "Latest News Archives", "forceTitle": false, "section": "News & Announcements", "template": "article archive / listing" }, "familymentalhealthsupport": { "path": "/health-programs/everyday-mental-health", "action": "page", "redirectTo": "/health-programs/everyday-mental-health", "title": "Everyday mental health", "forceTitle": false, "section": "Utility / Other", "template": "campaign / standalone landing" }, "newspage.aspx?menuid=450": { "path": "/health-programs/everyday-mental-health", "action": "page", "redirectTo": "/health-programs/everyday-mental-health", "title": "Everyday mental health", "forceTitle": false, "section": "Utility / Other", "template": "campaign / standalone landing" }, "videolibrary.aspx": { "path": "/video-library", "action": "page", "redirectTo": "/video-library", "title": "Video Library", "forceTitle": false, "section": "Utility / Other", "template": "video library" }, "member/my_benefits.aspx?dest=rpm": { "path": null, "action": "external", "redirectTo": null, "title": "HealthSafe ID\xAE", "forceTitle": false, "section": "Member (login)", "template": "login-gated / external member portal" }, "sitemap.aspx?menuid=32": { "path": "/sitemap", "action": "none", "redirectTo": "/sitemap", "title": "Site Map", "forceTitle": false, "section": "Utility / Other", "template": "legal / utility" }, "accessibilitystatement.aspx": { "path": "/accessibility", "action": "page", "redirectTo": "/accessibility", "title": "Accessibility", "forceTitle": false, "section": "Utility / Other", "template": "legal / utility" }, "content.aspx?menuid=14": { "path": "/benefits-coverage/medical-plans/aetna", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/aetna", "title": "Aetna", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "pagecontent.aspx?menuid=78": { "path": "/benefits-coverage/medical-plans/aetna/find-a-doctor", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/aetna/find-a-doctor", "title": "Find a Doctor", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=86": { "path": "/benefits-coverage/medical-plans/aetna/navigate-your-member-website", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/aetna/navigate-your-member-website", "title": "Navigate Your Member Website", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=87": { "path": "/benefits-coverage/medical-plans/aetna/use-aetna-on-the-go", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/aetna/use-aetna-on-the-go", "title": "Use Aetna on the Go", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=88": { "path": "/benefits-coverage/medical-plans/aetna/save-with-aetna-wellness-discounts", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/aetna/save-with-aetna-wellness-discounts", "title": "Save With Aetna Wellness Discounts", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=92": { "path": "/benefits-coverage/medical-plans/aetna/take-action-with-decision-support-tools", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/aetna/take-action-with-decision-support-tools", "title": "Take Action With Decision Support Tools", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "content.aspx?menuid=15": { "path": "/benefits-coverage/medical-plans/highmark-blue-cross-blue-shield", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/highmark-blue-cross-blue-shield", "title": "Highmark Blue Cross Blue Shield", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "content.aspx?menuid=16": { "path": "/benefits-coverage/medical-plans/unitedhealthcare", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/unitedhealthcare", "title": "UnitedHealthcare", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "pagecontent.aspx?menuid=34": { "path": "/benefits-coverage/medical-plans/unitedhealthcare/unitedhealthcare-in-network-providers", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/unitedhealthcare/unitedhealthcare-in-network-providers", "title": "UnitedHealthcare In-Network Providers", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=39": { "path": "/benefits-coverage/medical-plans/unitedhealthcare/topics-of-interest", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/unitedhealthcare/topics-of-interest", "title": "Topics of Interest", "forceTitle": false, "section": "Benefits", "template": "forms & documents list" }, "pagecontent.aspx?menuid=40": { "path": "/benefits-coverage/medical-plans/unitedhealthcare/contact-unitedhealthcare", "action": "page", "redirectTo": "/benefits-coverage/medical-plans/unitedhealthcare/contact-unitedhealthcare", "title": "Contact UnitedHealthcare", "forceTitle": false, "section": "Benefits", "template": "contact" }, "pagecontent.aspx?menuid=456": { "path": "/benefits-coverage/prescription-drugs/contact-member-services", "action": "page", "redirectTo": "/benefits-coverage/prescription-drugs/contact-member-services", "title": "Contact Member Services", "forceTitle": false, "section": "Benefits", "template": "contact" }, "pagecontent.aspx?menuid=457": { "path": "/benefits-coverage/prescription-drugs/news-and-information", "action": "page", "redirectTo": "/benefits-coverage/prescription-drugs/news-and-information", "title": "News and Information", "forceTitle": false, "section": "Benefits", "template": "news / announcement" }, "pagecontentlinkhandler.aspx?menuname=prescriptiondruginfo": { "path": "/benefits-coverage/prescription-drugs/news-and-information", "action": "page", "redirectTo": "/benefits-coverage/prescription-drugs/news-and-information", "title": "News and Information", "forceTitle": false, "section": "Benefits", "template": "news / announcement" }, "pagecontent.aspx?menuid=401": { "path": "/benefits-coverage/behavioral-mental-health/united-behavioral-health-has-you-covered", "action": "page", "redirectTo": "/benefits-coverage/behavioral-mental-health/united-behavioral-health-has-you-covered", "title": "United Behavioral Health has you covered", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=403": { "path": "/benefits-coverage/behavioral-mental-health/calm-health-app-self-care-tools", "action": "page", "redirectTo": "/benefits-coverage/behavioral-mental-health/calm-health-app-self-care-tools", "title": "Calm Health App self-care tools", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=98": { "path": "/benefits-coverage/dental/find-a-dentist", "action": "page", "redirectTo": "/benefits-coverage/dental/find-a-dentist", "title": "Find a Dentist", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=99": { "path": "/benefits-coverage/dental/aetna-member-website", "action": "page", "redirectTo": "/benefits-coverage/dental/aetna-member-website", "title": "Aetna member website", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=100": { "path": "/benefits-coverage/dental/watch-a-video", "action": "page", "redirectTo": "/benefits-coverage/dental/watch-a-video", "title": "Watch a Video", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=101": { "path": "/benefits-coverage/dental/aetna-mobile", "action": "page", "redirectTo": "/benefits-coverage/dental/aetna-mobile", "title": "Aetna Mobile", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontentlinkhandler.aspx?menuname=aetden mobile solutions": { "path": "/benefits-coverage/dental/aetna-mobile", "action": "page", "redirectTo": "/benefits-coverage/dental/aetna-mobile", "title": "Aetna Mobile", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=102": { "path": "/benefits-coverage/dental/benefit-summary", "action": "page", "redirectTo": "/benefits-coverage/dental/benefit-summary", "title": "Benefit Summary", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=103": { "path": "/benefits-coverage/dental/dental-topics-of-interest", "action": "page", "redirectTo": "/benefits-coverage/dental/dental-topics-of-interest", "title": "Dental Topics of Interest", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=104": { "path": "/benefits-coverage/dental/contact-aetna", "action": "page", "redirectTo": "/benefits-coverage/dental/contact-aetna", "title": "Contact Aetna", "forceTitle": false, "section": "Benefits", "template": "contact" }, "pagecontent.aspx?menuid=105": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Aetna/GC-5811.pdf", "title": "Claim Form", "forceTitle": false, "section": "Benefits", "template": "PDF-wrapper stub (archived article)" }, "pagecontent.aspx?menuid=136": { "path": "/benefits-coverage/life-insurance/railroad-national-plan", "action": "page", "redirectTo": "/benefits-coverage/life-insurance/railroad-national-plan", "title": "Railroad National Plan", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontentlinkhandler.aspx?menuname=metlife railroad national plan": { "path": "/benefits-coverage/life-insurance/railroad-national-plan", "action": "page", "redirectTo": "/benefits-coverage/life-insurance/railroad-national-plan", "title": "Railroad National Plan", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=137": { "path": "/benefits-coverage/life-insurance/the-smart-td-health-and-welfare-plan", "action": "page", "redirectTo": "/benefits-coverage/life-insurance/the-smart-td-health-and-welfare-plan", "title": "The SMART-TD Health and Welfare Plan", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontentlinkhandler.aspx?menuname=metlife nrc/utu plan": { "path": "/benefits-coverage/life-insurance/the-smart-td-health-and-welfare-plan", "action": "page", "redirectTo": "/benefits-coverage/life-insurance/the-smart-td-health-and-welfare-plan", "title": "The SMART-TD Health and Welfare Plan", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=138": { "path": "/benefits-coverage/life-insurance/additional-support", "action": "page", "redirectTo": "/benefits-coverage/life-insurance/additional-support", "title": "Additional Plan Benefits and Support", "forceTitle": false, "section": "Benefits", "template": "PDF-wrapper stub (archived article)" }, "pagecontent.aspx?menuid=139": { "path": "/benefits-coverage/life-insurance/contact-metlife", "action": "page", "redirectTo": "/benefits-coverage/life-insurance/contact-metlife", "title": "Contact MetLife", "forceTitle": false, "section": "Benefits", "template": "contact" }, "content.aspx?menuid=20": { "path": "/benefits-coverage/supplemental-sickness/the-hartford", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/the-hartford", "title": "The Hartford", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "pagecontent.aspx?menuid=77": { "path": "/benefits-coverage/supplemental-sickness/the-hartford/file-a-claim", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/the-hartford/file-a-claim", "title": "File a Claim", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuname=aetsupp file a claim": { "path": "/benefits-coverage/supplemental-sickness/the-hartford/file-a-claim", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/the-hartford/file-a-claim", "title": "File a Claim", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=93": { "path": "/benefits-coverage/supplemental-sickness/the-hartford/appeals", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/the-hartford/appeals", "title": "Appeals", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuname=aetsupp appeals": { "path": "/benefits-coverage/supplemental-sickness/the-hartford/appeals", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/the-hartford/appeals", "title": "Appeals", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=95": { "path": "/benefits-coverage/supplemental-sickness/the-hartford/forms", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/the-hartford/forms", "title": "Forms", "forceTitle": false, "section": "Benefits", "template": "forms & documents list" }, "pagecontent.aspx?menuname=aetsupp forms": { "path": "/benefits-coverage/supplemental-sickness/the-hartford/forms", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/the-hartford/forms", "title": "Forms", "forceTitle": false, "section": "Benefits", "template": "forms & documents list" }, "pagecontent.aspx?menuid=97": { "path": "/benefits-coverage/supplemental-sickness/the-hartford/things-to-remember", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/the-hartford/things-to-remember", "title": "Things to Remember", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuname=aetsupp things to remember": { "path": "/benefits-coverage/supplemental-sickness/the-hartford/things-to-remember", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/the-hartford/things-to-remember", "title": "Things to Remember", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "content.aspx?menuid=21": { "path": "/benefits-coverage/supplemental-sickness/trustmark", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/trustmark", "title": "Trustmark", "forceTitle": false, "section": "Benefits", "template": "program hub (icon card grid)" }, "pagecontent.aspx?menuid=129": { "path": "/benefits-coverage/supplemental-sickness/trustmark/supplemental-sickness", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/trustmark/supplemental-sickness", "title": "Supplemental Sickness", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=130": { "path": "/benefits-coverage/supplemental-sickness/trustmark/forms", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/trustmark/forms", "title": "Forms", "forceTitle": false, "section": "Benefits", "template": "forms & documents list" }, "pagecontent.aspx?menuid=131": { "path": "/benefits-coverage/supplemental-sickness/trustmark/how-to-file-a-supplemental-sickness-benefits-claim", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/trustmark/how-to-file-a-supplemental-sickness-benefits-claim", "title": "How to File a Supplemental Sickness Benefits Claim", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontentlinkhandler.aspx?menuname=trustmark how to file a claim": { "path": "/benefits-coverage/supplemental-sickness/trustmark/how-to-file-a-supplemental-sickness-benefits-claim", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/trustmark/how-to-file-a-supplemental-sickness-benefits-claim", "title": "How to File a Supplemental Sickness Benefits Claim", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=133": { "path": "/benefits-coverage/supplemental-sickness/trustmark/appealing-a-claim", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/trustmark/appealing-a-claim", "title": "Appealing a Claim", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=135": { "path": "/benefits-coverage/supplemental-sickness/trustmark/faqs", "action": "page", "redirectTo": "/benefits-coverage/supplemental-sickness/trustmark/faqs", "title": "FAQs", "forceTitle": false, "section": "Benefits", "template": "FAQ / accordion" }, "pagecontent.aspx?menuid=149": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles", "title": "FSA Articles", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontentlinkhandler.aspx?menuname=fsa articles": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles", "title": "FSA Articles", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=159": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles/what-is-hfsa", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles/what-is-hfsa", "title": "What is HFSA", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontentlinkhandler.aspx?menuname=fsa article what is hfsa": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles/what-is-hfsa", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles/what-is-hfsa", "title": "What is HFSA", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=164": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles/you-could-save-hundreds-annually-in-taxes", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles/you-could-save-hundreds-annually-in-taxes", "title": "You could save hundreds annually in taxes", "forceTitle": false, "section": "Benefits", "template": "plan detail with tables" }, "pagecontentlinkhandler.aspx?menuname=fsa article save money with hfsa": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles/you-could-save-hundreds-annually-in-taxes", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles/you-could-save-hundreds-annually-in-taxes", "title": "You could save hundreds annually in taxes", "forceTitle": false, "section": "Benefits", "template": "plan detail with tables" }, "pagecontent.aspx?menuid=167": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles/make-the-most-of-your-benefit-options", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles/make-the-most-of-your-benefit-options", "title": "Make the most of your benefit options", "forceTitle": false, "section": "Benefits", "template": "plan detail with tables" }, "pagecontentlinkhandler.aspx?menuname=fsa article make the most with hfsa": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles/make-the-most-of-your-benefit-options", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles/make-the-most-of-your-benefit-options", "title": "Make the most of your benefit options", "forceTitle": false, "section": "Benefits", "template": "plan detail with tables" }, "pagecontent.aspx?menuid=168": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles/enroll-now-for-2014", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles/enroll-now-for-2014", "title": "Enroll Now for 2014", "forceTitle": false, "section": "Benefits", "template": "plan detail with tables" }, "pagecontent.aspx?menuid=171": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles/fsa-enrollment-extension", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles/fsa-enrollment-extension", "title": "FSA Enrollment Extension", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=187": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles/your-health-fsa-what-expenses-are-covered", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles/your-health-fsa-what-expenses-are-covered", "title": "Your Health FSA: What expenses are covered? How can you use it?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontentlinkhandler.aspx?menuname=fsa 1/3": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles/your-health-fsa-what-expenses-are-covered", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles/your-health-fsa-what-expenses-are-covered", "title": "Your Health FSA: What expenses are covered? How can you use it?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=189": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles/your-health-fsa-dont-leave-money", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles/your-health-fsa-dont-leave-money", "title": "Your Health FSA: Don\u2019t leave money on the table", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontentlinkhandler.aspx?menuname=fsa 2/3": { "path": "/benefits-coverage/savings-spending-accounts/fsa/articles/your-health-fsa-dont-leave-money", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/articles/your-health-fsa-dont-leave-money", "title": "Your Health FSA: Don\u2019t leave money on the table", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=319": { "path": "/benefits-coverage/nurses-telemedicine/have-a-health-question", "action": "page", "redirectTo": "/benefits-coverage/nurses-telemedicine/have-a-health-question", "title": "Have a health question?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=320": { "path": "/health-programs/healthy-habits", "action": "page", "redirectTo": "/health-programs/healthy-habits", "title": "Want help creating healthy habits?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuname=railroadhealthlinkhavegoal": { "path": "/health-programs/healthy-habits", "action": "page", "redirectTo": "/health-programs/healthy-habits", "title": "Want help creating healthy habits?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=321": { "path": "/health-programs/expecting-a-baby", "action": "page", "redirectTo": "/health-programs/expecting-a-baby", "title": "Expecting a baby?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuname=railroadhealthlinkpregnant": { "path": "/health-programs/expecting-a-baby", "action": "page", "redirectTo": "/health-programs/expecting-a-baby", "title": "Expecting a baby?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=322": { "path": "/benefits-coverage/nurses-telemedicine/experiencing-pain", "action": "page", "redirectTo": "/benefits-coverage/nurses-telemedicine/experiencing-pain", "title": "Experiencing pain?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=323": { "path": "/health-programs/quitting-nicotine", "action": "page", "redirectTo": "/health-programs/quitting-nicotine", "title": "Ready to quit tobacco?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuname=railroadhealthlinktobacco": { "path": "/health-programs/quitting-nicotine", "action": "page", "redirectTo": "/health-programs/quitting-nicotine", "title": "Ready to quit tobacco?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=324": { "path": "/benefits-coverage/nurses-telemedicine/managing-a-health-condition", "action": "page", "redirectTo": "/benefits-coverage/nurses-telemedicine/managing-a-health-condition", "title": "Managing a health condition?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=368": { "path": "/benefits-coverage/nurses-telemedicine/questions-about-covid-19", "action": "page", "redirectTo": "/benefits-coverage/nurses-telemedicine/questions-about-covid-19", "title": "Questions about COVID-19?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=400": { "path": "/benefits-coverage/nurses-telemedicine/diagnosed-with-cancer", "action": "page", "redirectTo": "/benefits-coverage/nurses-telemedicine/diagnosed-with-cancer", "title": "Diagnosed with cancer?", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=472": { "path": "/benefits-coverage/savings-spending-accounts/hsa/contact-us", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/hsa/contact-us", "title": "Contact Us", "forceTitle": false, "section": "Benefits", "template": "contact" }, "pagecontent.aspx?menuid=160": { "path": "/benefits-coverage/open-enrollment-2014/coming-soon", "action": "page", "redirectTo": "/benefits-coverage/open-enrollment-2014/coming-soon", "title": "Open Enrollment 2014", "forceTitle": false, "section": "Coverage", "template": "article / program detail" }, "pagecontent.aspx?menuid=165": { "path": "/benefits-coverage/open-enrollment-2014", "action": "page", "redirectTo": "/benefits-coverage/open-enrollment-2014", "title": "Open Enrollment 2014", "forceTitle": false, "section": "Coverage", "template": "article / program detail" }, "coverage.aspx?menuid=3240": { "path": "/benefits-coverage/coverage-eligibility", "action": "none", "redirectTo": "/benefits-coverage/coverage-eligibility", "title": "Coverage & Eligibility", "forceTitle": false, "section": "Coverage", "template": "error / empty page" }, "wellnesspagecontent.aspx?menuid=155": { "path": "/health-programs/articles/24-7-nurse-health-line", "action": "page", "redirectTo": "/health-programs/articles/24-7-nurse-health-line", "title": "24/7 Nurse Health Line", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness 24/7 nurse health line": { "path": "/health-programs/articles/24-7-nurse-health-line", "action": "page", "redirectTo": "/health-programs/articles/24-7-nurse-health-line", "title": "24/7 Nurse Health Line", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=156": { "path": "/health-programs/articles/why-wellness-works", "action": "page", "redirectTo": "/health-programs/articles/why-wellness-works", "title": "Why Wellness Works", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness why wellness works": { "path": "/health-programs/articles/why-wellness-works", "action": "page", "redirectTo": "/health-programs/articles/why-wellness-works", "title": "Why Wellness Works", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=157": { "path": "/health-programs/articles/dont-get-burned", "action": "page", "redirectTo": "/health-programs/articles/dont-get-burned", "title": "Don\u2019t Get Burned", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness don\u2019t get burned": { "path": "/health-programs/articles/dont-get-burned", "action": "page", "redirectTo": "/health-programs/articles/dont-get-burned", "title": "Don\u2019t Get Burned", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=163": { "path": "/health-programs/articles/lyme-disease", "action": "page", "redirectTo": "/health-programs/articles/lyme-disease", "title": "Lyme Disease", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness lyme disease": { "path": "/health-programs/articles/lyme-disease", "action": "page", "redirectTo": "/health-programs/articles/lyme-disease", "title": "Lyme Disease", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=166": { "path": "/health-programs/articles/cholesterol-are-you-on-target", "action": "page", "redirectTo": "/health-programs/articles/cholesterol-are-you-on-target", "title": "Cholesterol: Are you on target?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness cholesterol what are your numbers": { "path": "/health-programs/articles/cholesterol-are-you-on-target", "action": "page", "redirectTo": "/health-programs/articles/cholesterol-are-you-on-target", "title": "Cholesterol: Are you on target?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=170": { "path": "/health-programs/articles/ready-to-quit-smoking", "action": "page", "redirectTo": "/health-programs/articles/ready-to-quit-smoking", "title": "Ready to quit smoking?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness ready to quit smoking": { "path": "/health-programs/articles/ready-to-quit-smoking", "action": "page", "redirectTo": "/health-programs/articles/ready-to-quit-smoking", "title": "Ready to quit smoking?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=172": { "path": "/health-programs/articles/diabetes-is-the-leading-cause-of-blindness", "action": "page", "redirectTo": "/health-programs/articles/diabetes-is-the-leading-cause-of-blindness", "title": "Diabetes is the leading cause of blindness", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness diabetes and your eyes": { "path": "/health-programs/articles/diabetes-is-the-leading-cause-of-blindness", "action": "page", "redirectTo": "/health-programs/articles/diabetes-is-the-leading-cause-of-blindness", "title": "Diabetes is the leading cause of blindness", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=173": { "path": "/health-programs/articles/dont-let-the-holidays-stress-you-out", "action": "page", "redirectTo": "/health-programs/articles/dont-let-the-holidays-stress-you-out", "title": "Don\u2019t let the holidays stress you out", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness beat holiday stress": { "path": "/health-programs/articles/dont-let-the-holidays-stress-you-out", "action": "page", "redirectTo": "/health-programs/articles/dont-let-the-holidays-stress-you-out", "title": "Don\u2019t let the holidays stress you out", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=176": { "path": "/health-programs/articles/weighing-in-on-dietary-fats", "action": "page", "redirectTo": "/health-programs/articles/weighing-in-on-dietary-fats", "title": "Weighing in on dietary fats", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness dietaryfats": { "path": "/health-programs/articles/weighing-in-on-dietary-fats", "action": "page", "redirectTo": "/health-programs/articles/weighing-in-on-dietary-fats", "title": "Weighing in on dietary fats", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=177": { "path": "/health-programs/articles/traveling-you-dont-have-to-skip-exercise", "action": "page", "redirectTo": "/health-programs/articles/traveling-you-dont-have-to-skip-exercise", "title": "Traveling? You don\u2019t have to skip exercise and healthy eating", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness travel tips": { "path": "/health-programs/articles/traveling-you-dont-have-to-skip-exercise", "action": "page", "redirectTo": "/health-programs/articles/traveling-you-dont-have-to-skip-exercise", "title": "Traveling? You don\u2019t have to skip exercise and healthy eating", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=178": { "path": "/health-programs/articles/be-proactive-in-taking-care-of-your-health", "action": "page", "redirectTo": "/health-programs/articles/be-proactive-in-taking-care-of-your-health", "title": "Be proactive in taking care of your health", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness proactive health": { "path": "/health-programs/articles/be-proactive-in-taking-care-of-your-health", "action": "page", "redirectTo": "/health-programs/articles/be-proactive-in-taking-care-of-your-health", "title": "Be proactive in taking care of your health", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=179": { "path": "/health-programs/articles/calories-count-in-alcoholic-beverages-too", "action": "page", "redirectTo": "/health-programs/articles/calories-count-in-alcoholic-beverages-too", "title": "Calories count in alcoholic beverages too", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness alcohol calories": { "path": "/health-programs/articles/calories-count-in-alcoholic-beverages-too", "action": "page", "redirectTo": "/health-programs/articles/calories-count-in-alcoholic-beverages-too", "title": "Calories count in alcoholic beverages too", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=180": { "path": "/health-programs/articles/feeling-stressed-hopeless-or-down-exercise-can-help", "action": "page", "redirectTo": "/health-programs/articles/feeling-stressed-hopeless-or-down-exercise-can-help", "title": "Feeling stressed, hopeless or down? Exercise can help you feel better", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness exercise": { "path": "/health-programs/articles/feeling-stressed-hopeless-or-down-exercise-can-help", "action": "page", "redirectTo": "/health-programs/articles/feeling-stressed-hopeless-or-down-exercise-can-help", "title": "Feeling stressed, hopeless or down? Exercise can help you feel better", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=181": { "path": "/health-programs/articles/protect-your-eyes-from-uv-rays", "action": "page", "redirectTo": "/health-programs/articles/protect-your-eyes-from-uv-rays", "title": "Protect your eyes from UV rays", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness protect your eyes": { "path": "/health-programs/articles/protect-your-eyes-from-uv-rays", "action": "page", "redirectTo": "/health-programs/articles/protect-your-eyes-from-uv-rays", "title": "Protect your eyes from UV rays", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=182": { "path": "/health-programs/articles/prediabetes-are-you-at-risk", "action": "page", "redirectTo": "/health-programs/articles/prediabetes-are-you-at-risk", "title": "Prediabetes: Are you at risk?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=prediabetes 1": { "path": "/health-programs/articles/prediabetes-are-you-at-risk", "action": "page", "redirectTo": "/health-programs/articles/prediabetes-are-you-at-risk", "title": "Prediabetes: Are you at risk?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=186": { "path": "/health-programs/articles/can-you-prevent-prediabetes", "action": "page", "redirectTo": "/health-programs/articles/can-you-prevent-prediabetes", "title": "Can you prevent prediabetes?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness prediabetes 2/4": { "path": "/health-programs/articles/can-you-prevent-prediabetes", "action": "page", "redirectTo": "/health-programs/articles/can-you-prevent-prediabetes", "title": "Can you prevent prediabetes?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=188": { "path": "/health-programs/articles/portion-distortion-what-is-a-normal-serving-size", "action": "page", "redirectTo": "/health-programs/articles/portion-distortion-what-is-a-normal-serving-size", "title": "Portion Distortion: What is a normal serving size?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=portion distortion": { "path": "/health-programs/articles/portion-distortion-what-is-a-normal-serving-size", "action": "page", "redirectTo": "/health-programs/articles/portion-distortion-what-is-a-normal-serving-size", "title": "Portion Distortion: What is a normal serving size?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=191": { "path": "/health-programs/articles/cross-training-the-benefits-of-mixing", "action": "page", "redirectTo": "/health-programs/articles/cross-training-the-benefits-of-mixing", "title": "Cross-training: The Benefits of Mixing Up Your Exercise Activities", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness cross-training": { "path": "/health-programs/articles/cross-training-the-benefits-of-mixing", "action": "page", "redirectTo": "/health-programs/articles/cross-training-the-benefits-of-mixing", "title": "Cross-training: The Benefits of Mixing Up Your Exercise Activities", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=192": { "path": "/health-programs/articles/diagnosing-prediabetes", "action": "page", "redirectTo": "/health-programs/articles/diagnosing-prediabetes", "title": "Diagnosing Prediabetes", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=livehealthy prediabetes 3/4": { "path": "/health-programs/articles/diagnosing-prediabetes", "action": "page", "redirectTo": "/health-programs/articles/diagnosing-prediabetes", "title": "Diagnosing Prediabetes", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=196": { "path": "/health-programs/articles/flu-vaccines-protect-yourself-and-others", "action": "page", "redirectTo": "/health-programs/articles/flu-vaccines-protect-yourself-and-others", "title": "Flu Vaccines: Protect Yourself and Others", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness flu vaccines": { "path": "/health-programs/articles/flu-vaccines-protect-yourself-and-others", "action": "page", "redirectTo": "/health-programs/articles/flu-vaccines-protect-yourself-and-others", "title": "Flu Vaccines: Protect Yourself and Others", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=198": { "path": "/health-programs/articles/personalized-health-and-wellness-services", "action": "page", "redirectTo": "/health-programs/articles/personalized-health-and-wellness-services", "title": "Personalized health and wellness services for you and your family", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=live healthy personalized health": { "path": "/health-programs/articles/personalized-health-and-wellness-services", "action": "page", "redirectTo": "/health-programs/articles/personalized-health-and-wellness-services", "title": "Personalized health and wellness services for you and your family", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=202": { "path": "/health-programs/articles/nutrition-labels-what-do-they-mean", "action": "page", "redirectTo": "/health-programs/articles/nutrition-labels-what-do-they-mean", "title": "Nutrition labels: What do they mean?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness nutrition labels": { "path": "/health-programs/articles/nutrition-labels-what-do-they-mean", "action": "page", "redirectTo": "/health-programs/articles/nutrition-labels-what-do-they-mean", "title": "Nutrition labels: What do they mean?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=204": { "path": "/health-programs/articles/exercise-when-time-is-short", "action": "page", "redirectTo": "/health-programs/articles/exercise-when-time-is-short", "title": "Exercise When Time Is Short", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=wellness toning up": { "path": "/health-programs/articles/exercise-when-time-is-short", "action": "page", "redirectTo": "/health-programs/articles/exercise-when-time-is-short", "title": "Exercise When Time Is Short", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=206": { "path": "/health-programs/articles/dont-let-high-blood-pressure-sneak", "action": "page", "redirectTo": "/health-programs/articles/dont-let-high-blood-pressure-sneak", "title": "Don\u2019t let high blood pressure sneak up on you", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=high blood pressure": { "path": "/health-programs/articles/dont-let-high-blood-pressure-sneak", "action": "page", "redirectTo": "/health-programs/articles/dont-let-high-blood-pressure-sneak", "title": "Don\u2019t let high blood pressure sneak up on you", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=207": { "path": "/health-programs/articles/are-you-as-active-as-you-should-be", "action": "page", "redirectTo": "/health-programs/articles/are-you-as-active-as-you-should-be", "title": "Are you as active as you should be?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=are you active": { "path": "/health-programs/articles/are-you-as-active-as-you-should-be", "action": "page", "redirectTo": "/health-programs/articles/are-you-as-active-as-you-should-be", "title": "Are you as active as you should be?", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=210": { "path": "/health-programs/articles/stretch-and-strengthen-to-feel-good-and-prevent", "action": "page", "redirectTo": "/health-programs/articles/stretch-and-strengthen-to-feel-good-and-prevent", "title": "Stretch and strengthen to feel good and prevent back pain", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=protect your back": { "path": "/health-programs/articles/stretch-and-strengthen-to-feel-good-and-prevent", "action": "page", "redirectTo": "/health-programs/articles/stretch-and-strengthen-to-feel-good-and-prevent", "title": "Stretch and strengthen to feel good and prevent back pain", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=211": { "path": "/health-programs/articles/stretch-your-routine", "action": "page", "redirectTo": "/health-programs/articles/stretch-your-routine", "title": "Stretch Your Routine", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=stretch your routine": { "path": "/health-programs/articles/stretch-your-routine", "action": "page", "redirectTo": "/health-programs/articles/stretch-your-routine", "title": "Stretch Your Routine", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=213": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2015_05_R2_COPD_Infographic.pdf", "title": "Is COPD taking your breath away?", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuname=wellness copd": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2015_05_R2_COPD_Infographic.pdf", "title": "Is COPD taking your breath away?", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuid=216": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2015_06_R1_CAD.pdf", "title": "CAD can stop you in your tracks", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuname=wellness cad": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2015_06_R1_CAD.pdf", "title": "CAD can stop you in your tracks", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuid=218": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/20150724ExtraPounds.pdf", "title": "Extra pounds, extra risk", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuname=wellness extra pounds": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/20150724ExtraPounds.pdf", "title": "Extra pounds, extra risk", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuid=221": { "path": "/health-programs/articles/10-tips-for-packing-healthy-meals", "action": "page", "redirectTo": "/health-programs/articles/10-tips-for-packing-healthy-meals", "title": "10 Tips for Packing Healthy Meals", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuname=wellness healthy meals": { "path": "/health-programs/articles/10-tips-for-packing-healthy-meals", "action": "page", "redirectTo": "/health-programs/articles/10-tips-for-packing-healthy-meals", "title": "10 Tips for Packing Healthy Meals", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=228": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2015_09_R2_Tips_to_cut_calories.pdf", "title": "Tips to host a fun and healthy party", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuname=wellness cut calories": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2015_09_R2_Tips_to_cut_calories.pdf", "title": "Tips to host a fun and healthy party", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuid=230": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2015_10_R1_Stress_Infographic.pdf", "title": "Is stress taking a toll on you?", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuname=wellness stress": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2015_10_R1_Stress_Infographic.pdf", "title": "Is stress taking a toll on you?", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuid=231": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2015_11_R1_Sleep_Infographic.PDF", "title": "Could lack of sleep be hurting you?", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuname=wellness sleep": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2015_11_R1_Sleep_Infographic.PDF", "title": "Could lack of sleep be hurting you?", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuid=232": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2015_12_R1_HomeWorkout_Infographic.PDF", "title": "No gym? No problem.", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuname=wellness home workout": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2015_12_R1_HomeWorkout_Infographic.PDF", "title": "No gym? No problem.", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuid=234": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2016_02_R1_Healthy_Heart.pdf", "title": "Simple tips for celebrating together with love", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuname=wellness healthy heart": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2016_02_R1_Healthy_Heart.pdf", "title": "Simple tips for celebrating together with love", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuid=235": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2016_03_R1_ManWomanHeartAttack.pdf", "title": "Men vs. women", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuname=wellnessmanwomanheartattack": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2016_03_R1_ManWomanHeartAttack.pdf", "title": "Men vs. women", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuid=236": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2016_04_R1_HealthyHabit.pdf", "title": "Healthy habits start young", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuname=wellnesshealthyhabit": { "path": null, "action": "pdf", "redirectTo": "https://www.yourtracktohealth.com/Common/PDFViewer.aspx?fileName=/PDF_Files/Live_Healthy/2016_04_R1_HealthyHabit.pdf", "title": "Healthy habits start young", "forceTitle": false, "section": "Healthy Living", "template": "PDF-wrapper stub (archived article)" }, "wellnesspagecontent.aspx?menuid=237": { "path": "/health-programs/articles/healthy-habits-every-woman-needs-to-know", "action": "page", "redirectTo": "/health-programs/articles/healthy-habits-every-woman-needs-to-know", "title": "Healthy Habits Every Woman Needs to Know", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuname=wellnesstrackinghealth": { "path": "/health-programs/articles/healthy-habits-every-woman-needs-to-know", "action": "page", "redirectTo": "/health-programs/articles/healthy-habits-every-woman-needs-to-know", "title": "Healthy Habits Every Woman Needs to Know", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=238": { "path": "/health-programs/articles/man-an-owners-manual", "action": "page", "redirectTo": "/health-programs/articles/man-an-owners-manual", "title": "Man: An owner\u2019s manual", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuname=wellnessmanchecklist": { "path": "/health-programs/articles/man-an-owners-manual", "action": "page", "redirectTo": "/health-programs/articles/man-an-owners-manual", "title": "Man: An owner\u2019s manual", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=239": { "path": "/health-programs/articles/watch-your-back", "action": "page", "redirectTo": "/health-programs/articles/watch-your-back", "title": "Watch your back", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuname=wellnesswatchyourback": { "path": "/health-programs/articles/watch-your-back", "action": "page", "redirectTo": "/health-programs/articles/watch-your-back", "title": "Watch your back", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=261": { "path": "/health-programs/articles/five-fixes-for-poor-posture", "action": "page", "redirectTo": "/health-programs/articles/five-fixes-for-poor-posture", "title": "Five Fixes for poor posture", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuname=wellnessstraightenup": { "path": "/health-programs/articles/five-fixes-for-poor-posture", "action": "page", "redirectTo": "/health-programs/articles/five-fixes-for-poor-posture", "title": "Five Fixes for poor posture", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=263": { "path": "/health-programs/articles/move-it-or-lose-it", "action": "page", "redirectTo": "/health-programs/articles/move-it-or-lose-it", "title": "Move it (or lose it)", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuname=wellnessjointpain": { "path": "/health-programs/articles/move-it-or-lose-it", "action": "page", "redirectTo": "/health-programs/articles/move-it-or-lose-it", "title": "Move it (or lose it)", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=265": { "path": "/health-programs/articles/stop-diabetes-in-its-tracks", "action": "page", "redirectTo": "/health-programs/articles/stop-diabetes-in-its-tracks", "title": "Stop diabetes in its tracks", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuname=wellnessstopdiabetes": { "path": "/health-programs/articles/stop-diabetes-in-its-tracks", "action": "page", "redirectTo": "/health-programs/articles/stop-diabetes-in-its-tracks", "title": "Stop diabetes in its tracks", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=266": { "path": "/health-programs/articles/living-together-with-diabetes", "action": "page", "redirectTo": "/health-programs/articles/living-together-with-diabetes", "title": "Living together with diabetes", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=267": { "path": "/health-programs/articles/5-tips-for-a-diabetes-friendly-holiday", "action": "page", "redirectTo": "/health-programs/articles/5-tips-for-a-diabetes-friendly-holiday", "title": "5 tips for a diabetes friendly holiday", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=268": { "path": "/health-programs/articles/smart-tips-to-improve-the-future", "action": "page", "redirectTo": "/health-programs/articles/smart-tips-to-improve-the-future", "title": "Smart tips to improve the Future You", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=269": { "path": "/health-programs/articles/meet-nutritions-superheroes-and-villains", "action": "page", "redirectTo": "/health-programs/articles/meet-nutritions-superheroes-and-villains", "title": "Meet Nutrition\u2019s Superheroes and villains", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuname=wellnesssuperhero": { "path": "/health-programs/articles/meet-nutritions-superheroes-and-villains", "action": "page", "redirectTo": "/health-programs/articles/meet-nutritions-superheroes-and-villains", "title": "Meet Nutrition\u2019s Superheroes and villains", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=270": { "path": "/health-programs/articles/which-of-these-9-screenings-do-you-need", "action": "page", "redirectTo": "/health-programs/articles/which-of-these-9-screenings-do-you-need", "title": "Which of these 9 screenings do you need?", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=272": { "path": "/health-programs/articles/are-you-speeding-toward-diabetes", "action": "page", "redirectTo": "/health-programs/articles/are-you-speeding-toward-diabetes", "title": "Are you speeding toward diabetes?", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=273": { "path": "/health-programs/articles/how-well-are-your-hearts-pipes-flowing", "action": "page", "redirectTo": "/health-programs/articles/how-well-are-your-hearts-pipes-flowing", "title": "How well are your heart\u2019s pipes flowing?", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=276": { "path": "/health-programs/articles/healthcare-isnt-what-it-used-to-be", "action": "page", "redirectTo": "/health-programs/articles/healthcare-isnt-what-it-used-to-be", "title": "Healthcare isn\u2019t what it used to be", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuid=277": { "path": "/health-programs/articles/theyre-more-common-than-you-think", "action": "page", "redirectTo": "/health-programs/articles/theyre-more-common-than-you-think", "title": "They\u2019re more common than you think", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "wellnesspagecontent.aspx?menuname=wellnessmentalhealthmyths": { "path": "/health-programs/articles/theyre-more-common-than-you-think", "action": "page", "redirectTo": "/health-programs/articles/theyre-more-common-than-you-think", "title": "They\u2019re more common than you think", "forceTitle": false, "section": "Healthy Living", "template": "image-only article (infographic + image map)" }, "content.aspx?menuid=432": { "path": "/health-programs", "action": "merge", "redirectTo": "/health-programs", "title": "Healthy Living", "forceTitle": false, "section": "Healthy Living", "template": "program hub (icon card grid)" }, "wellnesspagecontent.aspx?menuid=464": { "path": "/health-programs/articles/prioritizing-a1c-tests-can-help-keep-diabetes", "action": "page", "redirectTo": "/health-programs/articles/prioritizing-a1c-tests-can-help-keep-diabetes", "title": "Prioritizing A1C tests can help keep diabetes in check", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "diabetesa1c": { "path": "/health-programs/articles/prioritizing-a1c-tests-can-help-keep-diabetes", "action": "page", "redirectTo": "/health-programs/articles/prioritizing-a1c-tests-can-help-keep-diabetes", "title": "Prioritizing A1C tests can help keep diabetes in check", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "pagecontent.aspx?menuid=38": { "path": "/health-programs/railroad-healthlink", "action": "page", "redirectTo": "/health-programs/railroad-healthlink", "title": "Railroad healthlink", "forceTitle": false, "section": "Utility / Other", "template": "article / program detail" }, "newspage.aspx?menuname=latestnews2020form1095": { "path": "/news/form-1095-b-notice", "action": "page", "redirectTo": "/news/form-1095-b-notice", "title": "Important notice regarding form 1095-b", "forceTitle": false, "section": "News & Announcements", "template": "news / announcement" }, "newspage.aspx?menuid=365": { "path": "/news/form-1095-b-notice", "action": "page", "redirectTo": "/news/form-1095-b-notice", "title": "Important notice regarding form 1095-b", "forceTitle": false, "section": "News & Announcements", "template": "news / announcement" }, "pagecontent.aspx?menuid=462": { "path": "/feedback-thank-you", "action": "page", "redirectTo": "/feedback-thank-you", "title": "We\u2019re always working to serve you better.", "forceTitle": false, "section": "Utility / Other", "template": "legal / utility" }, "pagecontent.aspx?menuname=fsa make the most of your hfsa": { "path": "/benefits-coverage/savings-spending-accounts/fsa/tips", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/tips", "title": "FSA tips and best practices", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuid=174": { "path": "/benefits-coverage/savings-spending-accounts/fsa/tips", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/tips", "title": "FSA tips and best practices", "forceTitle": false, "section": "Benefits", "template": "article / program detail" }, "pagecontent.aspx?menuname=fsa faq": { "path": "/benefits-coverage/savings-spending-accounts/fsa/faq", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/faq", "title": "FSA FAQ", "forceTitle": false, "section": "Benefits", "template": "FAQ / accordion" }, "pagecontent.aspx?menuid=175": { "path": "/benefits-coverage/savings-spending-accounts/fsa/faq", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/faq", "title": "FSA FAQ", "forceTitle": false, "section": "Benefits", "template": "FAQ / accordion" }, "fsacalculator.aspx": { "path": "/benefits-coverage/savings-spending-accounts/fsa/calculator", "action": "page", "redirectTo": "/benefits-coverage/savings-spending-accounts/fsa/calculator", "title": "Health flexible spending account (fsa) calculator", "forceTitle": false, "section": "Benefits", "template": "interactive tool / lookup" }, "oe_fsa.aspx": { "path": "/news/save-with-a-health-fsa", "action": "page", "redirectTo": "/news/save-with-a-health-fsa", "title": "Save time and money with a health FSA", "forceTitle": false, "section": "News & Announcements", "template": "campaign / standalone landing" }, "newspage.aspx?menuname=latestnews202102covidvaccine": { "path": "/news/covid-19-vaccine-answers", "action": "page", "redirectTo": "/news/covid-19-vaccine-answers", "title": "Ten straight answers to COVID-19 vaccine questions", "forceTitle": false, "section": "News & Announcements", "template": "news / announcement" }, "newspage.aspx?menuid=375": { "path": "/news/covid-19-vaccine-answers", "action": "page", "redirectTo": "/news/covid-19-vaccine-answers", "title": "Ten straight answers to COVID-19 vaccine questions", "forceTitle": false, "section": "News & Announcements", "template": "news / announcement" }, "wellnesspagecontent.aspx?menuname=aetmed healthylifestyle": { "path": "/health-programs/articles/engage-with-a-wellness-coach", "action": "page", "redirectTo": "/health-programs/articles/engage-with-a-wellness-coach", "title": "Engage with a Wellness Coach", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=91": { "path": "/health-programs/articles/engage-with-a-wellness-coach", "action": "page", "redirectTo": "/health-programs/articles/engage-with-a-wellness-coach", "title": "Engage with a Wellness Coach", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=higmarkbcbs health and wellness": { "path": "/health-programs/articles/health-and-wellness", "action": "page", "redirectTo": "/health-programs/articles/health-and-wellness", "title": "Health and Wellness", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuid=122": { "path": "/health-programs/articles/health-and-wellness", "action": "page", "redirectTo": "/health-programs/articles/health-and-wellness", "title": "Health and Wellness", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "wellnesspagecontent.aspx?menuname=uhc railroad healthlink": { "path": "/health-programs/railroad-healthlink", "action": "merge", "redirectTo": "/health-programs/railroad-healthlink", "title": "Railroad healthlink", "forceTitle": false, "section": "Healthy Living", "template": "wellness article" }, "prediabetes.aspx": { "path": "/health-programs/prediabetes", "action": "page", "redirectTo": "/health-programs/prediabetes", "title": "Prediabetes", "forceTitle": false, "section": "Healthy Living", "template": "campaign / standalone landing" }, "wellness.aspx?menuname=wellness": { "path": "/health-programs", "action": "merge", "redirectTo": "/health-programs", "title": "Healthy Living", "forceTitle": false, "section": "Healthy Living", "template": "section landing / hub" }, "prediabetes_2.aspx": { "path": "/health-programs/prediabetes-2", "action": "page", "redirectTo": "/health-programs/prediabetes-2", "title": "Prediabetes 2", "forceTitle": false, "section": "Healthy Living", "template": "campaign / standalone landing" }, "newspage.aspx?menuid=203": { "path": "/news/walking-tips-to-lose-weight", "action": "page", "redirectTo": "/news/walking-tips-to-lose-weight", "title": "Walking Tips to Lose Weight", "forceTitle": false, "section": "News & Announcements", "template": "news / announcement" }, "wellnessmorearchived.aspx?menuid=5": { "path": "/health-programs/articles", "action": "page", "redirectTo": "/health-programs/articles", "title": "Healthy Living", "forceTitle": false, "section": "Healthy Living", "template": "article archive / listing" } } };

  // tools/importer/hero-images-data.js
  var hero_images_data_default = {
    "/benefits-coverage/prescription-drugs": {
      "src": "/migration-work/assets/heroes/hero-pharmacist.jpg",
      "focus": "22%"
    },
    "/benefits-coverage/medical-plans/aetna": {
      "src": "/migration-work/assets/heroes/hero-couple-piggyback.jpg",
      "focus": "45%"
    },
    "/benefits-coverage/supplemental-sickness/the-hartford": {
      "src": "/migration-work/assets/heroes/hero-man-at-desk.jpg",
      "focus": "60%"
    },
    "/benefits-coverage/dental": {
      "src": "/migration-work/assets/heroes/hero-grandmother-hug.jpg",
      "focus": "50%"
    },
    "/benefits-coverage/life-insurance": {
      "src": "/migration-work/assets/heroes/hero-three-generations.jpg",
      "focus": "45%"
    },
    "/benefits-coverage/coverage-eligibility": {
      "src": "/migration-work/assets/heroes/hero-girl-balloons.jpg",
      "focus": "18%"
    },
    "/benefits-coverage/supplemental-sickness/trustmark": {
      "src": "/migration-work/assets/heroes/hero-family-beach.jpg",
      "focus": "55%"
    },
    "/benefits-coverage/savings-spending-accounts/fsa": {
      "src": "/migration-work/assets/heroes/hero-father-son-pointing.jpg",
      "focus": "55%"
    },
    "/benefits-coverage/medical-plans/unitedhealthcare": {
      "src": "/migration-work/assets/heroes/hero-family-walk.jpg",
      "focus": "55%"
    },
    "/benefits-coverage/medical-plans/highmark-blue-cross-blue-shield": {
      "src": "/migration-work/assets/heroes/hero-woman-kayaking.jpg",
      "focus": "25%"
    },
    "/benefits-coverage/behavioral-mental-health": {
      "src": "/migration-work/assets/heroes/hero-friends-walking.jpg",
      "focus": "50%"
    },
    "/benefits-coverage/medical-plans": {
      "src": "/migration-work/assets/heroes/hero-doctor-patient.jpg",
      "focus": "32%"
    },
    "/contact-forms": {
      "src": "/migration-work/assets/heroes/hero-woman-phone.jpg",
      "focus": "45%"
    },
    "/benefits-coverage/supplemental-sickness": {
      "src": "/migration-work/assets/heroes/hero-father-child-laptop.jpg",
      "focus": "38%"
    },
    "/benefits-coverage/nurses-telemedicine": {
      "src": "/migration-work/assets/heroes/hero-nurse-headset.jpg",
      "focus": "55%"
    },
    "/health-programs": {
      "src": "/migration-work/assets/heroes/hero-woman-exercise.jpg",
      "focus": "45%"
    },
    "/news/options-to-take-care-of-your-health": {
      "src": "/migration-work/assets/heroes/hero-telehealth-family.jpg",
      "focus": "45%"
    },
    "/health-programs/second-opinion": {
      "src": "/migration-work/assets/heroes/hero-woman-laptop.jpg",
      "focus": "55%"
    },
    "/benefits-coverage/vision": {
      "src": "/migration-work/assets/heroes/hero-father-daughter.jpg",
      "focus": "45%"
    },
    "/health-programs/health-benefits-advocates": {
      "src": "/migration-work/assets/heroes/hero-family-group.jpg",
      "focus": "50%"
    },
    "/benefits-coverage/cardiac-care-program": {
      "src": "/migration-work/assets/heroes/hero-heart-hands.jpg",
      "focus": "35%"
    },
    "/health-programs/bone-joint-surgery": {
      "src": "/migration-work/assets/heroes/hero-doctor-consult.jpg",
      "focus": "45%"
    },
    "/benefits-coverage/savings-spending-accounts/hsa": {
      "src": "/migration-work/assets/heroes/hero-young-family.jpg",
      "focus": "50%"
    },
    "/retirement": {
      "src": "/migration-work/assets/heroes/hero-retirement-specialist.jpg",
      "focus": "50%"
    },
    "/health-programs/healthy-habits": {
      "src": "/migration-work/assets/heroes/hero-friends-walking.jpg",
      "focus": "50%"
    },
    "/benefits-coverage/dependents": {
      "src": "/migration-work/assets/heroes/hero-family-walk.jpg",
      "focus": "55%"
    },
    "/retirement/forms": {
      "src": "/migration-work/assets/heroes/hero-retirement-specialist.jpg",
      "focus": "50%"
    },
    "/retirement/coverage-options": {
      "src": "/migration-work/assets/heroes/hero-retiree-smiling.jpg",
      "focus": "40%"
    }
  };

  // tools/importer/import-site.js
  var OLD_ORIGIN = "https://www.yourtracktohealth.com";
  var ICONS = {
    "icon-1": "hex-eye",
    "icon-10": "hex-globe",
    "icon-11": "hex-care",
    "icon-14": "hex-folder",
    "icon-15": "hex-spine",
    "icon-2": "hex-glasses",
    "icon-4": "hex-household",
    "icon-5": "hex-form",
    "icon-6": "hex-wallet",
    "icon-7": "hex-24-hours",
    "icon-8": "hex-calculator",
    "icon-9": "hex-tooth",
    "icon-a": "hex-handshake",
    "icon-b": "hex-laptop",
    "icon-c": "hex-lock",
    "icon-d": "hex-care-team",
    "icon-e": "hex-doctors",
    "icon-f": "hex-mobile",
    "icon-g": "hex-advisor",
    "icon-h": "hex-account",
    "icon-i": "hex-question",
    "icon-j": "hex-first-aid",
    "icon-k": "hex-checklist",
    "icon-l": "hex-headset",
    "icon-m": "hex-stethoscope",
    "icon-n": "hex-discount",
    "icon-o": "hex-coach",
    "icon-p": "hex-no-smoking",
    "icon-q": "hex-mindfulness",
    "icon-r": "hex-virus",
    "icon-s": "hex-chat",
    "icon-t": "hex-doctor",
    "icon-u": "hex-strategy",
    "icon-v": "hex-pharmacy",
    "icon-w": "hex-mental-health",
    "icon-x": "hex-baby",
    "icon-y": "hex-ribbon",
    "icon-z": "hex-heart-pulse"
  };
  var CONTACT_TOPICS = {
    nurselink: "24-7-nurse-support",
    medical: "medical-benefit-claims",
    wellness: "wellness-programs-support",
    mentalhealth: "mental-health-substance-use-benefits-claims",
    fsa: "fsa-benefits-claims",
    prescription: "prescription-benefits-claims",
    additionalservice: "additional-benefits-and-services",
    dental: "dental-benefits-claims",
    vision: "vision-benefits-claims",
    supplemental: "supplemental-sickness-benefits-claims",
    life: "life-benefits-claims",
    retiree: "retiree-planning-benefits",
    enrollment: "enrollment-support",
    discount: "discount-programs",
    hsabank: "hsa-bank-support"
  };
  var SECTION_LABEL = [
    ["/benefits-coverage", "Benefits & coverage"],
    ["/health-programs", "Health programs"],
    ["/retirement", "Retirement"],
    ["/contact-forms", "Contact & forms"],
    ["/news", "News"]
  ];
  var KEEP_CAPS = new Set("Aetna UnitedHealthcare Highmark MetLife Hartford Trustmark EyeMed Teladoc Optum OptumRx Rx Express Scripts Railroad Railroads Medicare Medicaid COBRA FSA HSA HFSA HDHP MMCP CHCB SBC SPD AD&D COVID-19 COVID A1C Calm HealthSafe ID UHC RRB RRTA RUIA SSB SSBP GA-46000 GA-23111 GA-48000 Lyme Wellos I US U.S. IRS TTY PPO HMO OE Q&A Q-1 FAQ FAQs iOS Android Google Apple CDC Monday Tuesday Wednesday Thursday Friday Saturday Sunday January February March April May June July August September October November December COE Cleveland Clinic Maven 1095-B 1095-C".split(" "));
  var CANON = new Map([...KEEP_CAPS].map((w) => [w.toUpperCase(), w]));
  var KEEP_PHRASES = [
    "Railroad Employees National Health and Welfare Plan",
    "Railroad Employees National Dental Plan",
    "Railroad Employees National Vision Plan",
    "Railroad Employees National Early Retirement Major Medical Benefit Plan",
    "The SMART-TD Health and Welfare Plan",
    "SMART-TD Health and Welfare Plan",
    "Railroad Retirement Board",
    "Railroad Retirement",
    "Railroad Enrollment Services",
    "Railroad Healthlink",
    "Railroad National Plan",
    "Supplemental Sickness Benefit",
    "Managed Medical Care Program",
    "Comprehensive Health Care Benefit",
    "High Deductible Health Plan",
    "Health Savings Account",
    "Flexible Spending Account",
    "Summary of Benefits & Coverage",
    "Summary of Benefits and Coverage",
    "Summary Plan Description",
    "Centers of Excellence",
    "Blue Cross Blue Shield",
    "United Behavioral Health",
    "HSA Bank",
    "Hospital Association",
    "One Pass Select",
    "Plan E",
    "Plan F",
    "Plans A, B, C",
    "Your Track to Health",
    "Express Scripts",
    "Calm Health",
    "Teladoc Health",
    "Cardiac Care Program",
    "Blue Cross Blue Shield Global Core",
    "Cleveland Clinic",
    "My Highmark",
    "Maven Clinic"
  ];
  function normalize(u) {
    let url;
    try {
      url = new URL(u, `${OLD_ORIGIN}/`);
    } catch (e) {
      return "";
    }
    const params = [...url.searchParams.entries()].filter(([k]) => !/^(sitemap|pref|index|utm_.*|agf[a-z])$/i.test(k)).map(([k, v]) => `${k.toLowerCase()}=${v.toLowerCase().replace(/\s+/g, " ").trim()}`).sort();
    const p = url.pathname.replace(/^\/+/, "").toLowerCase();
    return params.length ? `${p}?${params.join("&")}` : p;
  }
  function sentenceCase(text) {
    let t = text.replace(/\s+/g, " ").trim();
    if (!t) return t;
    const kept = [];
    [...KEEP_PHRASES].sort((a, b) => b.length - a.length).forEach((phrase) => {
      const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      t = t.replace(re, () => {
        kept.push(phrase);
        return `\xA7${kept.length - 1}\xA7`;
      });
    });
    const restore = (out) => out.replace(/§(\d+)§/g, (m, i) => kept[Number(i)]);
    const allCaps = t === t.toUpperCase() && /[A-Z]{3}/.test(t);
    const base = allCaps ? (t.charAt(0) + t.slice(1).toLowerCase()).replace(/([.?!]\s+)([a-z])/g, (m, a, b) => a + b.toUpperCase()) : t;
    let afterBreak = true;
    const result = base.split(" ").map((w) => {
      const bare = w.replace(/^[("“'‘]+|[)"”'’.,:;!?]+$/g, "");
      let out = w;
      const stem = bare.replace(/[’']s$/, "");
      if (!afterBreak && /^[A-Z][a-z’']+$/.test(bare) && !KEEP_CAPS.has(bare) && !KEEP_CAPS.has(stem)) out = w.toLowerCase();
      if (/[-/]/.test(bare) && !KEEP_CAPS.has(bare)) {
        out = out.split(/([-/])/).map((part, k) => {
          const pb = part.replace(/^[("“'‘]+|[)"”'’.,:;!?]+$/g, "");
          if (k === 0 && afterBreak || !/^[A-Z][a-z’']+$/.test(pb) || KEEP_CAPS.has(pb)) return part;
          return part.toLowerCase();
        }).join("");
      }
      const up = bare.toUpperCase();
      if (allCaps && CANON.has(up) && up.length > 1) out = w.replace(bare, CANON.get(up));
      if (!allCaps && up.length >= 3 && CANON.get(up) === up && /^[A-Z][a-z]+$/.test(bare)) out = w.replace(bare, up);
      afterBreak = /[:?!.]$/.test(w);
      return out;
    }).join(" ").replace(/^§/, "\xA7");
    return restore(result);
  }
  function rewriteHref(href) {
    var _a;
    if (!href || /^(mailto:|tel:|javascript:|#)/i.test(href)) return href;
    let url;
    try {
      url = new URL(href, `${OLD_ORIGIN}/`);
    } catch (e) {
      return href;
    }
    if (!/(^|\.)yourtracktohealth\.com$/i.test(url.hostname)) return url.href;
    const viewer = (file) => `${url_map_data_default.pdfHost}/Common/PDFViewer.aspx?fileName=${file.startsWith("/") ? "" : "/"}${file}`;
    if (/\/common\/pdfviewer\.aspx$/i.test(url.pathname) && url.searchParams.get("fileName")) {
      return viewer(url.searchParams.get("fileName").split("#")[0]);
    }
    if (/\.pdf$/i.test(url.pathname)) return viewer(url.pathname);
    if (/^\/?(default\.aspx)?$/i.test(url.pathname)) return "/";
    if (/^\/contactus\.aspx$/i.test(url.pathname)) {
      const service = ((_a = [...url.searchParams.entries()].find(([k]) => /^service$/i.test(k))) == null ? void 0 : _a[1]) || "";
      const item = CONTACT_TOPICS[service.toLowerCase()];
      return item ? `/contact-forms#${item}` : "/contact-forms";
    }
    const hit = url_map_data_default.pages[normalize(url.href)];
    if (hit) {
      if (hit.action === "pdf" || hit.action === "external") return hit.redirectTo || url.href;
      if (hit.path) return hit.path === "/index" ? "/" : hit.path + (url.hash || "");
    }
    return `${OLD_ORIGIN}${url.pathname}${url.search}${url.hash}`;
  }
  var INLINE = /* @__PURE__ */ new Set(["A", "ABBR", "B", "BR", "CODE", "EM", "I", "IMG", "PICTURE", "SMALL", "SPAN", "STRONG", "SUB", "SUP", "U", "FONT", "LABEL"]);
  function paragraphize(container, document) {
    const nodes = [...container.childNodes];
    let buffer = [];
    const flush = (before) => {
      while (buffer.length && buffer[0].nodeName === "BR") buffer.shift();
      while (buffer.length && buffer[buffer.length - 1].nodeName === "BR") buffer.pop();
      const hasText = buffer.some((n) => {
        var _a;
        return n.nodeType === 3 ? n.textContent.trim() : n.textContent.trim() || ((_a = n.querySelector) == null ? void 0 : _a.call(n, "img")) || n.nodeName === "IMG";
      });
      if (hasText) {
        const p = document.createElement("p");
        buffer.forEach((n) => p.append(n));
        if (before) container.insertBefore(p, before);
        else container.append(p);
      } else {
        buffer.forEach((n) => {
          var _a;
          return (_a = n.remove) == null ? void 0 : _a.call(n);
        });
      }
      buffer = [];
    };
    nodes.forEach((n) => {
      const inline = n.nodeType === 3 || n.nodeType === 1 && INLINE.has(n.nodeName);
      if (inline) {
        if (n.nodeName === "BR" && buffer.length && buffer[buffer.length - 1].nodeName === "BR") {
          const prev = buffer.pop();
          const next = n.nextSibling;
          prev.remove();
          n.remove();
          flush(next && next.parentNode === container ? next : null);
          return;
        }
        buffer.push(n);
      } else if (n.nodeType === 1) {
        flush(n);
        if (n.nodeName === "DIV" || n.nodeName === "SECTION" || n.nodeName === "ARTICLE") paragraphize(n, document);
      } else {
        n.remove();
      }
    });
    flush(null);
  }
  var block = (name, rows, document) => {
    const t = WebImporter.DOMUtils.createTable([[name], ...rows], document);
    t.dataset.blockTable = "true";
    return t;
  };
  function cleanup(root) {
    root.querySelectorAll([
      "script",
      "style",
      "noscript",
      'iframe[src*="googletag"]',
      'input[type="hidden"]',
      "#sidebar",
      ".breadCrumbs",
      '[id$="divSiteMapContainer"]',
      "#TogNav",
      ".goTop",
      ".clearfix",
      '[id$="clearFix"]',
      ".visually-hidden",
      ".sr-only",
      "#divH1Title:empty",
      'img[src*="external3" i]',
      'img[src*="defaultarrow" i]',
      'img[src*="link%20icon" i]',
      'img[src*="link icon" i]',
      'img[src*="iconprint" i]',
      'img[src$=".gif" i]',
      'span[class^="icon-"]',
      'span[class*=" icon-"]'
    ].join(",")).forEach((el) => el.remove());
    root.querySelectorAll(".BoldText, .boldtext, b").forEach((el) => {
      const s = el.ownerDocument.createElement("strong");
      s.append(...el.childNodes);
      el.replaceWith(s);
    });
    root.querySelectorAll("span.PhoneNum, font").forEach((el) => el.replaceWith(...el.childNodes));
    root.querySelectorAll("a").forEach((a) => {
      if (!a.textContent.trim() && !a.querySelector("img")) a.remove();
    });
    root.querySelectorAll('[style*="font-weight"]').forEach((el) => {
      const style = el.getAttribute("style").toLowerCase();
      if (!/font-weight\s*:\s*(bold|[6-9]00)/.test(style) || el.closest("h1, h2, h3, h4, h5, h6, strong, th")) return;
      const doc = el.ownerDocument;
      const size = style.match(/font-size\s*:\s*([\d.]+)(em|rem|px)/);
      const larger = size && (size[2] === "px" && Number(size[1]) >= 18 || size[2] !== "px" && Number(size[1]) >= 1.1);
      const words = el.textContent.trim().split(/\s+/).length;
      if (/^(DIV|P)$/.test(el.nodeName) && larger && words <= 14 && !el.querySelector("div, p, ul, ol, table")) {
        const h = doc.createElement("h3");
        h.append(...el.childNodes);
        el.replaceWith(h);
      } else if (el.nodeName === "SPAN" || el.nodeName === "FONT") {
        const BLOCK = /^(DIV|P|UL|OL|LI|TABLE|DL|DT|DD|H[1-6]|BLOCKQUOTE)$/;
        const nodes = [...el.childNodes];
        const firstBlock = nodes.findIndex((n) => n.nodeType === 1 && (BLOCK.test(n.nodeName) || n.querySelector("div, p, ul, ol, li, table, dl, dt, dd, h1, h2, h3, h4, h5, h6")));
        const inline = firstBlock < 0 ? nodes : nodes.slice(0, firstBlock);
        const s = doc.createElement("strong");
        s.append(...inline);
        if (firstBlock < 0) {
          el.replaceWith(s);
        } else {
          el.replaceWith(...s.textContent.trim() ? [s] : [], ...el.childNodes);
        }
      } else if (/^(UL|OL)$/.test(el.nodeName)) {
        el.querySelectorAll(":scope > li").forEach((li) => {
          if (li.querySelector("ul, ol, div, p, table")) return;
          const s = doc.createElement("strong");
          s.append(...li.childNodes);
          li.append(s);
        });
      } else if (!el.querySelector("div, p, ul, ol, li, table, h1, h2, h3, h4, h5, h6")) {
        const s = doc.createElement("strong");
        s.append(...el.childNodes);
        el.append(s);
      }
    });
    root.querySelectorAll("[style]").forEach((el) => el.removeAttribute("style"));
    root.querySelectorAll(":is(ul, ol) > :is(ul, ol)").forEach((sub) => {
      const prev = sub.previousElementSibling;
      if (prev && prev.nodeName === "LI") {
        prev.append(sub);
      } else {
        const li = sub.ownerDocument.createElement("li");
        sub.replaceWith(li);
        li.append(sub);
      }
    });
    root.querySelectorAll("li").forEach((li) => {
      const walker = li.ownerDocument.createTreeWalker(li, 4);
      let first = walker.nextNode();
      while (first && !first.textContent.trim()) first = walker.nextNode();
      if (first && /^\s*[-–•]\s+/.test(first.textContent)) first.textContent = first.textContent.replace(/^\s*[-–•]\s+/, "");
    });
  }
  function rewriteLinks(root) {
    root.querySelectorAll("a[href]").forEach((a) => {
      a.setAttribute("href", rewriteHref(a.getAttribute("href")));
      a.removeAttribute("onclick");
      a.removeAttribute("target");
      const t = a.textContent.trim();
      if (t.length > 3 && t === t.toUpperCase() && /[A-Z]{3}/.test(t) && !a.querySelector("img")) a.textContent = sentenceCase(t);
      let lastText = a.lastChild;
      while (lastText && lastText.nodeType === 1 && lastText.lastChild) lastText = lastText.lastChild;
      if (lastText && lastText.nodeType === 3 && /\s+$/.test(lastText.textContent)) {
        lastText.textContent = lastText.textContent.replace(/\s+$/, "");
        const next = a.nextSibling;
        if (!next || next.nodeType !== 3 || !/^\s/.test(next.textContent)) a.after(a.ownerDocument.createTextNode(" "));
        else next.textContent = next.textContent.replace(/^\s+/, " ");
      }
    });
    root.querySelectorAll('a[href="#GoToTop" i], a[href="#top" i]').forEach((a) => {
      const p = a.closest("p, div");
      a.remove();
      if (p && !p.textContent.trim() && !p.querySelector("img")) p.remove();
    });
    root.querySelectorAll("a").forEach((a) => {
      if (!/^\s*return to (the )?home ?page\s*$/i.test(a.textContent)) return;
      const p = a.closest("p, div");
      a.remove();
      if (p && !p.textContent.trim() && !p.querySelector("img")) p.remove();
    });
    root.querySelectorAll("img[src]").forEach((img) => {
      try {
        img.src = new URL(img.getAttribute("src"), `${OLD_ORIGIN}/`).href;
      } catch (e) {
      }
    });
  }
  function transformAccordions(root, document) {
    const toRows = (panels, titleSel, bodySel) => panels.map((panel) => {
      const title = panel.querySelector(titleSel);
      const body = panel.querySelector(bodySel);
      const q = document.createElement("div");
      q.textContent = sentenceCase(title ? title.textContent : "");
      const a = document.createElement("div");
      if (body) {
        paragraphize(body, document);
        a.append(...body.childNodes);
      }
      if (!q.textContent.trim() && a.textContent.trim()) q.textContent = "More information";
      return [q, a];
    }).filter(([q]) => q.textContent.trim());
    root.querySelectorAll(".content-panel-group, #accordion").forEach((group) => {
      const panels = [...group.querySelectorAll(".content-panel-default")];
      if (!panels.length) return;
      if (group.querySelector(".child-panel-default")) {
        const frag = document.createDocumentFragment();
        panels.forEach((panel) => {
          var _a;
          const h = document.createElement("h2");
          h.textContent = sentenceCase(((_a = panel.querySelector(".panel-title, .content-panel-title")) == null ? void 0 : _a.textContent) || "");
          if (h.textContent) frag.append(h);
          const children = [...panel.querySelectorAll(".child-panel-default")];
          const rows2 = toRows(children, ".child-panel-title", ".child-panel-body");
          if (rows2.length) frag.append(block("Accordion (closed)", rows2, document));
        });
        group.replaceWith(frag);
        return;
      }
      const rows = toRows(panels, ".content-panel-title, .panel-title", ".content-panel-body, .content-panel-collapse");
      group.replaceWith(block("Accordion (closed)", rows, document));
    });
  }
  function transformDefinitionLists(root, document) {
    root.querySelectorAll("dl").forEach((dl) => {
      const frag = document.createDocumentFragment();
      const keep = (item) => {
        var _a;
        return item.textContent.trim() || ((_a = item.querySelector) == null ? void 0 : _a.call(item, "a, img"));
      };
      const emit = (nodes, bold) => {
        var _a, _b, _c, _d;
        const p = document.createElement("p");
        const isBr = (n) => n && (n.nodeName === "BR" || n.nodeType === 3 && !n.textContent.trim());
        while (nodes.length && isBr(nodes[0])) (_b = (_a = nodes.shift()).remove) == null ? void 0 : _b.call(_a);
        while (nodes.length && isBr(nodes[nodes.length - 1])) (_d = (_c = nodes.pop()).remove) == null ? void 0 : _d.call(_c);
        const ownBold = nodes.some((n) => {
          var _a2;
          return n.nodeType === 1 && (n.nodeName === "STRONG" || ((_a2 = n.querySelector) == null ? void 0 : _a2.call(n, "strong")));
        });
        const firstBr = nodes.findIndex((n) => n.nodeName === "BR");
        if (bold && !ownBold && firstBr > 0) {
          const s = document.createElement("strong");
          s.append(...nodes.slice(0, firstBr));
          p.append(s, ...nodes.slice(firstBr));
        } else if (bold && !ownBold) {
          const s = document.createElement("strong");
          s.append(...nodes);
          p.append(s);
        } else {
          p.append(...nodes);
        }
        frag.append(p);
      };
      const walk = (node) => {
        let loose = [];
        const flush = () => {
          if (loose.some((n) => keep(n))) emit(loose, false);
          loose = [];
        };
        [...node.childNodes].forEach((child) => {
          if (child.nodeName === "DT" || child.nodeName === "DD") {
            flush();
            if (keep(child)) emit([...child.childNodes], child.nodeName === "DT");
          } else if (child.nodeType === 1 && child.querySelector("dt, dd")) {
            flush();
            walk(child);
          } else if (child.nodeType === 1 && /^(DIV|P|SECTION)$/.test(child.nodeName)) {
            flush();
            if (keep(child)) emit([...child.childNodes], false);
          } else {
            loose.push(child);
          }
        });
        flush();
      };
      walk(dl);
      dl.replaceWith(frag);
    });
  }
  function transformCardGrids(root, document) {
    const groups = /* @__PURE__ */ new Map();
    root.querySelectorAll("[data-icon]:not(.contentbox)").forEach((col) => {
      const list = groups.get(col.parentElement) || [];
      list.push(col);
      groups.set(col.parentElement, list);
    });
    groups.forEach((cols) => {
      if (cols.length < 2) return;
      const rows2 = cols.map((col) => {
        const cell = document.createElement("div");
        const icon = document.createElement("p");
        icon.textContent = `:${col.dataset.icon}:`;
        paragraphize(col, document);
        cell.append(icon, ...col.childNodes);
        return [cell];
      });
      cols[0].before(block("Cards (resource)", rows2, document));
      cols.forEach((c) => c.remove());
    });
    const boxes = [...root.querySelectorAll(".contentbox")];
    if (!boxes.length) return;
    const rows = boxes.map((box) => {
      var _a;
      const cell = document.createElement("div");
      const titleEl = box.querySelector(".content-title");
      const link = (titleEl == null ? void 0 : titleEl.querySelector("a[href]")) || box.querySelector('a[id$="hlHeading2"]');
      const h3 = document.createElement("h3");
      const title = sentenceCase(((_a = (titleEl || box).querySelector("h3, h2")) == null ? void 0 : _a.textContent) || (titleEl == null ? void 0 : titleEl.textContent) || "");
      if (link) {
        const a = document.createElement("a");
        a.href = link.getAttribute("href");
        a.textContent = title;
        h3.append(a);
      } else {
        h3.textContent = title;
      }
      if (box.dataset.icon) {
        const icon = document.createElement("p");
        icon.textContent = `:${box.dataset.icon}:`;
        cell.append(icon);
      }
      cell.append(h3);
      const body = box.querySelector(".panel-body");
      if (body) {
        paragraphize(body, document);
        cell.append(...body.childNodes);
      }
      return [cell];
    });
    const first = boxes[0].closest(".row") || boxes[0].parentElement;
    const table = block("Cards (resource)", rows, document);
    first.parentElement.insertBefore(table, first);
    boxes.forEach((b) => (b.closest(".col-lg-6, .col-md-6, .col-sm-6, .col-lg-4, .col-md-4") || b).remove());
    root.querySelectorAll(".row").forEach((r) => {
      if (!r.textContent.trim() && !r.querySelector("img, table")) r.remove();
    });
  }
  var PLAN_TERM = /^(annual deductible|coinsurance|copays?|annual out-of-pocket maximum)\b/i;
  function sentenceCaseNodes(el) {
    const walker = el.ownerDocument.createTreeWalker(el, 4);
    const nodes = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n);
    nodes.forEach((n, i) => {
      if (n.parentElement.closest("sup") || !n.textContent.trim()) return;
      const [, lead, core, trail] = n.textContent.match(/^(\s*)([\s\S]*?)(\s*)$/);
      let cased = sentenceCase(core);
      if (i > 0) {
        cased = cased.replace(/^([("“'‘]*)([A-Z])(?=[a-z])/, (m, punct, c) => {
          const word = cased.slice(punct.length).match(/^[A-Za-z’']+/)[0];
          return KEEP_CAPS.has(word) ? m : `${punct}${c.toLowerCase()}`;
        });
      }
      n.textContent = `${lead}${cased}${trail}`;
    });
  }
  function transformTermBoxes(root, document) {
    const boxes = [...root.querySelectorAll(".panel-Content")].filter((b) => b.querySelector(".boxNumbering"));
    if (boxes.length < 2) return;
    const cells = boxes.map((box) => {
      const cell = document.createElement("div");
      const titleEl = [...box.querySelectorAll("h3, h4, .local_title")].find((h2) => !h2.querySelector(".boxNumbering") && h2.textContent.trim());
      const h = document.createElement("h5");
      h.textContent = sentenceCase(titleEl ? titleEl.textContent.replace(/\s+/g, " ").trim() : "");
      cell.append(h);
      box.querySelectorAll("p").forEach((p) => {
        p.innerHTML.split(/(?:<br\s*\/?>\s*){2,}/i).map((part) => part.trim()).filter(Boolean).forEach((part) => {
          const np = document.createElement("p");
          np.innerHTML = part;
          cell.append(np);
        });
      });
      return cell;
    });
    const container = boxes[0].parentElement;
    boxes.slice(1).forEach((b) => b.remove());
    boxes[0].replaceWith(block("Columns (terms)", [cells], document));
    if (!container.textContent.trim()) container.remove();
  }
  function transformPlanGrids(root, document) {
    const own = (t) => [...t.rows].filter((r) => r.closest("table") === t);
    const grids = [...root.querySelectorAll("table")].filter((t) => own(t).some((r) => {
      var _a;
      return (_a = r.cells[0]) == null ? void 0 : _a.classList.contains("fillHalfCol");
    }));
    if (!grids.length) return;
    const text = (el) => el.textContent.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    const p = (html) => {
      const e = document.createElement("p");
      e.innerHTML = html;
      return e;
    };
    const cellDiv = (nodes) => {
      const d = document.createElement("div");
      d.append(...nodes);
      return d;
    };
    const anchors = {};
    const planBlock = (grid, headCells) => {
      const rows = [];
      const header = document.createElement("div");
      let eyebrowHtml = "";
      let namesHtml = "";
      let titleHtml = "";
      headCells.forEach((cell) => {
        const parts = cell.innerHTML.split(/<br\s*\/?>/i).map((x) => x.trim()).filter((x) => x.replace(/&nbsp;|<[^>]+>/g, "").trim());
        if (/benefits summary/i.test(text(cell))) {
          [eyebrowHtml] = parts;
          namesHtml = parts.slice(1).join("<br>");
        } else if (!titleHtml) {
          titleHtml = parts.join(" ");
        }
      });
      const eyebrow = p(eyebrowHtml);
      sentenceCaseNodes(eyebrow);
      const m = titleHtml.match(/^(.*?\))\s*(Effective\b.*)$/i);
      const h = document.createElement("h2");
      h.innerHTML = m ? m[1] : titleHtml;
      sentenceCaseNodes(h);
      header.append(eyebrow, h);
      if (m) {
        const eff = p(m[2]);
        sentenceCaseNodes(eff);
        header.append(eff);
      }
      if (namesHtml) header.append(p(namesHtml));
      rows.push([header]);
      anchors[text(h).toLowerCase()] = text(h);
      const carry = [];
      own(grid).forEach((tr) => {
        var _a;
        const cells = [...tr.cells];
        const num = ((_a = cells[0]) == null ? void 0 : _a.classList.contains("fillHalfCol")) ? cells.shift() : null;
        const numText = num ? text(num) : "";
        if (!cells.length) return;
        const first = cells[0];
        const all = cells.map(text).join(" ");
        if (cells.length === 1 && first.colSpan >= 3) {
          if (!all) return;
          if (first.querySelector("ol, ul")) {
            rows.push([cellDiv([first.querySelector("ol, ul")])]);
            return;
          }
          if (/in-network/i.test(all) && /out-of-network/i.test(all) && all.length < 40) {
            rows.push([cellDiv([]), cellDiv([document.createTextNode("In-network")]), cellDiv([document.createTextNode("Out-of-network")])]);
            return;
          }
          if (/^\d$/.test(numText) && first.querySelector("strong")) {
            const label2 = document.createElement("div");
            const hd = document.createElement("h4");
            hd.innerHTML = first.querySelector("strong").innerHTML;
            sentenceCaseNodes(hd);
            if (PLAN_TERM.test(text(hd))) hd.append(" :info:");
            label2.append(hd);
            first.querySelector("strong").remove();
            const rest = first.innerHTML.replace(/^(\s*<br\s*\/?>)+/i, "").trim();
            if (rest.replace(/&nbsp;/g, "").trim()) label2.append(p(rest));
            rows.push([label2]);
            return;
          }
          const bar = p(first.innerHTML.trim());
          sentenceCaseNodes(bar);
          rows.push([cellDiv([bar])]);
          return;
        }
        const label = document.createElement("div");
        const strong = first.querySelector("strong");
        if (/^\d$/.test(numText) && strong) {
          const hd = document.createElement("h4");
          hd.innerHTML = strong.innerHTML;
          sentenceCaseNodes(hd);
          if (PLAN_TERM.test(text(hd))) hd.append(" :info:");
          label.append(hd);
          strong.remove();
          const rest = first.innerHTML.replace(/^(\s*<br\s*\/?>)+/i, "").trim();
          if (rest.replace(/&nbsp;/g, "").trim()) label.append(p(rest));
        } else {
          const lp = p(first.innerHTML.trim());
          sentenceCaseNodes(lp);
          label.append(lp);
        }
        const values = [];
        let next = 1;
        const spanBoth = cells[1] && cells[1].colSpan >= 2;
        if (first.colSpan >= 2 && !text(cells[1] || first)) {
          rows.push([label, cellDiv([]), cellDiv([])]);
          return;
        }
        for (let k = 0; k < (spanBoth ? 1 : 2); k += 1) {
          if (carry[k] && carry[k].left > 0) {
            values.push(cellDiv([carry[k].node.cloneNode(true)]));
            carry[k].left -= 1;
          } else if (cells[next]) {
            const c = cells[next];
            next += 1;
            const v = p(c.innerHTML.trim());
            if (c.rowSpan > 1) carry[k] = { node: v.cloneNode(true), left: c.rowSpan - 1 };
            values.push(cellDiv(text(c) ? [v] : []));
          }
        }
        rows.push([label, ...values]);
      });
      return block("Plan details", rows, document);
    };
    const outer = grids[0].parentElement.closest("table");
    const frag = document.createDocumentFragment();
    if (outer && grids.every((g) => outer.contains(g))) {
      let head = [];
      own(outer).forEach((tr) => {
        const grid = grids.find((g) => tr.contains(g));
        if (grid) {
          frag.append(planBlock(grid, head));
          head = [];
          return;
        }
        if (text(tr)) head.push(...tr.cells);
      });
      head.forEach((c) => frag.append(cellDiv([...c.childNodes])));
      (outer.closest(".table-responsive") || outer).replaceWith(frag);
    } else {
      grids.forEach((g) => g.replaceWith(planBlock(g, [])));
    }
    root.querySelectorAll("a:not([href])").forEach((a) => {
      const t = text(a).toLowerCase();
      const target = Object.keys(anchors).find((k) => t.includes(k.replace(/\s*\(.*$/, "")));
      if (target) a.setAttribute("href", `#${target.replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}`);
    });
  }
  function transformTables(root, document) {
    [...root.querySelectorAll("table:not([data-block-table])")].reverse().forEach((table) => {
      if (table.closest("[data-block-table]")) return;
      const rows = [...table.querySelectorAll("tr")];
      const width = Math.max(0, ...rows.map((r) => r.children.length));
      const isData = table.querySelector("th") || rows.length >= 2 && width >= 2 && !table.querySelector("table");
      if (!isData || width < 2) {
        const frag = document.createDocumentFragment();
        table.querySelectorAll("td, th").forEach((c) => {
          const d = document.createElement("div");
          d.append(...c.childNodes);
          frag.append(d);
        });
        table.replaceWith(frag);
        return;
      }
      const cells = rows.map((tr) => [...tr.children].map((c) => {
        const d = document.createElement("div");
        d.append(...c.childNodes);
        if (!d.textContent.replace(/\u00a0/g, " ").trim() && !d.querySelector("img")) d.replaceChildren();
        return d;
      }));
      table.replaceWith(block(table.querySelector("th") ? "Table" : "Table (no-header)", cells, document));
    });
  }
  function transformDocumentLists(root, document) {
    const heads = [...root.querySelectorAll("h2, h3, h4")].filter((h) => {
      if (h.closest("[data-block-table]")) return false;
      const a = h.querySelector("a[href]");
      return a && /\.pdf/i.test(a.getAttribute("href")) && h.textContent.trim() === a.textContent.trim();
    });
    if (heads.length < 2) return;
    const rows = [];
    heads.forEach((h) => {
      const a = h.querySelector("a");
      const link = document.createElement("p");
      const na = document.createElement("a");
      na.href = a.getAttribute("href");
      na.textContent = sentenceCase(a.textContent.replace(/\u00a0/g, " ").trim());
      link.append(na);
      const desc = document.createElement("div");
      let n = h.nextElementSibling;
      while (n && !heads.includes(n) && !/^H[1-4]$/.test(n.nodeName)) {
        const next = n.nextElementSibling;
        desc.append(n);
        n = next;
      }
      const linkCell = document.createElement("div");
      linkCell.append(link);
      rows.push([linkCell, desc]);
    });
    const table = block("Documents", rows, document);
    heads[0].parentElement.insertBefore(table, heads[0]);
    heads.forEach((h) => h.remove());
  }
  function transformVideos(root, document) {
    const groups = [...root.querySelectorAll(".bottomBdrGrey")].filter((g) => g.querySelector(".videoCntCol"));
    if (!groups.length) return false;
    const out = document.createDocumentFragment();
    groups.forEach((g) => {
      const h = g.querySelector("h3");
      if (h) {
        const h2 = document.createElement("h2");
        h2.textContent = sentenceCase(h.textContent);
        out.append(h2);
      }
      const intro = g.querySelector(".videoCnt");
      if (intro) {
        const p = document.createElement("p");
        p.append(...intro.childNodes);
        out.append(p);
      }
      const rows = [...g.querySelectorAll(".videoCntCol li")].map((li) => {
        const img = li.querySelector("img");
        const imgCell = document.createElement("div");
        if (img) imgCell.append(img);
        const body = document.createElement("div");
        const title = li.querySelector("h2 a, h3 a");
        if (title) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = title.getAttribute("href");
          a.textContent = sentenceCase(title.textContent);
          p.append(a);
          body.append(p);
        }
        li.querySelectorAll("p").forEach((p) => {
          const a = p.querySelector('a[href*=".pdf" i]');
          if (a) {
            const np = document.createElement("p");
            const na = document.createElement("a");
            na.href = a.getAttribute("href");
            na.textContent = "Read transcript";
            np.append(na);
            body.append(np);
          } else if (p.textContent.trim()) {
            body.append(p);
          }
        });
        return [imgCell, body];
      });
      out.append(block("Videos", rows, document));
    });
    root.replaceChildren(out);
    return true;
  }
  function transformImageMaps(root, document, title) {
    root.querySelectorAll("img[usemap]").forEach((img) => {
      var _a;
      const name = img.getAttribute("usemap").replace("#", "");
      const map = root.querySelector(`map[name="${name}"], map#${CSS.escape(name)}`);
      img.removeAttribute("usemap");
      if (!img.getAttribute("alt")) img.setAttribute("alt", `${title} (infographic)`);
      if (!map) return;
      const ul = document.createElement("ul");
      map.querySelectorAll("area[href]").forEach((area) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = area.getAttribute("href");
        const alt = (area.getAttribute("alt") || "").trim();
        a.textContent = /^pdf$/i.test(alt) || !alt ? "Download this article (PDF)" : alt;
        li.append(a);
        ul.append(li);
      });
      map.remove();
      if (ul.children.length) {
        const p = document.createElement("p");
        p.textContent = "Related links";
        const s = document.createElement("strong");
        s.append(...p.childNodes);
        p.append(s);
        (_a = img.closest("p, div")) == null ? void 0 : _a.after(p, ul);
      }
    });
  }
  function findContent(document) {
    const banner = document.querySelector('#divImgPlHolder img, [id$="MainImg"]');
    const bannerAlt = (banner == null ? void 0 : banner.getAttribute("alt")) || "";
    const h1El = document.querySelector(".h1PageHeader, #divPageCnt h1, .pageHeader, main h1");
    const subEl = document.querySelector(".h2PageHeader");
    const root = document.querySelector('[id$="PageCntnt_divPgCntnt"]') || document.querySelector("#divPageCnt") || document.querySelector(".col-lg-9 #divPrintArticle") || document.querySelector("#page-content") || document.querySelector("main");
    return {
      root,
      h1: h1El ? h1El.textContent.replace(/\s+/g, " ").trim().replace(/^Your ?Track ?To ?Health\s*-\s*/i, "") : "",
      sub: subEl ? subEl.textContent.replace(/\s+/g, " ").trim() : "",
      bannerAlt,
      h1El
    };
  }
  var STALE_BANNER = /\b(Express Scripts|Best Doctors)\b/i;
  function introFromBanner(alt) {
    if (!alt) return "";
    const m = alt.match(/^(?:[A-Z0-9&®.,'’\s-]{3,}?\.|[^.]{0,60}\blogo\.)\s*(.+)$/i);
    const text = (m ? m[1] : "").trim().replace(/\bTrsuted\b/g, "Trusted");
    if (STALE_BANNER.test(text)) return "";
    return text.length > 20 ? text : "";
  }
  var import_site_default = {
    transform: ({ document, url }) => {
      const entry = url_map_data_default.pages[normalize(url)];
      if (!entry || !entry.path) throw new Error(`No URL map entry for ${url}`);
      const merged = entry.action === "merge";
      const path = merged ? `/drafts/merge-sources${entry.path === "/" ? "/index" : entry.path}-${normalize(url).replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}` : entry.path;
      const {
        root,
        h1,
        sub,
        bannerAlt,
        h1El
      } = findContent(document);
      if (h1El && root.contains(h1El)) h1El.remove();
      root.querySelectorAll('.h2PageHeader, [id$="PageCntnt_divHeader"]').forEach((el) => el.remove());
      let retirementContact = false;
      root.querySelectorAll('[id$="RetirementSidebar"]').forEach((side) => {
        if (/retirement specialist/i.test(side.textContent)) retirementContact = true;
        side.remove();
      });
      root.querySelectorAll('.implinkimgback, .implinkimgtop, img[src*="linkimgbk" i]').forEach((el) => el.remove());
      document.querySelectorAll(".webfeedback").forEach((box) => {
        if (root.contains(box) || box.contains(root)) return;
        const out = document.createElement("div");
        const heading = box.querySelector("h2, h3");
        if (heading) {
          const h = document.createElement("h2");
          h.textContent = heading.textContent.replace(/\s+/g, " ").trim();
          out.append(h);
        }
        box.querySelectorAll(":scope span").forEach((s) => {
          if (s.closest("h2, h3") || !s.textContent.trim()) return;
          const p = document.createElement("p");
          p.append(...s.childNodes);
          out.append(p);
        });
        box.querySelectorAll("a[href]").forEach((a) => {
          if (out.contains(a) || !a.textContent.trim() || a.closest("span")) return;
          const p = document.createElement("p");
          p.append(a);
          out.append(p);
        });
        root.append(out);
      });
      root.querySelectorAll('span[class^="icon-"], span[class*=" icon-"]').forEach((span) => {
        const cls = [...span.classList].find((c) => ICONS[c]);
        const box = span.closest(".contentbox") || span.closest('[class*="col-"]');
        if (cls && box && !box.dataset.icon) box.dataset.icon = ICONS[cls];
      });
      cleanup(root);
      const isArticle = /wellness article|news|image-only|campaign/.test(entry.template || "");
      const title = entry.forceTitle ? entry.title : sentenceCase(h1 && !/^yourtracktohealth$/i.test(h1) ? h1 : entry.title);
      const label = (SECTION_LABEL.find(([p]) => entry.path.startsWith(p)) || [])[1] || "";
      let listFolder = null;
      if (/archive \/ listing/.test(entry.template)) {
        listFolder = entry.path;
        root.replaceChildren();
      }
      if (/interactive tool/.test(entry.template) && /calculator/.test(entry.path)) {
        const keep = [...root.querySelectorAll(".caldiv > p")];
        const back = [...root.querySelectorAll("a")].find((a) => /^\s*return to\b/i.test(a.textContent));
        const backP = back ? document.createElement("p") : null;
        if (backP) backP.append(back);
        root.replaceChildren(...backP ? [backP] : [], ...keep);
      }
      if (/interactive tool/.test(entry.template)) {
        root.querySelectorAll('select, input, button, label, .form-horizontal, .form-group, [class*="fsacal" i], [id*="FsaCalculator" i], [id*="collapseFsa" i], [id*="divResult" i], table').forEach((el) => el.remove());
      }
      const videos = /video library/.test(entry.template) && transformVideos(root, document);
      if (!videos) {
        transformImageMaps(root, document, title);
        transformTermBoxes(root, document);
        transformPlanGrids(root, document);
        transformAccordions(root, document);
        transformCardGrids(root, document);
        transformDefinitionLists(root, document);
        transformTables(root, document);
      }
      rewriteLinks(root);
      if (!videos) {
        paragraphize(root, document);
        transformDocumentLists(root, document);
      }
      if (/interactive tool/.test(entry.template)) {
        if (/benefit-lookup/.test(entry.path)) {
          root.append(block("Benefit lookup", [["Data", "/benefits-coverage/benefit-lookup-data.json"]], document));
        } else {
          const note = document.createElement("div");
          note.innerHTML = "<p>*The estimated tax savings is intended to provide an estimate of your potential savings when you use a Health Flexible Spending Account. Your actual savings depend on a number of factors. Dollar amounts and savings will differ depending on income, state tax rules, city tax rules and other factors. Please consult a tax, legal or financial advisor about your own personal situation. For more information about the health FSA, call the FSA Customer Care Center at 1-888-298-9754.</p>";
          root.append(block("Fsa calculator", [["Maximum contribution", "3500"], ["Note", note]], document));
        }
      }
      root.querySelectorAll("h1").forEach((h) => {
        const h2 = document.createElement("h2");
        h2.append(...h.childNodes);
        h.replaceWith(h2);
      });
      root.querySelectorAll("h2, h3, h4, h5, h6").forEach((h) => {
        if (!h.textContent.trim()) {
          h.remove();
          return;
        }
        if (!h.querySelector("a") && h.children.length === 0) h.textContent = sentenceCase(h.textContent);
      });
      if (!root.querySelector("h2") && root.querySelector("h3")) {
        root.querySelectorAll("h3, h4, h5, h6").forEach((h) => {
          const up = document.createElement(`h${Number(h.tagName[1]) - 1}`);
          [...h.attributes].forEach((a) => up.setAttribute(a.name, a.value));
          up.append(...h.childNodes);
          h.replaceWith(up);
        });
      }
      root.querySelectorAll("p").forEach((p) => {
        const a = p.querySelector(":scope > a:only-child");
        const linkText = a ? a.textContent.trim() : "";
        if (a && p.textContent.trim() === linkText && linkText.length <= 32 && !p.closest("table") && /\b(view|learn|see|visit|read|download|access|find|get|start|explore|go)\b/i.test(linkText) && !a.querySelector("img")) {
          const s = document.createElement("strong");
          p.insertBefore(s, a);
          s.append(a);
        }
      });
      const main = document.createElement("div");
      const heroText = document.createElement("div");
      if (label) {
        const eyebrow = document.createElement("p");
        eyebrow.textContent = label;
        heroText.append(eyebrow);
      }
      const h1New = document.createElement("h1");
      h1New.textContent = title;
      heroText.append(h1New);
      const subtitle = sub ? sentenceCase(sub) : introFromBanner(bannerAlt);
      const lead = /:\s*$/.test(subtitle) ? subtitle : "";
      const intro = lead ? "" : subtitle;
      if (intro && intro.toLowerCase() !== title.toLowerCase()) {
        const p = document.createElement("p");
        p.textContent = intro;
        heroText.append(p);
      }
      const heroImage = hero_images_data_default[entry.path];
      const heroRows = [[heroText]];
      if (heroImage && !merged) {
        const img = document.createElement("img");
        img.src = heroImage.src;
        img.alt = "";
        heroRows.unshift([img]);
        heroRows.push(["Focus", heroImage.focus]);
      }
      main.append(block("Hero (navy)", heroRows, document));
      main.append(document.createElement("hr"));
      const body = document.createElement("div");
      body.append(...root.childNodes);
      const firstP = body.querySelector("p");
      if (firstP && intro && firstP.textContent.replace(/\s+/g, " ").trim().toLowerCase() === intro.toLowerCase()) firstP.remove();
      if (lead) {
        const p = document.createElement("p");
        p.textContent = lead;
        body.prepend(p);
      }
      if (listFolder) {
        const folder = listFolder === "/news" ? "/news" : "/health-programs/articles";
        body.append(block("Article list", [["Folder", folder], ["Limit", "12"]], document));
      }
      main.append(body);
      if (retirementContact) {
        const a = document.createElement("a");
        a.href = "/fragments/retirement-specialist-contact";
        a.textContent = a.getAttribute("href");
        body.append(block("Fragment", [[a]], document));
      }
      if (!merged) main.append(block("Section nav", [], document));
      main.append(WebImporter.DOMUtils.createTable([["Section Metadata"], ["Style", "narrow"]], document));
      const sentence = (ps) => ps.map((p) => p.textContent.replace(/\s+/g, " ").trim()).find((t) => t.length > 60);
      const paras = [...body.querySelectorAll("p")];
      const firstText = sentence(paras.filter((p) => !p.closest("table"))) || sentence(paras) || intro || "";
      const description = firstText.length > 160 ? `${firstText.slice(0, 157).replace(/\s+\S*$/, "")}\u2026` : firstText;
      const meta = { Title: title, Template: isArticle ? "article" : "content" };
      if (description) meta.Description = description;
      main.append(WebImporter.Blocks.getMetadataBlock(document, meta));
      return [{
        element: main,
        path,
        report: {
          source: url,
          template: entry.template,
          merged,
          title
        }
      }];
    }
  };
  return __toCommonJS(import_site_exports);
})();
