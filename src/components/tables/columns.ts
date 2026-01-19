import { MRT_ColumnDef } from "mantine-react-table";
import { CompanyMember, CorporateMember, IndividualMember } from "../../type";

export const COMPANY_MEMBER_COLUMNS: MRT_ColumnDef<CompanyMember>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "attendanceType",
    header: "Attendance",
  },
  {
    accessorKey: "attendanceTypePartnership",
    header: "Type",
  },
  //INFO: hidden as requested by Sydney
  // {
  //   accessorKey: "registrationStatus",
  //   header: "Complete",
  // },
];

export const CORPORATE_MEMBER_COLUMNS: MRT_ColumnDef<CorporateMember>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  { accessorKey: "inPersonSeats", header: "In Person Seats" },
  {
    accessorKey: "virtualSeats",
    header: "Virtual Seats",
  },
  {
    accessorKey: "registrationType",
    header: "Registration Type",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "willYouPersonallyAttend",
    header: "Will you personally be attending the event?",
  },
  //INFO: hidden as requested by Sydney
  // {
  //   accessorKey: "blockCode",
  //   header: "Code",
  // },
];

export const INDIVIDUAL_MEMBER_COLUMNS: MRT_ColumnDef<IndividualMember>[] = [
  //INFO: hidden as requested by Sydney
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "registrationType",
    header: "Registration Type",
  },
  {
    accessorKey: "attendanceType",
    header: "Type",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  //INFO: hidden as requested by Sydney
  // {
  //   accessorKey: "registrationStatus",
  //   header: "Complete",
  // },
];
