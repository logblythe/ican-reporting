import { Stack, Text } from "@mantine/core";
import {
  MRT_Table,
  useMantineReactTable, //import alternative sub-component if we do not want toolbars
  type MRT_ColumnDef,
} from "mantine-react-table";
import { CompanyMember } from "../../type";
import { COMPANY_MEMBER_COLUMNS } from "./columns";

type Props = {
  data?: CompanyMember[];
  isLoading: boolean;
};

export const CompanyMembersTable = ({ data = [], isLoading }: Props) => {
  const table = useMantineReactTable({
    columns: COMPANY_MEMBER_COLUMNS as MRT_ColumnDef<CompanyMember>[],
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    state: { isLoading },
    mantineTableProps: {
      highlightOnHover: true,
      withColumnBorders: true,
      sx: {
        "thead > tr": {
          backgroundColor: "inherit",
        },
        "thead > tr > th": {
          backgroundColor: "inherit",
        },
        "tbody > tr > td": {
          backgroundColor: "inherit",
        },
      },
    },
  });

  return (
    <Stack>
      <MRT_Table table={table} />
      {isLoading ? null : (
        <Text fw={500} p={8}>
          Total count : {data?.length}
        </Text>
      )}
    </Stack>
  );
};

export default CompanyMembersTable;
