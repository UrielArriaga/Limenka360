import { useRouter } from "next/router";
import { version } from "os";
import React from "react";
import styled from "styled-components";

const VERSIONONE = [
  {
    name: "DASHBOARD",
    img: "https://crm-desarrollo.sfo3.digitaloceanspaces.com/limenka360/dashboarv1.jpg",
    route: "/ejecutivo/dashboards/v1",
    version: "v1",
  },
  {
    name: "PROSPECTOS",
    img: "https://crm-desarrollo.sfo3.digitaloceanspaces.com/limenka360/prospectosv1.jpg",
    route: "/ejecutivo/prospectos/v1",
    version: "v1",
  },
  {
    name: "OPORTUNIDADES",
    img: "https://crm-desarrollo.sfo3.digitaloceanspaces.com/limenka360/oportunidadesv1.jpg",
    route: "/ejecutivo/oportunidades/v1",
    version: "v1",
  },
];

const VERSIONTWO = [
  {
    name: "DASHBOARD",
    img: "https://crm-desarrollo.sfo3.digitaloceanspaces.com/limenka360/dashboarv1.jpg",
  },
  {
    name: "PROSPECTOS",
    img: "https://crm-desarrollo.sfo3.digitaloceanspaces.com/limenka360/prospectosv1.jpg",
  },
  {
    name: "OPORTUNIDADES",
    img: "https://crm-desarrollo.sfo3.digitaloceanspaces.com/limenka360/oportunidadesv1.jpg",
  },
];

export default function VersionesDemo() {
  const router = useRouter();
  return (
    <Wrapper>
      <Navbar>
        <img
          src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogolargewhite.png"
          alt="Limenka Logo"
        />
      </Navbar>

      <Content>
        <Header>
          <h1>Ideas para limenka360</h1>
        </Header>

        <h4 className="title">Primera Version</h4>
        <Grid>
          {VERSIONONE.map((demo, i) => (
            <Card
              key={i}
              onClick={() =>
                router.push({
                  pathname: demo.route,
                  query: { version: demo.version },
                })
              }
            >
              <img src={demo.img} alt={demo.name} />
              <h3>{demo.name}</h3>
            </Card>
          ))}
        </Grid>

        <h4 className="title">Segunda Version</h4>
        <Grid>
          {VERSIONONE.map((demo, i) => (
            <Card key={i}>
              <img src={demo.img} alt={demo.name} />
              <h3>{demo.name}</h3>
            </Card>
          ))}
        </Grid>

        <h4 className="title">Segunda Version</h4>
        <Grid>
          {VERSIONONE.map((demo, i) => (
            <Card key={i}>
              <img src={demo.img} alt={demo.name} />
              <h3>{demo.name}</h3>
            </Card>
          ))}
        </Grid>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background: #3494e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ec6ead,
    #3494e6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ec6ead,
    #3494e6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: rgba(247, 244, 244, 0.05);
  /* backdrop-filter: blur(8px); */
  display: flex;
  align-items: center;
  padding: 0 2rem;
  z-index: 10;

  img {
    height: 40px;
  }
`;

const Content = styled.div`
  padding-top: 100px; /* espacio para navbar */
  padding-left: 3rem;
  padding-right: 3rem;

  .title {
    font-size: 2rem;
    color: white;
    margin-bottom: 1rem;
    /* text-align: center; */
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
`;

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 16px;
  text-align: center;
  backdrop-filter: blur(10px);
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
    height: 280px;
  }
  h3 {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: white;
  }
`;
