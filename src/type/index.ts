export type NetworkStatus = "idle" | "loading" | "success" | "error";

type BaseMember = {
  name: string;
  email: string;
  attendanceType: string;
  registrationStatus: string;
};

export type CompanyMember = BaseMember & {
  attendanceTypePartnership: string;
};

export type CorporateMember = BaseMember & {
  registrationType: string;
  discountCode: string;
  company: string;
  blockCode: string;
  virtualSeats: number;
  inPersonSeats: number;
  willYouPersonallyAttend: string;
};

export type IndividualMember = BaseMember & {
  id: string;
  registrationType: string;
  company: string;
};

export type MemberResponseType = {
  companyMembers: CompanyMember[];
  corporateMembers: CorporateMember[];
  individualMembers: IndividualMember[];
  companyMemberSize: number;
  corporateAttendingMemberSize: number;
  corporateNonAttendingMemberSize: number;
  individualMemberSize: number;
};

export type EventInfo = {
  eventDate: string;
  eventName: string;
  inPersonData: {
    individual: number;
    corporateBlockSeats: number;
    partnershipBlockSeats: number;
  };
  virtualData: {
    individual: number;
    corporateBlockSeats: number;
    partnershipBlockSeats: number;
  };
  partnershipRegistrationsCompleted: number;
  totalCorporateBlockSeatsPurchased: number;
  partnershipBlockSeatsPurchased: number;
  totalIndividualRegistrationsCompleted: number;
  totalRegistrationsCount: number;
  unusedRegistrationsWithLink: number;
};
