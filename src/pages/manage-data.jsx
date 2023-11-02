import { Table, Button } from "flowbite-react";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateData from "../component/create";
import EditData from "../component/edit";

function ManageData() {
    const [mobileAppsData, setMobileAppsData] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [editingData, setEditingData] = useState(null);

    useEffect(() => {
        if (fetchStatus === true) {
            axios
                .get("https://backendexample.sanbercloud.com/api/mobile-apps")
                .then((res) => {
                    setMobileAppsData([...res.data]);
                })
                .catch((error) => {
                    console.log("error", error);
                });
            setFetchStatus(false);
        }
    }, [fetchStatus, setFetchStatus]);

    const handleDelete = (ID_MOBILE_APPS) => {
        axios
            .delete(
                `https://backendexample.sanbercloud.com/api/mobile-apps/${ID_MOBILE_APPS}`
            )
            .then(() => {
                setFetchStatus(true);
            })
            .catch((error) => {
                console.log("Error deleting mobile app:", error);
            });
    };

    const handleEdit = (data) => {
        setEditingData(data);
    };

    const handleUpdate = (updatedData) => {
        axios
            .put(
                `https://backendexample.sanbercloud.com/api/mobile-apps/${updatedData.id}`,
                updatedData
            )
            .then(() => {
                setFetchStatus(true);
                setEditingData(null);
            })
            .catch((error) => {
                console.log("Error updating mobile app:", error);
            });
    };

    return (
        <>
            <div className="w-full mx-auto p-4 rounded-lg">
                <Table>
                    <Table.Head>
                        <Table.HeadCell className="text-white">
                            No
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white">
                            Nama
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white">
                            Kategori
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white">
                            Description
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white">
                            Price
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white">
                            Rating
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white">
                            Release Year
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white">
                            Size
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white">
                            Is Android App
                        </Table.HeadCell>
                        <Table.HeadCell className="text-white">
                            Is IOS App
                        </Table.HeadCell>
                        <Table.HeadCell className=" text-white">
                            Action
                        </Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y">
                        {mobileAppsData !== null &&
                            mobileAppsData.map((res, index) => {
                                return (
                                    <>
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>{res.name}</Table.Cell>
                                            <Table.Cell>
                                                {res.category}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {res.description}
                                            </Table.Cell>
                                            <Table.Cell>{res.price}</Table.Cell>
                                            <Table.Cell>
                                                {res.rating}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {res.release_year}
                                            </Table.Cell>
                                            <Table.Cell>{res.size}</Table.Cell>
                                            <Table.Cell>
                                                {res.is_android_app}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {res.is_ios_app}
                                            </Table.Cell>
                                            <Table.Cell className="flex space-x-2">
                                                <Button
                                                    onClick={() =>
                                                        handleEdit(res)
                                                    }
                                                    size="sm"
                                                    color="primary"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleDelete(res.id)
                                                    }
                                                    size="sm"
                                                    color="failure"
                                                >
                                                    Delete
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    </>
                                );
                            })}
                    </Table.Body>
                </Table>
            </div>

            {editingData && (
                <EditData
                    data={editingData}
                    onUpdate={handleUpdate}
                    onCancel={() => setEditingData(null)}
                />
            )}
            
            <CreateData />
        </>
    );
}

export default ManageData;
