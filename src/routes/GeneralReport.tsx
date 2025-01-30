import { Divider, Grid, Progress, Stack, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { EventInfo, NetworkStatus } from "../type";

const GeneralReport = () => {
  const queryParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );
  const yearParam = queryParams.get("year") ?? "";

  const [year, setYear] = useState<string>(yearParam);

  const [response, setResponse] = useState<EventInfo | null>(null);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>("idle");

  useEffect(() => {
    if (!yearParam) {
      queryParams.set("year", "2024");
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${queryParams.toString()}`
      );
      setYear("2024");
    }
  }, [yearParam, queryParams]);

  useEffect(() => {
    if (!year) {
      return;
    }
    const fetchData = async () => {
      try {
        setNetworkStatus("loading");
        const networkResponse = await fetch(
          `https://ican-2024-88255e5bae19.herokuapp.com/api/v1/report/summary?year=${year}`,
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
  }, [year]);

  return (
    <Stack spacing={0} maw={"60%"} pt={0} pl={64}>
      {networkStatus === "loading" && (
        <Progress radius="xs" size="xs" value={100} striped animate />
      )}
      <Stack fz={"sm"}>
        <Text fw={"700"} fz={24}>
          {response?.eventName ?? ""}
        </Text>
        <Divider />
        <Grid>
          <Grid.Col span={6}>
            <Text fw={"500"}>Event Date:</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>{response?.eventDate ?? ""}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fw={"500"}>Total Registration Submissions:</Text>{" "}
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>{response?.totalRegistrationsCount ?? ""}</Text>
          </Grid.Col>
        </Grid>
        <Divider />
        <Stack mb={"lg"}>
          <Text fw={"500"} fz={32}>
            Virtual
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Text fw={"500"}>Individual:</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{response?.virtualData.individual}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text fw={"500"}>Corporate Block Seats: </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{response?.virtualData.corporateBlockSeats}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text fw={"500"}>Partnership Block Seats: </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{response?.virtualData.partnershipBlockSeats}</Text>
            </Grid.Col>
          </Grid>
        </Stack>
        <Stack mb={"lg"}>
          <Text fw={"500"} fz={32}>
            In-Person
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Text fw={"500"}>Individual:</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{response?.inPersonData.individual}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text fw={"500"}>Corporate Block Seats: </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{response?.inPersonData.corporateBlockSeats}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text fw={"500"}>Partnership Block Seats: </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{response?.inPersonData.partnershipBlockSeats}</Text>
            </Grid.Col>
          </Grid>
        </Stack>
        <Stack mb={"lg"}>
          <Grid>
            <Grid.Col span={6}>
              <Text fw={"500"}>Total Number of Blocks Seats Purchased:</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{response?.totalCorporateBlockSeatsPurchased}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text fw={"500"}>Total Individual Registrations Completed: </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{response?.totalIndividualRegistrationsCompleted}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text fw={"500"}>Partnership Registrations Completed: </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{response?.partnershipRegistrationsCompleted}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text fw={"500"}>Partnership Block Seats Purchased: </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{response?.partnershipBlockSeatsPurchased}</Text>
            </Grid.Col>
          </Grid>
        </Stack>
        <Divider />
        <Text underline fw={"500"}>
          Registration Link Status
        </Text>
        <Grid>
          <Grid.Col span={6}>
            <Text fw={"500"}>Unused Registrations with Link: </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>{response?.unusedRegistrationsWithLink}</Text>
          </Grid.Col>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default GeneralReport;
