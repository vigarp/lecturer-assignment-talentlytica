import { useState } from "react";
import {
  Button,
  Center,
  Stack,
  NativeSelect,
  Group,
  Avatar,
  Flex,
  Table,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function IndexPage() {
  const mahasiswa = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Mahasiswa ${i + 1}`,
  }));

  const [data, setData] = useState<any>({
    aspek_penilaian_1: mahasiswa.reduce((acc: any, cur: any) => {
      acc["mahasiswa_" + cur.id] = 1;
      return acc;
    }, {}),
    aspek_penilaian_2: mahasiswa.reduce((acc: any, cur: any) => {
      acc["mahasiswa_" + cur.id] = 1;
      return acc;
    }, {}),
    aspek_penilaian_3: mahasiswa.reduce((acc: any, cur: any) => {
      acc["mahasiswa_" + cur.id] = 1;
      return acc;
    }, {}),
    aspek_penilaian_4: mahasiswa.reduce((acc: any, cur: any) => {
      acc["mahasiswa_" + cur.id] = 1;
      return acc;
    }, {}),
  });

  const handleControlValue = (
    aspect: string,
    mahasiswa: string,
    value: string
  ) => {
    let newData = {
      [aspect]: {
        [mahasiswa]: Number(value),
      },
    };

    setData({
      ...data,
      [Object.keys(newData)[0]]: {
        ...data[Object.keys(newData)[0]],
        ...newData[Object.keys(newData)[0]],
      },
    });
  };

  const handleSave = () => {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `aspect-mahasiswa-${new Date().toLocaleString()}.json`;
    document.body.appendChild(link);
    link.click();
    notifications.show({
      title: "Sukses",
      message: `File berhasil di download: ${link.download}`,
    });
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log("DATA OBJECT: ", data);
    console.log("DATA JSON: ", jsonData);
  };

  const rows = mahasiswa.map((element) => (
    <tr key={element.id}>
      <td>
        <Group>
          <Avatar radius="xl" />
          {element.name}
        </Group>
      </td>
      <td>
        <NativeSelect
          id="aspek_penilaian_1"
          name={`aspek_penilaian_1_mhs_${element.id}`}
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          onChange={(e) =>
            handleControlValue(
              e.target.id,
              `mahasiswa_${element.id}`,
              e.target.value
            )
          }
        />
      </td>
      <td>
        <NativeSelect
          id="aspek_penilaian_2"
          name={`aspek_penilaian_2_mhs_${element.id}`}
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          onChange={(e) =>
            handleControlValue(
              e.target.id,
              `mahasiswa_${element.id}`,
              e.target.value
            )
          }
        />
      </td>
      <td>
        <NativeSelect
          id="aspek_penilaian_3"
          name={`aspek_penilaian_3_mhs_${element.id}`}
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          onChange={(e) =>
            handleControlValue(
              e.target.id,
              `mahasiswa_${element.id}`,
              e.target.value
            )
          }
        />
      </td>
      <td>
        <NativeSelect
          id="aspek_penilaian_4"
          name={`aspek_penilaian_4_mhs_${element.id}`}
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          onChange={(e) =>
            handleControlValue(
              e.target.id,
              `mahasiswa_${element.id}`,
              e.target.value
            )
          }
        />
      </td>
    </tr>
  ));

  return (
    <Stack px="xl" my="lg">
      <Center my="lg">
        <Text size="xl" fw="normal">
          Aplikasi Penilaian Mahasiswa
        </Text>
      </Center>
      <Table>
        <thead>
          <tr>
            <th>Mahasiswa</th>
            <th>Aspek penilaian 1</th>
            <th>Aspek penilaian 2</th>
            <th>Aspek penilaian 3</th>
            <th>Aspek penilaian 4</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Flex justify="flex-end">
        <Button onClick={handleSave} color="dark">
          Simpan
        </Button>
      </Flex>
    </Stack>
  );
}
