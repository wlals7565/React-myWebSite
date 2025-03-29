import { useContext, useEffect, useState } from "react";
import LayoutContext from "../../contexts/layout/LayoutContext";
import styled from "styled-components";
import Accordion from "../../components_v2/presentaions/Accordion/Accordion";

const Select = styled.select`
  position: absolute;
  top: 0;
  left: 0;
`;

const PlayBox = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

const options = ["아코디언"]

const PlayPage = () => {
  const { setLayout } = useContext(LayoutContext);
  const [selected, setSelected] = useState(options[0]);
  console.log(selected)

  useEffect(() => {
    setLayout("wide");
    return () => setLayout("center");
  }, []);
  return (
    <PlayBox>
      <Select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </Select>
      {selected=="아코디언" && <Accordion/>}
    </PlayBox>
  );
};

export default PlayPage;
