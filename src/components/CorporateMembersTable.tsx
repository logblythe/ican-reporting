import {
  MRT_Table,
  useMantineReactTable, //import alternative sub-component if we do not want toolbars
  type MRT_ColumnDef,
} from "mantine-react-table";
import { useMemo } from "react";
import { CorporateMemberType } from "../type";

type Props = {
  data?: CorporateMemberType[];
  isLoading: boolean;
};

export const CorporateMembersTable = ({ data = [], isLoading }: Props) => {
  const columns = useMemo<MRT_ColumnDef<CorporateMemberType>[]>(
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
        header: "Registration Type",
        Cell: ({ row }) => (
          <div>
            {row.original.reg_type_id.id === 340758
              ? "Corporate Block"
              : "Partnership"}
          </div>
        ),
      },
      {
        header: "Code",
        Cell: ({ row }) => <div>{row.original.discount_code.value}</div>,
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

export default CorporateMembersTable;
