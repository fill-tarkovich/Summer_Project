import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Categories } from "../Categories/Categories";
import "./SearchResultPage.scss";

const removeTags = (str) => {
  if (!str) {
    return "no description";
  } else {
    str.toString();
  }
  return str.replace(/(<([^>]+)>)/gi, "");
};

const SearchResultPage = () => {
  const searchResult = useLocation().state.response;
  const [events, setEvents] = useState(searchResult.data);
  const [meta, setMeta] = useState(searchResult.meta);

  const changePage = (fetch) => {
    console.log("change page triggered");
    axios.get(fetch).then((res) => {
      setEvents(res.data.data);
      setMeta(res.data.meta);
    });
  };

  if (events.length === 0) {
    return (
      <div>
        <Categories />
        <p>No results</p>
      </div>
    );
  }

  return (
    <div className="eventContainer">
      <Categories />
      {events.map((event, i) => {
        let image;
        try {
          image = event.images[0].url;
        } catch {
          image = "http://source.unsplash.com/afW1hht0NSs";
        }

        const description = event.description
          ? event.description.fi
          : "no description";
        const shortDescription = event.short_description
          ? event.short_description.en || event.short_description.fi
          : "";
        let eventName = event.name
          ? event.name.en || event.name.fi || event.name.sv
          : "No name";

        if (eventName.split(" ").length > 10) {
          eventName = eventName.split(" ").slice(0, 10).join(" ") + "...";
        }
        const start_time = new Date(event.start_time).toLocaleDateString();
        const end_time = new Date(event.end_time).toLocaleDateString();

        const startEndTime =
          start_time === end_time ? start_time : `${start_time} - ${end_time}`;

        return (
          <div key={i} className="singleEvent">
            <img style={{ height: "10rem" }} src={image} />
            <div>
              <Link to={`/cards/${event?.id}`}>
                <h1>{eventName}</h1>
              </Link>
              <em>{startEndTime}</em>
              <p>{shortDescription}</p>
              <p>{removeTags(description).slice(0, 200)}</p>
            </div>
          </div>
        );
      })}
      <div>
        {meta.previous && (
          <button
            className="prevButton"
            onClick={() => changePage(meta.previous)}
          >
            Prev-page
          </button>
        )}
        {meta.next && (
          <button className="prevButton" onClick={() => changePage(meta.next)}>
            Next-page
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;

// const getEvents = () => {
//   const getTags = searchResult.data.map((tag) => {
//     const fetchCalls = tag.keywords.map((singleEvent) => {
//       const fetchArr = Object.values(singleEvent);
//       return axios.get(fetchArr[0]);
//     });
//     axios.all(fetchCalls).then(
//       axios.spread((...res) => {
//         console.log(res);
//       })
//     );
//   });
// };

// getEvents();
