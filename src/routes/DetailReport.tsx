import {
  Button,
  Divider,
  Flex,
  Image,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import header from "../assets/ican-header.jpg";
import { MemberResponseType, NetworkStatus } from "../type";

const CompanyMembersTable = lazy(
  () => import("../components/tables/CompanyMembers")
);
const CorporateMembersTable = lazy(
  () => import("../components/tables/CorporateMembers")
);
const IndividualMembersTable = lazy(
  () => import("../components/tables/IndividualMembers")
);

export const DetailReport = () => {
  const queryParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );
  const companyParam = queryParams.get("company") ?? "";
  const cidParam = queryParams.get("cid") ?? "";
  const yearParam = queryParams.get("year") ?? "";

  const [company, setCompany] = useState<string>(companyParam);
  const [cid, setCid] = useState<string>(cidParam);
  const [year, setYear] = useState<string>(yearParam);

  const [response, setResponse] = useState<MemberResponseType | null>(null);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>("idle");

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
      setCompany("fnbo");
      setCid("33897499");
      setYear("2024");
    }
  }, [cidParam, companyParam, queryParams]);

  useEffect(() => {
    if (company.length === 0 || cid.length === 0) {
      return;
    }
    const fetchData = async () => {
      try {
        setNetworkStatus("loading");
        const networkResponse = await fetch(
          `https://ican-2024-88255e5bae19.herokuapp.com/api/v1/report?company=${company}&cid=${cid}&year=${year}`,
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
  }, [cid, company, year]);

  const handleExtract = async () => {
    const url = `https://ican-2024-88255e5bae19.herokuapp.com/api/v1/report/export?company=planit%20inc.&cid=${cidParam}&year=${yearParam}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`);
      }
    } catch (err: any) {
      throw new Error(`Network or fetch error: ${err.message}`);
    }
  };

  return (
    <Stack spacing={0}>
      <Image alt="ican-logo" src={header} />
      <Divider color="#ff1d6c" />
      <Title order={2} weight={700} size={28} color="#ff1d6c" px={"md"}>
        Partner Report
      </Title>
      <Text fw={500} px={"md"} color="#162034">
        Grand Total:{" "}
        {response
          ? response!.companyMemberSize +
            response!.individualMemberSize +
            response!.corporateAttendingMemberSize
          : 0}
      </Text>
      <Text fw={400} px={"md"} color="dimmed" size={"sm"}>
        Note: This is the current number of registrants in the system. You may
        have additional paid for seats accounted for where the identified
        registrant has not yet claimed within your partnership or corporate
        block(s). They will be included in this total count upon submission of
        their registration using your custom link.
      </Text>
      <Divider color="#ff1d6c" />
      <Stack p={"sm"}>
        <Flex gap={"md"}>
          <Text color="#2647ff" size={"xl"} weight={500}>
            Registrations under this partnership
          </Text>
          <Button onClick={handleExtract}>Extract</Button>
        </Flex>

        <Suspense fallback={null}>
          <CompanyMembersTable
            data={response?.companyMembers}
            isLoading={networkStatus === "loading"}
          />
        </Suspense>
        <Space h={"xl"} />
        <Text color="#2647ff" size={"xl"} weight={500}>
          Company Registrations Made Outside your Partnership Submission
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

export default DetailReport;
