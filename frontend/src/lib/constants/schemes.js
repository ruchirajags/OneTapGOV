// ─── Sectors ──────────────────────────────────────────────────────────────────
export const SECTORS = [
    {
        id: "students",
        title: "Students",
        description:
            "Scholarships, merit programs, education loans and academic support.",
        schemes: [
            "Post Matric Scholarship",
            "AICTE Pragati Scholarship",
            "Central Sector Scholarship",
            "INSPIRE Scholarship",
            "NSP Merit Scholarship",
            "National Means-cum-Merit Scholarship (NMMS)",
            "PM YASASVI Scholarship",
            "Merit-cum-Means Scholarship for Minorities",
            "National Fellowship for Higher Education of ST Students",
            "Prime Minister's Scholarship Scheme for Wards of Ex-Servicemen",
        ],
    },
    {
        id: "women",
        title: "Women",
        description:
            "Financial support, savings schemes, welfare initiatives and empowerment programs.",
        schemes: [
            "Sukanya Samriddhi Yojana",
            "Ujjwala Yojana",
            "Working Women Hostel Scheme",
            "Mahila Samman Savings Certificate",
            "Beti Bachao Beti Padhao",
            "Pradhan Mantri Matru Vandana Yojana",
            "Mahila Shakti Kendra",
            "One Stop Centre Scheme",
            "Stand-Up India",
            "Support to Training and Employment Programme (STEP)",
        ],
    },
    {
        id: "farmers",
        title: "Farmers",
        description:
            "Agricultural assistance, insurance programs, subsidies and financial support.",
        schemes: [
            "PM-KISAN",
            "Kisan Credit Card",
            "PMFBY",
            "Soil Health Card Scheme",
            "Agriculture Infrastructure Fund",
            "Pradhan Mantri Kisan Maandhan Yojana",
            "Rashtriya Krishi Vikas Yojana",
            "Pradhan Mantri Krishi Sinchayee Yojana",
            "Paramparagat Krishi Vikas Yojana",
            "National Agriculture Market (e-NAM)",
        ],
    },
];

// ─── How It Works Steps ────────────────────────────────────────────────────────
export const HOW_IT_WORKS_STEPS = [
    {
        number: "1",
        title: "Discover",
        description:
            "Tell us about yourself through a short set of guided questions. No forms, no confusion.",
        capabilities: [
            "Sector selection",
            "Language preference",
            "Basic profile creation",
            "Personal circumstances",
        ],
    },
    {
        number: "2",
        title: "Understand Eligibility",
        description:
            "We compare your information against verified scheme criteria and surface what matches.",
        capabilities: [
            "Eligibility checks",
            "Matching logic",
            "Recommendation generation",
            "Missing information alerts",
        ],
    },
    {
        number: "3",
        title: "Get Application Ready",
        description:
            "Receive clear guidance on what documents to gather and where to apply officially.",
        capabilities: [
            "Required documents",
            "Readiness checklist",
            "Official portal links",
        ],
    },
];

// ─── Recommendation Flow Nodes ─────────────────────────────────────────────────
export const FLOW_NODES = [
    {
        id: "info",
        label: "Your Information",
        description:
            "Occupation, income, education, and demographics you provide.",
    },
    {
        id: "rules",
        label: "Eligibility Rules",
        description: "Verified criteria published by official schemes.",
    },
    {
        id: "database",
        label: "Scheme Database",
        description: "Structured government scheme information.",
    },
    {
        id: "engine",
        label: "Matching Engine",
        description: "Rule-based system that compares your profile to criteria.",
    },
    {
        id: "matches",
        label: "Your Matches",
        description: "Personalized recommendations with eligibility explanations.",
    },
];

// ─── Comparison Rows ───────────────────────────────────────────────────────────
export const COMPARISON_ROWS = [
    {
        traditional: "Visit multiple government websites",
        onetap: "Single guided journey",
    },
    {
        traditional: "Search manually across departments",
        onetap: "Clear eligibility explanation",
    },
    {
        traditional: "Interpret complex eligibility criteria",
        onetap: "Personalized recommendations",
    },
    {
        traditional: "Prepare documents independently",
        onetap: "Document readiness support",
    },
    {
        traditional: "Risk missing opportunities",
        onetap: "Simplified, confident preparation",
    },
];

// ─── Trust Pillars ─────────────────────────────────────────────────────────────
export const TRUST_PILLARS = [
    {
        number: "01",
        title: "Official Data",
        description:
            "Recommendations use verified scheme criteria sourced from government publications.",
    },
    {
        number: "02",
        title: "Transparent Matching",
    },
    {
        number: "03",
        title: "Official Applications",
        description:
            "Final applications are always completed through official government portals.",
    },
];

