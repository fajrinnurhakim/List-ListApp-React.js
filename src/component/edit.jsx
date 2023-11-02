"use-client";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import Swal from "sweetalert2";
import axios from "axios";

const EditData = ({ data, onUpdate, onCancel }) => {
    const [editedData, setEditedData] = useState(data);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({
            ...editedData,
            [name]: value,
        });
    };

    const getData = (id) => {
        axios
            .get(`https://backendexample.sanbercloud.com/api/mobile-apps/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
                throw new Error("Network response was not ok");
            })
            .then((data) => {
                setEditedData(data);
            })
            .catch((error) => {
                console.log("error:", error);
            });
    };

    const updateData = () => {
        axios
            .put(
                `https://backendexample.sanbercloud.com/api/mobile-apps/${data.id}`,
                editedData
            )
            .then((response) => {
                if (response.status === 200) {
                    onUpdate(editedData);
                    Swal.fire({
                        icon: "success",
                        title: "Success...",
                        text: "Data Updated Successfully!",
                    });
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .catch((error) => {
                console.log("error:", error);
            });
    };

    useEffect(() => {
        getData(data.id);
    }, [data.id]);

    return (
        <div className="w-full p-4 mx-auto mt-10 dark:bg-white dark:text-black">
            <h2 className="text-xl font-semibold mb-4">Edit Data</h2>
            <form className="bg-white dark:bg-gray-700 p-4 shadow-md rounded-lg">
                <div className="mb-4">
                    <Label htmlFor="name" className="block text-sm font-medium">
                        Nama
                    </Label>
                    <TextInput
                        type="text"
                        id="name"
                        name="name"
                        value={editedData.name}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <Label
                        htmlFor="description"
                        className="block text-sm font-medium"
                    >
                        Description
                    </Label>
                    <Textarea
                        type="text"
                        id="description"
                        name="description"
                        value={editedData.description}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <Label
                        htmlFor="category"
                        className="block text-sm font-medium"
                    >
                        Kategori
                    </Label>
                    <TextInput
                        type="text"
                        id="category"
                        name="category"
                        value={editedData.category}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <Label
                        htmlFor="release_year"
                        className="block text-sm font-medium"
                    >
                        release_year
                    </Label>
                    <TextInput
                        type="number"
                        id="release_year"
                        name="release_year"
                        value={editedData.release_year}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="size" className="block text-sm font-medium">
                        size
                    </Label>
                    <TextInput
                        type="number"
                        id="size"
                        name="size"
                        value={editedData.size}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <Label
                        htmlFor="price"
                        className="block text-sm font-medium"
                    >
                        price
                    </Label>
                    <TextInput
                        type="number"
                        id="price"
                        name="price"
                        value={editedData.price}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <Label
                        htmlFor="is_android_app"
                        className="block text-sm font-medium"
                    >
                        is_android_app
                    </Label>
                    <TextInput
                        type="number"
                        id="is_android_app"
                        name="is_android_app"
                        value={editedData.is_android_app}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <Label
                        htmlFor="is_ios_app"
                        className="block text-sm font-medium"
                    >
                        is_ios_app
                    </Label>
                    <TextInput
                        type="number"
                        id="is_ios_app"
                        name="is_ios_app"
                        value={editedData.is_ios_app}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <Label
                        htmlFor="rating"
                        className="block text-sm font-medium"
                    >
                        rating
                    </Label>
                    <TextInput
                        type="number"
                        id="rating"
                        name="rating"
                        value={editedData.rating}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <Button
                    type="button"
                    onClick={updateData}
                    className="w-full my-2 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700"
                >
                    Simpan Perubahan
                </Button>
                <Button
                    type="button"
                    onClick={onCancel}
                    className="w-full text-gray-600 bg-red-500 hover:bg-gray-300 rounded-md p-2"
                >
                    Batal
                </Button>
            </form>
        </div>
    );
};

EditData.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default EditData;
