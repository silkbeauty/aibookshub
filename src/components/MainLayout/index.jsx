import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewsItem from "../NewsItem/index.jsx";
import contentData from "../../assets/db/mainlayout.json";

import "./MainLayout.scss";
import {handleIsLoading} from "../../store/actions/index.js";


const Spinner = () => {
    return (
        <div className="spinner-layout">
            <div className="spinner-square">
                <div className="square-1 square"></div>
                <div className="square-2 square"></div>
                <div className="square-3 square"></div>
            </div>
        </div>
    );
};

function MainLayout() {
    const dispatch = useDispatch(); // Use dispatch to update the state
    const { isLoading, activeNewsSource } = useSelector((state) => state);
    const newsItems = contentData[activeNewsSource] || []; // Get the content based on active source

    console.log("loading:", isLoading);
    console.log("Content Data:", contentData);
    console.log("Active News Source:", activeNewsSource);
    console.log("News Items:", newsItems); // Log the retrieved news items

    useEffect(() => {
        const fetchData = async () => {
            dispatch(handleIsLoading(true)); // Set loading to true
            try {
                // Simulate a data fetching process (replace with your actual fetch logic)
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                dispatch(handleIsLoading(false)); // Set loading to false after fetching
            }
        };

        // Fetch data only if there is an active news source
        if (activeNewsSource) {
            fetchData();
        }
    }, [activeNewsSource, dispatch]); // Depend on activeNewsSource


    return (
        <div className="main-layout-container">
            {isLoading ? (
                <Spinner />
            ) : newsItems.length > 0 ? (
                <div className="real-container">
                    {newsItems.map((newsData, index) => (
                        <NewsItem key={index} newsData={newsData} />
                    ))}
                </div>
            ) : (
                <div className="empty-container">
                    <span>None Found</span>
                </div>
            )}
        </div>
    );
}


export default MainLayout;