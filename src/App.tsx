import { Divider, Image, Space, Stack, Text, Title } from "@mantine/core";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
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
  const queryParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );
  const companyParam = queryParams.get("company") ?? "";
  const cidParam = queryParams.get("cid") ?? "";
  const yearParam = queryParams.get("year") ?? "2024";

  const [company, setCompany] = useState<string>(companyParam);
  const [cid, setCid] = useState<string>(cidParam);
  const [response, setResponse] = useState<MemberResponseType | null>(null);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>("idle");

  const debouncedCid = useDebounce(cid, 500);
  const debouncedCompany = useDebounce(company, 500);

  useEffect(() => {
    if (!companyParam || !cidParam) {
      queryParams.set("company", "fnbo");
      queryParams.set("cid", "33897499");
      queryParams.set("year", "2024");
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${queryParams.toString()}`
      );
      setCompany("swoogo");
      setCid("23613927");
    }
  }, [cidParam, companyParam, queryParams]);

  useEffect(() => {
    if (debouncedCompany.length === 0 || debouncedCid.length === 0) {
      return;
    }
    const fetchData = async () => {
      try {
        setNetworkStatus("loading");
        const networkResponse = await fetch(
          `https://ican-2024-88255e5bae19.herokuapp.com/api/v1/report?company=${debouncedCompany}&cid=${debouncedCid}&year=${yearParam}`,
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
  }, [debouncedCid, debouncedCompany]);

  return (
    <Stack spacing={0}>
      <Image alt="ican-logo" src={header} />
      <Divider color="#ff1d6c" />
      <Title order={2} weight={700} size={28} color="#ff1d6c" px={"md"}>
        Partner Report
      </Title>
      <Text fw={500} px={"md"} color="dimmed">
        Grand total:{" "}
        {response
          ? response!.companyMembers.length +
            response!.corporateMembers.length +
            response!.individualMembers.length
          : 0}
        {}
      </Text>
      <Divider color="#ff1d6c" />
      <Stack p={"sm"}>
        <Text color="#2647ff" size={"xl"} weight={500}>
          Registrations under this partnership
        </Text>
        <Suspense fallback={null}>
          <CompanyMembersTable
            data={response?.companyMembers}
            isLoading={networkStatus === "loading"}
          />
        </Suspense>
        <Space h={"xl"} />
        <Text color="#2647ff" size={"xl"} weight={500}>
          Registrations not under this partnership
        </Text>
        <Suspense fallback={null}>
          <CorporateMembersTable
            data={response?.corporateMembers}
            isLoading={networkStatus === "loading"}
          />
        </Suspense>
        <Suspense fallback={null}>
          <IndividualMembersTable
            data={response?.individualMembers}
            isLoading={networkStatus === "loading"}
          />
        </Suspense>
        <Space h={"xl"} />
      </Stack>
    </Stack>
  );
};

export default App;
