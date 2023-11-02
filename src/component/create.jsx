"use-client";
import { useState } from "react";
import axios from "axios";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import Swal from "sweetalert2";

function CreateData() {
    const [formData, setFormData] = useState({
        name: "",
        release_year: 2009,
        description: "",
        category: "",
        size: 0,
        is_android_app: 0,
        is_ios_app: 0,
        price: 0,
        rating: 0,
        image_url: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]:
                type === "checkbox"
                    ? checked
                        ? 1
                        : 0
                    : type === "number"
                    ? parseInt(value)
                    : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            formData.name === "" ||
            formData.description === "" ||
            formData.category === "" ||
            formData.release_year < 2009 ||
            formData.release_year > 2023 ||
            formData.size < 0 ||
            formData.price < 0 ||
            formData.price > 5 ||
            formData.rating < 0 ||
            formData.rating > 5 ||
            formData.image_url === "" ||
            (formData.is_android_app !== 1 && formData.is_ios_app !== 1) ||
            (formData.is_android_app !== 0 && formData.is_android_app !== 1) ||
            (formData.is_ios_app !== 0 && formData.is_ios_app !== 1)
        ) {
            console.error("Invalid data. Please check your inputs.");
            return;
        }
        axios
            .post(
                "https://backendexample.sanbercloud.com/api/mobile-apps",
                formData
            )
            .then((res) => {
                console.log("Data created successfully", res.data);
                Swal.fire({
                    icon: "success",
                    title: "Success...",
                    text: "Data Created Successfully!",
                });
                window.location.reload();
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                console.error("Error creating data", error);
            });
    };

    return (
        <div className="w-full p-4 mx-auto mt-10 dark:bg-white dark:text-black">
            <h1 className="text-3xl font-bold mb-4">Create New Data</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-700 p-4 shadow-md rounded-lg"
            >
                <div className="mb-4">
                    <Label htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        placeholder="Enter the name"
                        required
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter the description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        className="resize-none w-full p-2 border rounded"
                        rows="4"
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="category" value="Category" />
                    <TextInput
                        id="category"
                        name="category"
                        placeholder="Enter the category"
                        required
                        type="text"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="release_year" value="Release Year" />
                    <TextInput
                        id="release_year"
                        name="release_year"
                        placeholder="Enter the release year"
                        required
                        type="number"
                        value={formData.release_year}
                        onChange={handleChange}
                        min="2009"
                        max="2023"
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="size" value="Size (MB)" />
                    <TextInput
                        id="size"
                        name="size"
                        placeholder="Enter the size (MB)"
                        required
                        type="number"
                        value={formData.size}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="price" value="Price (Rp)" />
                    <TextInput
                        id="price"
                        name="price"
                        placeholder="Enter the price"
                        required
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="is_android_app">
                        Android App (0 for No, 1 for Yes)
                    </Label>
                    <TextInput
                        id="is_android_app"
                        name="is_android_app"
                        placeholder="Enter 0 or 1"
                        required
                        type="number"
                        value={formData.is_android_app}
                        onChange={handleChange}
                        min="0"
                        max="1"
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="is_ios_app">
                        iOS App (0 for No, 1 for Yes)
                    </Label>
                    <TextInput
                        id="is_ios_app"
                        name="is_ios_app"
                        placeholder="Enter 0 or 1"
                        required
                        type="number"
                        value={formData.is_ios_app}
                        onChange={handleChange}
                        min="0"
                        max="1"
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="rating" value="Rating" />
                    <TextInput
                        id="rating"
                        name="rating"
                        placeholder="Enter the rating"
                        required
                        type="number"
                        value={formData.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="image_url" value="Image URL" />
                    <TextInput
                        id="image_url"
                        name="image_url"
                        placeholder="Enter the image URL"
                        required
                        type="text"
                        value={formData.image_url}
                        onChange={handleChange}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create Data
                </Button>
            </form>
        </div>
    );
}

export default CreateData;
