import React, { useState, useEffect } from "react";
import "./App.css"; // CSS for styling
import storiesData from "../stories.json"; // External file containing story URLs

const App = () => {
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStories(storiesData); // Load stories from external file
  }, []);

  useEffect(() => {
    let timer;
    if (currentStoryIndex !== null) {
      timer = setTimeout(() => {
        goNextStory();
      }, 5000); // Auto-advance every 5 seconds
    }
    return () => clearTimeout(timer);
  }, [currentStoryIndex]);

  const startStory = (index) => {
    setLoading(true);
    setCurrentStoryIndex(index);
    setTimeout(() => setLoading(false), 500); // Simulate loading time
  };

  const goNextStory = () => {
    if (currentStoryIndex !== null && currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      setCurrentStoryIndex(null); // Exit stories after last one
    }
  };

  const goPrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      setCurrentStoryIndex(null);
    }
  };

  return (
    <div className="story-container">
      <header className="header">
        <h1 className="instagram-heading">Instagram </h1>
      </header>{" "}
      {currentStoryIndex === null ? (
        <div className="story-list">
          {stories.map(
            (story, index) =>
              story?.thumbnail && ( // Check if image URL exists
                <div className="thumbnailWrapper">
                  <img
                    key={index}
                    src={story.thumbnail}
                    alt={`Story ${index}`}
                    className="story-thumbnail"
                    onClick={() => startStory(index)}
                  />
                </div>
              )
          )}
        </div>
      ) : (
        <div
          className="story-viewer"
          onClick={(e) => {
            const clickX = e.clientX;
            if (clickX < window.innerWidth / 2) {
              goPrevStory();
            } else {
              goNextStory();
            }
          }}
        >
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              {stories[currentStoryIndex]?.image && (
                <img
                  src={stories[currentStoryIndex].image}
                  alt="Story"
                  className="story-image"
                />
              )}
              {stories[currentStoryIndex]?.video && (
                <video
                  src={stories[currentStoryIndex].video}
                  autoPlay
                  loop
                  className="story-video"
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
