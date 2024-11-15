export type NetworkStatus = "idle" | "loading" | "success" | "error";

export type MemberType = {
  items: Array<Member>;
  totalCount: number;
};

export type Member = {
  id: string;
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
  companyMember: MemberType;
  corporateMember: MemberType;
  individualMember: MemberType;
};
