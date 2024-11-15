export type NetworkStatus = "idle" | "loading" | "success" | "error";

export type MemberType = {
  c_1401925: {
    id: number;
    value: string;
  };
  first_name: string;
  last_name: string;
  email: string;
  registration_status: string;
};

export type CorporateMemberType = {
  reg_type_id: {
    id: number;
    value: string;
  };
  discount_code: {
    id: number;
    value: string;
  };
  c_1401925: {
    id: string;
    value: string | null;
  };
  first_name: string;
  last_name: string;
  email: string;
  registration_status: string;
};

export type MemberResponseType = {
  member: MemberType[];
  companyMember: CorporateMemberType[];
  cidMember: null;
};
