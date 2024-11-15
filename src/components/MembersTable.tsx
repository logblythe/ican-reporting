import {
  MRT_Table,
  useMantineReactTable, //import alternative sub-component if we do not want toolbars
  type MRT_ColumnDef,
} from "mantine-react-table";
import { useMemo } from "react";
import { MemberType } from "../type";

type Props = {
  data?: MemberType[];
  isLoading: boolean;
};

export const MembersTable = ({ data = [], isLoading }: Props) => {
  const columns = useMemo<MRT_ColumnDef<MemberType>[]>(
    () => [
      {
        header: "Name",
        Cell: ({ row }) => (
          <div>
            {row.original.first_name} {row.original.last_name}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        header: "Type",
        Cell: ({ row }) => <div>{row.original.c_1401925.value}</div>,
      },
      {
        header: "Complete",
        Cell: ({ row }) => (
          <div>
            {row.original.registration_status === "confirmed" ? "Yes" : "No"}
          </div>
        ),
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

  return <MRT_Table table={table} />;
};

export default MembersTable;