// ─── Eligibility Preview Data ──────────────────────────────────────────────────
export const PROFILE_OPTIONS = {
    roles: ["Student", "Farmer", "Woman Entrepreneur", "Senior Citizen", "Job Seeker"],
    incomeRanges: [
        "Below ₹1,00,000",
        "₹1,00,001 – ₹2,50,000",
        "₹2,50,001 – ₹5,00,000",
        "₹5,00,001 – ₹8,00,000",
        "Above ₹8,00,000",
    ],
    percentages: [
        "Below 50%",
        "50% – 60%",
        "60% – 75%",
        "75% – 85%",
        "85% and above",
    ],
};

// NOTE: SCHEME_MATCHES below is a curated "top 3 preview" per role used on the
// eligibility-preview screen, not the full scheme list — the full list per
// sector now lives in SECTORS above and in the backend data/*.py files, each
// of which includes an "official_link" field pointing to the scheme's
// official government portal.
export const SCHEME_MATCHES = {
    Student: [
        {
            name: "AICTE Pragati Scholarship",
            strength: "High",
            documents: ["Aadhaar Card", "Income Certificate", "Admission Letter", "Fee Receipt", "Bank Passbook"],
            officialLink: "https://scholarships.gov.in",
        },
        {
            name: "Post Matric Scholarship",
            strength: "High",
            documents: ["Aadhaar Card", "Income Certificate", "Mark Sheet", "Bank Passbook"],
            officialLink: "https://scholarships.gov.in",
        },
        {
            name: "NSP Merit Scholarship",
            strength: "Medium",
            documents: ["Aadhaar Card", "Mark Sheet", "Bank Passbook"],
            officialLink: "https://scholarships.gov.in",
        },
    ],
    Farmer: [
        {
            name: "PM-KISAN",
            strength: "High",
            documents: ["Aadhaar Card", "Land Records", "Bank Passbook"],
            officialLink: "https://pmkisan.gov.in",
        },
        {
            name: "Kisan Credit Card",
            strength: "High",
            documents: ["Aadhaar Card", "Land Records", "Income Certificate"],
            officialLink: "https://www.myscheme.gov.in/schemes/kcc",
        },
        {
            name: "PMFBY",
            strength: "Medium",
            documents: ["Aadhaar Card", "Land Records", "Bank Passbook"],
            officialLink: "https://pmfby.gov.in",
        },
    ],
    "Woman Entrepreneur": [
        {
            name: "Mahila Samman Savings Certificate",
            strength: "High",
            documents: ["Aadhaar Card", "PAN Card", "Bank Passbook"],
            officialLink: "https://www.nsiindia.gov.in",
        },
        {
            name: "Sukanya Samriddhi Yojana",
            strength: "High",
            documents: ["Aadhaar Card", "Birth Certificate", "Bank Passbook"],
            officialLink: "https://www.nsiindia.gov.in",
        },
        {
            name: "Stand-Up India",
            strength: "Medium",
            documents: ["Aadhaar Card", "PAN Card", "Business Plan", "Bank Passbook"],
            officialLink: "https://www.standupmitra.in",
        },
    ],
    "Senior Citizen": [
        {
            name: "Indira Gandhi National Old Age Pension",
            strength: "High",
            documents: ["Aadhaar Card", "Age Certificate", "Income Certificate"],
            officialLink: "https://nsap.nic.in",
        },
        {
            name: "Pradhan Mantri Vaya Vandana Yojana",
            strength: "High",
            documents: ["Aadhaar Card", "PAN Card", "Bank Passbook"],
            officialLink: "https://www.licindia.in",
        },
        {
            name: "Senior Citizen Savings Scheme",
            strength: "Medium",
            documents: ["Aadhaar Card", "PAN Card", "Age Certificate"],
            officialLink: "https://www.nsiindia.gov.in",
        },
    ],
    "Job Seeker": [
        {
            name: "PM Rojgar Protsahan Yojana",
            strength: "High",
            documents: ["Aadhaar Card", "Educational Certificate", "Bank Passbook"],
            officialLink: "https://www.pmrpy.gov.in",
        },
        {
            name: "Pradhan Mantri Kaushal Vikas Yojana",
            strength: "High",
            documents: ["Aadhaar Card", "Educational Certificate"],
            officialLink: "https://www.pmkvyofficial.org",
        },
        {
            name: "National Career Service Portal",
            strength: "Medium",
            documents: ["Aadhaar Card", "Resume"],
            officialLink: "https://www.ncs.gov.in",
        },
    ],
};