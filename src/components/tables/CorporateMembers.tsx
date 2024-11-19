import { Stack, Text } from "@mantine/core";
import {
  MRT_Table,
  useMantineReactTable, //import alternative sub-component if we do not want toolbars
  type MRT_ColumnDef,
} from "mantine-react-table";
import { useMemo } from "react";
import { CorporateMember } from "../../type";

type Props = {
  data?: CorporateMember[];
  isLoading: boolean;
};

export const CorporateMembersTable = ({ data = [], isLoading }: Props) => {
  const columns = useMemo<MRT_ColumnDef<CorporateMember>[]>(
    () => [
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
        accessorKey: "discountCode",
        header: "Code",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
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

export default CorporateMembersTable;
