import PropTypes from "prop-types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getData = async () => {
      try {
        const newData = await api.loadData();
        setData(newData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (!data) {
      getData();
    }
  }, [data]);


  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
