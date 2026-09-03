import { REGIONS, type RegionCode, SUBJECTS } from "@aurastate/shared";

export interface RegionConfigResponse {
  code: string;
  name: string;
  country: string;
  mandatory: { code: string; name: string }[];
  electivesLimit: number;
  maxSubjects: number;
  boards: string[];
  schoolYear: {
    start: string;
    end: string;
    terms: number;
  };
  languages: string[];
}

export function getRegionConfig(regionCode: string): RegionConfigResponse | null {
  const config = REGIONS[regionCode as RegionCode];

  if (!config) {
    return null;
  }

  const mandatory = config.mandatory.map((code) => {
    const subject = SUBJECTS[code];
    return {
      code,
      name: subject?.name ?? code,
    };
  });

  // Get electives (all subjects not in mandatory)
  const mandatoryCodes = new Set(config.mandatory);
  const electives = Object.entries(SUBJECTS)
    .filter(([code]) => !mandatoryCodes.has(code as any))
    .map(([code, subject]) => ({
      code,
      name: subject.name,
    }));

  return {
    code: config.code,
    name: config.name,
    country: config.country,
    mandatory,
    electivesLimit: config.electivesLimit,
    maxSubjects: config.mandatory.length + config.electivesLimit,
    boards: [...config.boards],
    schoolYear: {
      start: "January",
      end: "November",
      terms: 4,
    },
    languages: [...config.languages],
  };
}

export function getElectives(regionCode: string): { code: string; name: string }[] {
  const config = REGIONS[regionCode as RegionCode];
  if (!config) return [];

  const mandatoryCodes = new Set(config.mandatory);
  return Object.entries(SUBJECTS)
    .filter(([code]) => !mandatoryCodes.has(code as any))
    .map(([code, subject]) => ({
      code,
      name: subject.name,
    }));
}
