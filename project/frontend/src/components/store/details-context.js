import { createContext, useState } from "react";

const DetailsContext = createContext({
  details: [],
  totalDetails: 0,
  addDetails: (details) => {},
  removeDetails: () => {},
});

export function DetailsContextProvider(props) {
  const [userDetails, setUserDetails] = useState([]);

  function addDetailsHandler(detailsProfile) {
    setUserDetails((prevUserDetails) => {
      return prevUserDetails.concat(detailsProfile);
    });
  }

  function removeDetailsHandler() {
    setUserDetails([]);
  }

  const context = {
    details: userDetails,
    totalDetails: userDetails.length?true:false,
    addDetails: addDetailsHandler,
    removeDetails: removeDetailsHandler,
  };

  return (
    <DetailsContext.Provider value={context}>
      {props.children}
    </DetailsContext.Provider>
  );
}

export default DetailsContext;
