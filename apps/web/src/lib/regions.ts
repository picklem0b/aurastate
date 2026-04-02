export type RegionCode =
  | "ZA_WC"
  | "ZA_GP"
  | "ZA_KZN"
  | "ZA_DEFAULT"
  | string;

export interface Province {
  code: string;
  name: string;
}

export interface Region {
  code: string;
  name: string;
  flag: string;
  provinces?: Province[];
}

export const SUPPORTED_REGIONS: Region[] = [
  {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    provinces: [
      { code: "WC",  name: "Western Cape" },
      { code: "GP",  name: "Gauteng" },
      { code: "KZN", name: "KwaZulu-Natal" },
      { code: "EC",  name: "Eastern Cape" },
      { code: "FS",  name: "Free State" },
      { code: "LP",  name: "Limpopo" },
      { code: "MP",  name: "Mpumalanga" },
      { code: "NW",  name: "North West" },
      { code: "NC",  name: "Northern Cape" },
    ],
  },
  // Extend as needed
  { code: "ZW", name: "Zimbabwe",    flag: "🇿🇼" },
  { code: "NG", name: "Nigeria",     flag: "🇳🇬" },
  { code: "KE", name: "Kenya",       flag: "🇰🇪" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
];

export interface SubjectConfig {
  mandatory: string[];
  electives: string[];
  electivesLimit: number;
  boards: string[];
}

const REGION_SUBJECTS: Record<string, SubjectConfig> = {
  ZA_WC: {
    mandatory: [
      "Life Orientation",
      "Mathematics",
      "English Home Language",
      "Afrikaans First Additional Language",
    ],
    electives: [
      "Physical Sciences",
      "Life Sciences",
      "Geography",
      "History",
      "Accounting",
      "Business Studies",
      "Economics",
      "Information Technology",
      "Computer Applications Technology",
      "Visual Arts",
      "Dramatic Arts",
      "Music",
      "Mathematical Literacy",
    ],
    electivesLimit: 3,
    boards: ["CAPS", "IEB"],
  },
  ZA_GP: {
    mandatory: [
      "Life Orientation",
      "Mathematics",
      "English Home Language",
    ],
    electives: [
      "Afrikaans First Additional Language",
      "Zulu Home Language",
      "Physical Sciences",
      "Life Sciences",
      "Geography",
      "History",
      "Accounting",
      "Business Studies",
      "Economics",
      "Information Technology",
      "Computer Applications Technology",
      "Mathematical Literacy",
    ],
    electivesLimit: 4,
    boards: ["CAPS", "IEB"],
  },
  DEFAULT: {
    mandatory: ["Core Subject 1", "Core Subject 2"],
    electives: ["Elective 1", "Elective 2", "Elective 3", "Elective 4", "Elective 5"],
    electivesLimit: 5,
    boards: ["National"],
  },
};

export function getRegionSubjects(region: string, _stream?: string): SubjectConfig {
  return REGION_SUBJECTS[region] ?? REGION_SUBJECTS["DEFAULT"];
}
