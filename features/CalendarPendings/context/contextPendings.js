import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getAllPendings, getPendingsTypes } from "../service/pendingsApi";
import { COLOR_EVENTS } from "../config";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";

const PendingsContext = createContext();

export const PendingsProvider = ({ children }) => {
  const [calendarView, setCalendarView] = useState("day");
  const { id_user } = useSelector(userSelector);

  const [date, setDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [pendingType, setPendingType] = useState([]);
  const [newProperty, setNewProperty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    byPerform: true,
    byTypeOfPending: "all",
  });

  // GET ALL ADATA TYPES FROM API
  useEffect(() => {
    const fetchPendingTypes = async () => {
      setIsLoading(true);
      try {
        const pendingTypesResponse = await getPendingsTypes();
        if (!pendingTypesResponse) return;

        const formattedPendingTypes = pendingTypesResponse.map(
          (pendingType) => ({
            resourceId: pendingType.id,
            resourceTitle: pendingType.name,
          })
        );

        setPendingType(formattedPendingTypes);
      } catch (error) {
        console.error("Error fetching pending types:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingTypes();
  }, []);

  // GET ALL PENDINGS FROM API

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      let value = {};

      let params = {
        where: {
          isdone: false,
          date_from: {
            $gte: dayjs().startOf("day").format(),
            $lte: dayjs().endOf("day").format(),
          },
          ejecutiveId: id_user,
        },
      };

      const events = await getAllPendings(params);

      const formattedEvents = events.map((event, i) => {
        const {
          id,
          isdone,
          subject,
          description,
          date_from: dateFrom,
          date_to: dateTo,
          pendingstypeId,
        } = event;

        return {
          resourceId: pendingstypeId,
          id,
          title: subject,
          start: new Date(dateFrom),
          end: dateTo ? new Date(dateTo) : new Date(dateFrom),
          color: COLOR_EVENTS.find(
            (color) => color.resourceId === pendingstypeId
          ),
          isdone,
        };
      });

      // FILTERS PENDINGS
      const filterEvents = formattedEvents
        .filter((event) => {
          return !event.isdone === filters.byPerform;
        })
        .filter((event) => {
          if (filters.byTypeOfPending === "all") return true;
          return event.resourceId === filters.byTypeOfPending;
        });

      setEvents(filterEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // fetchEvents();
  }, [newProperty, filters]);

  const handleOnChangeView = (view) => {
    setCalendarView(view);
  };

  return (
    <PendingsContext.Provider
      value={{
        date,
        setDate,
        events,
        setEvents,
        pendingType,
        newProperty,
        setNewProperty,
        isLoading,
        setIsLoading,
        filters,
        setFilters,
        fetchEvents,
        calendarView,
        handleOnChangeView,
      }}
    >
      {children}
    </PendingsContext.Provider>
  );
};

export const usePendings = () => {
  const context = useContext(PendingsContext);
  return context;
};
