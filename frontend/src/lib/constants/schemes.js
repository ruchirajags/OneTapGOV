// ─── Sectors ──────────────────────────────────────────────────────────────────
export const SECTORS = [
    {
        id: "students",
        icon: "🎓",
        title: "Students",
        description:
            "Scholarships, merit programs, education loans and academic support.",
        schemes: [
            "Post Matric Scholarship",
            "AICTE Pragati Scholarship",
            "Central Sector Scholarship",
            "INSPIRE Scholarship",
            "NSP Merit Scholarship",
        ],
    },
    {
        id: "women",
        icon: "👩",
        title: "Women",
        description:
            "Financial support, savings schemes, welfare initiatives and empowerment programs.",
        schemes: [
            "Sukanya Samriddhi Yojana",
            "Ujjwala Yojana",
            "Working Women Hostel Scheme",
            "Mahila Samman Savings Certificate",
            "Beti Bachao Beti Padhao",
        ],
    },
    {
        id: "farmers",
        icon: "🌾",
        title: "Farmers",
        description:
            "Agricultural assistance, insurance programs, subsidies and financial support.",
        schemes: [
            "PM-KISAN",
            "Kisan Credit Card",
            "PMFBY",
            "Soil Health Card Scheme",
            "Agriculture Infrastructure Fund",
        ],
    },
];

// ─── How It Works Steps ────────────────────────────────────────────────────────
export const HOW_IT_WORKS_STEPS = [
    {
        number: "01",
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
        number: "02",
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
        number: "03",
        title: "Get Application Ready",
        description:
            "Receive clear guidance on what documents to gather and where to apply officially.",
        capabilities: [
            "Required documents",
            "Readiness checklist",
            "Application instructions",
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
        description:
            "Every recommendation includes an explanation of why it appears for your profile.",
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

export const SCHEME_MATCHES = {
    Student: [
        {
            name: "AICTE Pragati Scholarship",
            strength: "High",
            documents: ["Aadhaar Card", "Income Certificate", "Admission Letter", "Fee Receipt", "Bank Passbook"],
        },
        {
            name: "Post Matric Scholarship",
            strength: "High",
            documents: ["Aadhaar Card", "Income Certificate", "Mark Sheet", "Bank Passbook"],
        },
        {
            name: "NSP Merit Scholarship",
            strength: "Medium",
            documents: ["Aadhaar Card", "Mark Sheet", "Bank Passbook"],
        },
    ],
    Farmer: [
        {
            name: "PM-KISAN",
            strength: "High",
            documents: ["Aadhaar Card", "Land Records", "Bank Passbook"],
        },
        {
            name: "Kisan Credit Card",
            strength: "High",
            documents: ["Aadhaar Card", "Land Records", "Income Certificate"],
        },
        {
            name: "PMFBY",
            strength: "Medium",
            documents: ["Aadhaar Card", "Land Records", "Bank Passbook"],
        },
    ],
    "Woman Entrepreneur": [
        {
            name: "Mahila Samman Savings Certificate",
            strength: "High",
            documents: ["Aadhaar Card", "PAN Card", "Bank Passbook"],
        },
        {
            name: "Sukanya Samriddhi Yojana",
            strength: "High",
            documents: ["Aadhaar Card", "Birth Certificate", "Bank Passbook"],
        },
        {
            name: "Ujjwala Yojana",
            strength: "Medium",
            documents: ["Aadhaar Card", "BPL Card", "Bank Passbook"],
        },
    ],
    "Senior Citizen": [
        {
            name: "Indira Gandhi National Old Age Pension",
            strength: "High",
            documents: ["Aadhaar Card", "Age Certificate", "Income Certificate"],
        },
        {
            name: "Pradhan Mantri Vaya Vandana Yojana",
            strength: "High",
            documents: ["Aadhaar Card", "PAN Card", "Bank Passbook"],
        },
        {
            name: "Senior Citizen Savings Scheme",
            strength: "Medium",
            documents: ["Aadhaar Card", "PAN Card", "Age Certificate"],
        },
    ],
    "Job Seeker": [
        {
            name: "PM Rojgar Protsahan Yojana",
            strength: "High",
            documents: ["Aadhaar Card", "Educational Certificate", "Bank Passbook"],
        },
        {
            name: "Pradhan Mantri Kaushal Vikas Yojana",
            strength: "High",
            documents: ["Aadhaar Card", "Educational Certificate"],
        },
        {
            name: "National Career Service Portal",
            strength: "Medium",
            documents: ["Aadhaar Card", "Resume"],
        },
    ],
};