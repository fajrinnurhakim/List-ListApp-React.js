import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "flowbite-react";

function Home() {
    const [mobileAppsData, setMobileAppsData] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(true);
    
    useEffect(() => {
        if (fetchStatus === true) {
            axios
                .get("https://backendexample.sanbercloud.com/api/mobile-apps")
                .then((res) => {
                    const modifiedData = res.data.map((app) => {
                        if (app.price === 0) {
                            app.price = "FREE";
                        }
                        app.size =
                            app.size % 1000 === 0
                                ? `${app.size / 1000} GB`
                                : `${app.size} MB`;
                        return app;
                    });
                    setMobileAppsData(modifiedData);
                })
                .catch((error) => {
                    console.log("error", error);
                });
            setFetchStatus(false);
        }
    }, [fetchStatus, setFetchStatus]);

    return (
        <>
            <section className="bg-gray-200 p-5">
                <div className="container mx-auto mt-10">
                    <h1 className="text-xl font-bold ">
                        Find your data that you need!
                    </h1>
                </div>

                <div className="container mx-auto flex-wrap flex gap-10 items-center justify-start">
                    {mobileAppsData !== null &&
                        mobileAppsData.map((res) => {
                            return (
                                <div
                                    key={res.id}
                                    className="mt-10 h-72 flex max-w-xl bg-white shadow-lg rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={res.image_url}
                                        className="w-1/3 bg-cover bg-center bg-landscape"
                                    />
                                    <div className="w-2/3 p-4">
                                        <h1 className="text-gray-900 font-bold text-2xl">
                                            {res.name}
                                        </h1>
                                        <small>{res.release_year}</small>
                                        <p className="mt-2 text-gray-600 text-sm">
                                            {res.description}
                                        </p>
                                        <div className="item-center mt-2 text-gray-500">
                                            <span>{res.category}</span>
                                            <span>, {res.size}</span>
                                            {res.is_android_app ? (
                                                <span>, Android</span>
                                            ) : null}
                                            {res.is_ios_app ? (
                                                <span>, iOS</span>
                                            ) : null}
                                        </div>
                                        <div className="flex item-center justify-between mt-3">
                                            <h1 className="text-gray-700 font-bold text-xl">
                                                Rp {res.price}
                                            </h1>
                                            <Button color="dark">
                                                {res.rating} Ratings
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </section>
        </>
    );
}

export default Home;
