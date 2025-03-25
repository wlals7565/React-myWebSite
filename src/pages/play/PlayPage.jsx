import { useContext, useEffect } from "react";
import LayoutContext from "../../contexts/layout/LayoutContext";

const PlayPage = () => {
  const { setLayout } = useContext(LayoutContext);

  useEffect(() => {
    setLayout("wide");
    return () => setLayout("center");
  }, []);
  return <div>PlayPage</div>;
};

export default PlayPage;
