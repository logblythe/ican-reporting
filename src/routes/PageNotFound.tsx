import { Container, Stack, Text, Title } from "@mantine/core";

const PageNotFound = () => {
  return (
    <Container size="sm" style={{ textAlign: "center", marginTop: "10vh" }}>
      <Stack align="center" spacing="md">
        <Title order={1} size="4rem">
          404
        </Title>

        <Text size="lg" c="dimmed">
          Sorry, the page you are looking for does not exist.
        </Text>
      </Stack>
    </Container>
  );
};

export default PageNotFound;
