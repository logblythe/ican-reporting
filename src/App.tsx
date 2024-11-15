import {
  Center,
  Flex,
  Image,
  Stack,
  Tabs,
  TextInput,
  Title,
} from "@mantine/core";
import { lazy, Suspense, useEffect, useState } from "react";
import header from "./assets/ican-header.png";
import logo from "./assets/ican-logo.png";
import useDebounce from "./hooks/useDebounce";
import { MemberResponseType, NetworkStatus } from "./type";

const CorporateMembersTable = lazy(
  () => import("./components/CorporateMembersTable")
);

const MembersTable = lazy(() => import("./components/MembersTable"));

export const App = () => {
  const [company, setCompany] = useState<string>("swoogo");
  const [cid, setCid] = useState<string>("23613927");
  const [response, setResponse] = useState<MemberResponseType | null>(null);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>("idle");
  const debouncedCid = useDebounce(cid, 500);
  const debouncedCompany = useDebounce(company, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNetworkStatus("loading");
        const networkResponse = await fetch(
          `https://ican-2024-88255e5bae19.herokuapp.com/api/v1/report?company=${debouncedCompany}&cid=${debouncedCid}`,
          {
            method: "GET",
          }
        );
        const data = await networkResponse.json();
        setResponse(data);
        setNetworkStatus("success");
      } catch {
        setNetworkStatus("error");
      }
    };
    fetchData();
  }, [debouncedCompany, debouncedCid]);

  return (
    <Stack>
      <Stack spacing={0}>
        <Flex gap={"xl"}>
          <Image
            maw={200}
            h={62}
            alt="ican-logo"
            src={logo}
            py={"xs"}
            pl={"xs"}
            mr={"xl"}
          />
          <Center ml={"xl"}>
            <Title
              order={2}
              align="center"
              weight={700}
              my={"auto"}
              size={28}
              color="#8b1a71"
            >
              Partner Report
            </Title>
          </Center>
        </Flex>
        <Image height={"1vw"} src={header} fit="fill" alt="ican-header" />
      </Stack>
      <Stack px={"sm"}>
        <Flex gap={"lg"}>
          <TextInput
            label="Enter company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            w={300}
          />
          <TextInput
            label="Enter Cid"
            placeholder="Enter cid"
            value={cid}
            onChange={(event) => setCid(event.target.value)}
          />
        </Flex>
        <Tabs
          variant="outline"
          defaultValue="members"
          classNames={{ tabLabel: "tabLabel" }}
        >
          <Tabs.List>
            <Tabs.Tab value="members">
              Registrations under this partnership
            </Tabs.Tab>
            <Tabs.Tab value="company-members">
              Registrations not under this partnership
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="members">
            <Suspense fallback={null}>
              <MembersTable
                data={response?.companyMember}
                isLoading={networkStatus === "loading"}
              />
            </Suspense>
          </Tabs.Panel>
          <Tabs.Panel value="company-members">
            <Suspense fallback={null}>
              <CorporateMembersTable
                data={response?.corporateMember}
                isLoading={networkStatus === "loading"}
              />
            </Suspense>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Stack>
  );
};

export default App;
