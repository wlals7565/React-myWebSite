import Hero from "../../components_v2/presentaions/home/Hero";
import Features from "../../components_v2/presentaions/home/Features";
import { useContext, useEffect } from "react";
import LayoutContext from "../../contexts/layout/LayoutContext";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;


const HomePage = () => {
  const { setLayout } = useContext(LayoutContext);

  useEffect(() => {
    setLayout("wide");
    return () => setLayout("center");
  }, []);

  return (
    <>
      <Hero />
      <Container as="main">
        <Features />
      </Container>
    </>
  );
};

export default HomePage;

/*
<Container as="main">
        <Features />
        <LatestPosts />
      </Container>
      <CallToAction />
*/
