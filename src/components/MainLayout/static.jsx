import { useSelector } from "react-redux"; // Still import if you're using it elsewhere
import NewsItem from "../NewsItem/index.jsx";
import contentData from "../../assets/db/mainlayout.json";
import "./MainLayout.scss";

function MainLayout() {
    const activeNewsSource = "IT"; // For testing

    // Fetch relevant news items based on activeNewsSource
    const newsItems = contentData[activeNewsSource] || []; // Default to an empty array if no items are found

    console.log("Content Data:", contentData);
    console.log("Active News Source:", activeNewsSource);
    console.log("News Items:", newsItems); // Log the retrieved news items

    return (
        <div className="main-layout-container">
            {newsItems.length > 0 ? (
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
