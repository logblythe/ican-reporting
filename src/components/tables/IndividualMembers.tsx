import { Button, Card, Flex, Stack, Text } from "@mantine/core";
import {
  MRT_Table,
  useMantineReactTable, //import alternative sub-component if we do not want toolbars
  type MRT_ColumnDef,
} from "mantine-react-table";
import { IndividualMember } from "../../type";
import { INDIVIDUAL_MEMBER_COLUMNS } from "./columns";

type Props = {
  data?: IndividualMember[];
  isLoading: boolean;
  onExport: () => void;
};

export const IndividualMembersTable = ({
  data = [],
  isLoading,
  onExport,
}: Props) => {
  const table = useMantineReactTable({
    columns: INDIVIDUAL_MEMBER_COLUMNS as MRT_ColumnDef<IndividualMember>[],
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
        <Flex gap={"md"}>
          <Text color="#3FA9F5" size={"lg"} weight={500}>
            Single Individuals and Corporate Block Individuals
          </Text>
          <Button onClick={onExport} variant="outline">
            Download
          </Button>
        </Flex>
      </Card.Section>
      <Stack>
        <MRT_Table table={table} />
        {isLoading ? null : (
          <Text fw={500} p={8}>
            Total Count : {data?.length}
          </Text>
        )}
      </Stack>
    </Card>
  );
};

export default IndividualMembersTable;
