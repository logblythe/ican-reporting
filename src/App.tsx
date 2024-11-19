import {
  Divider,
  Flex,
  Image,
  Stack,
  Tabs,
  TextInput,
  Title,
} from "@mantine/core";
import { lazy, Suspense, useEffect, useState } from "react";
import header from "./assets/ican-header.jpg";
import useDebounce from "./hooks/useDebounce";
import { MemberResponseType, NetworkStatus } from "./type";

const CompanyMembersTable = lazy(
  () => import("./components/tables/CompanyMembers")
);
const CorporateMembersTable = lazy(
  () => import("./components/tables/CorporateMembers")
);
const IndividualMembersTable = lazy(
  () => import("./components/tables/IndividualMembers")
);

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
    <Stack spacing={0}>
      <Image alt="ican-logo" src={header} />
      <Divider color="#8b1a71" />
      <Title order={2} weight={700} size={28} color="#8b1a71" p={"md"}>
        Partner Report
      </Title>
      <Divider color="#8b1a71" />
      <Stack p={"sm"}>
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
          <Tabs.Panel value="members" py={8} px={2}>
            <Suspense fallback={null}>
              <CompanyMembersTable
                data={response?.companyMembers}
                isLoading={networkStatus === "loading"}
              />
            </Suspense>
          </Tabs.Panel>
          <Tabs.Panel value="company-members" p={8}>
            <Suspense fallback={null}>
              <Tabs
                variant="outline"
                defaultValue="corporate-blocks"
                classNames={{ tabLabel: "tabLabel" }}
                orientation="vertical"
              >
                <Tabs.List>
                  <Tabs.Tab value="corporate-blocks">Corporate Blocks</Tabs.Tab>
                  <Tabs.Tab value="individuals">Individual</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="corporate-blocks" p={8}>
                  <CorporateMembersTable
                    data={response?.corporateMembers}
                    isLoading={networkStatus === "loading"}
                  />
                </Tabs.Panel>
                <Tabs.Panel value="individuals" p={8}>
                  <IndividualMembersTable
                    data={response?.individualMembers}
                    isLoading={networkStatus === "loading"}
                  />
                </Tabs.Panel>
              </Tabs>
            </Suspense>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Stack>
  );
};

export default App;
