import { Card, Stack, Text } from "@mantine/core";
import {
  MRT_Table,
  useMantineReactTable, //import alternative sub-component if we do not want toolbars
  type MRT_ColumnDef,
} from "mantine-react-table";
import { CorporateMember } from "../../type";
import { CORPORATE_MEMBER_COLUMNS } from "./columns";

type Props = {
  data?: CorporateMember[];
  isLoading: boolean;
};

export const CorporateMembersTable = ({ data = [], isLoading }: Props) => {
  const table = useMantineReactTable({
    columns: CORPORATE_MEMBER_COLUMNS as MRT_ColumnDef<CorporateMember>[],
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableStickyHeader: true,
    state: { isLoading },
    mantineTableProps: {
      highlightOnHover: true,
      withColumnBorders: true,
      sx: {
        "thead > tr": {
          backgroundColor: "white",
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
    <Card shadow="sm" padding="0" radius="md" withBorder>
      <Card.Section withBorder inheritPadding p="xs">
        <Text color="#2647ff" size={"lg"} weight={500}>
          Corporate Blocks
        </Text>
      </Card.Section>
      <Stack>
        <MRT_Table table={table} />
        {isLoading ? null : (
          <Text fw={500} p={8}>
            Total Block Purchasers : {data?.length}
          </Text>
        )}
      </Stack>
    </Card>
  );
};

export default CorporateMembersTable;
