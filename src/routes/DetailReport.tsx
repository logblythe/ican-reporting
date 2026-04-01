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
import header from "../assets/planit-site_header-2 (6).png";
import { BASE_URL } from "../const";
import { MemberResponseType, NetworkStatus } from "../type";

const CompanyMembersTable = lazy(
  () => import("../components/tables/CompanyMembers"),
);
const CorporateMembersTable = lazy(
  () => import("../components/tables/CorporateMembers"),
);
const IndividualMembersTable = lazy(
  () => import("../components/tables/IndividualMembers"),
);

export const DetailReport = () => {
  const queryParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );

  const company = queryParams.get("company") ?? "";
  const cid = queryParams.get("cid") ?? "";
  const year = queryParams.get("year") ?? "";

  const [isDownloading, setIsDownloading] = useState(false);
  const [response, setResponse] = useState<MemberResponseType | null>(null);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>("idle");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNetworkStatus("loading");
        const networkResponse = await fetch(
          `${BASE_URL}/report?company=${company}&cid=${cid}&year=${year}`,
          {
            method: "GET",
          },
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
    try {
      setIsDownloading(true);
      const url = `${BASE_URL}/report/exportReport?company=${company}&cid=${cid}&year=${year}`;
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const blob = await res.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const disposition = res.headers.get("Content-Disposition");
      let filename = "report.csv";
      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1].replace(/"/g, "").trim();
      }
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(fileURL);
    } catch (err: any) {
      console.error("Download failed:", err.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Stack spacing={0}>
      <Image alt="ican-logo" src={header} />
      <Divider color="#2E3192" />
      <Title order={2} weight={700} size={28} color="#2E3192" px={"md"}>
        ICAN Partner Report
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
        have additional paid for/accounted for seats within your partnership or
        corporate block(s) that the identified registrant has not yet claimed.
        They will be included in this total count upon submission of their
        registration using your custom link.
      </Text>
      <Divider color="#2E3192" />
      <Stack p={"sm"}>
        <Button
          size="md"
          onClick={handleExtract}
          variant="outline"
          loading={isDownloading}
          style={{ alignSelf: "flex-start" }}
        >
          {isDownloading ? "Downloading" : "Download All Attendees"}
        </Button>
        <Flex gap={"md"}>
          <Text color="#3FA9F5" size={"xl"} weight={500}>
            Registrations Under This Partnership
          </Text>
        </Flex>

        <Suspense fallback={null}>
          <CompanyMembersTable
            data={response?.companyMembers}
            isLoading={networkStatus === "loading"}
          />
        </Suspense>
        <Space h={"xl"} />
        <Flex gap={"md"}>
          <Text color="#3FA9F5" size={"xl"} weight={500}>
            Company Registrations Made Outside your Partnership Submission
          </Text>
        </Flex>
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
