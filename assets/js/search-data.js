// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-patents",
          title: "patents",
          description: "A list of my patents.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/patents/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-paper-ai-vs-zero-trust-the-twin-pillars-of-cybersecurity-defense-in-2025-link",
          title: 'Paper “AI vs. Zero Trust: The Twin Pillars of Cybersecurity Defense in 2025...',
          description: "",
          section: "News",},{id: "news-worked-at-capgemini-technology-services-bengaluru-india-as-a-associate-consultant",
          title: 'Worked at Capgemini Technology Services, Bengaluru, India as a Associate Consultant.',
          description: "",
          section: "News",},{id: "news-join-bharat-petroleum-corporation-limited-bpcl-india-mumbai-as-a-software-engineer-for-the-lpg-team",
          title: 'Join Bharat Petroleum Corporation Limited (BPCL), India, Mumbai as a Software Engineer for...',
          description: "",
          section: "News",},{id: "news-graduated-from-york-university-toronto-canada-post-gradute-in-cybersecurity-operations",
          title: 'Graduated from York University, Toronto, Canada, Post -Gradute in Cybersecurity Operations',
          description: "",
          section: "News",},{id: "news-worked-at-kryptos-technologies-chennai-india-as-a-security-operations-center-soc-analyst",
          title: 'Worked at Kryptos Technologies, Chennai, India as a Security Operations Center(SOC) Analyst',
          description: "",
          section: "News",},{id: "news-spamgpt-the-new-face-of-phishing-as-a-service-spamgpt-the-new-face-of-phishing-as-a-service",
          title: '“SpamGPT:The New Face of Phishing-as-a-Service “.   [SpamGPT: The New Face of Phishing-as-a-Service]',
          description: "",
          section: "News",},{id: "news-tryhackme-active-directory-basics-link",
          title: 'TryHackme Active Directory Basics “. 🎉✨ [link]',
          description: "",
          section: "News",},{id: "news-thm-active-directory-hardening-thm-active-directory-hardening",
          title: 'THM: Active Directory Hardening “. [THM: Active Directory Hardening]',
          description: "",
          section: "News",},{id: "news-tryhackme-burp-suite-basics-web-fundamentals-path-tryhackme-burp-suite-basics-web-fundamentals-path",
          title: '“TryHackMe Burp Suite Basics(Web Fundamentals Path) “. [TryHackMe Burp Suite Basics(Web Fundamentals Path)]...',
          description: "",
          section: "News",},{id: "news-tryhackme-burp-suite-reapter-walkthrough-tryhackme-burp-suite-reapter-walkthrough",
          title: '“**TryHackme Burp Suite Reapter Walkthrough ** “ [TryHackme Burp Suite Reapter Walkthrough]',
          description: "",
          section: "News",},{id: "news-graduated-from-model-engineering-college-thrikkakara-india-cusat-b-tech-in-cse",
          title: 'Graduated from Model Engineering College, Thrikkakara, India (CUSAT), B-Tech in CSE',
          description: "",
          section: "News",},{id: "projects-cybersecurity-incident-response-plan",
          title: 'Cybersecurity Incident Response Plan',
          description: "Comprehensive incident response framework for Big Leaf Enterprise",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-vulnerability-assessment-amp-penetration-testing-vapt",
          title: 'Vulnerability Assessment &amp;amp; Penetration Testing (VAPT)',
          description: "Comprehensive security assessments of web applications and internal networks",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-ai-powered-security-alert-automation",
          title: 'AI-Powered Security Alert Automation',
          description: "Automating Microsoft Defender alerts using artificial intelligence",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-windows-server-amp-active-directory-lab",
          title: 'Windows Server &amp;amp; Active Directory Lab',
          description: "Enterprise infrastructure deployment on Azure Cloud",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
