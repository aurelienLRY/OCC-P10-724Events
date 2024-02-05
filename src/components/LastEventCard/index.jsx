import React, { useEffect, useState } from "react";
import EventCard from "../EventCard";
import { useData } from "../../contexts/DataContext";


const LastEventCard = () => {
    const { data } = useData();
    const { loading } = useData();
    const [last, setLast] = useState(false);
  
    const getLastEvent = () => {
      if (!data.events || data.events.length === 0) {
        // Handle the case where the events array is empty or undefined
        return null;
      }
  
      // Use the sort method to sort the events array by date in descending order
      const sortedEvents = data.events.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      // Return the first event in the sorted array (which will be the event with the latest date)
      return sortedEvents[0];
    };

    useEffect(() => {
      if (data ? setLast(getLastEvent()) : setLast(null));
    }, [data, loading]);


  return (
    loading || !last ? <p>Loading...</p> :
    <EventCard
    imageSrc={last?.cover}
    title={last?.title}
    date={new Date(last?.date)}
    small
    label="boom"
  />
  );
};  

export default LastEventCard;   