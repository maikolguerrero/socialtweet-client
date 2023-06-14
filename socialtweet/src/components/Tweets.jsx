import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import FormularioTweet from "./Tweets/FormularioTweet";
import Tweet from "./Tweets/Tweet";
import { allTweets } from "../graphql/querys";
import { Container, Row, Col } from 'react-bootstrap';
import CustomAlert from "./alertas/CustomAlert";

export default function Tweets() {

  const { data, loading, error } = useQuery(allTweets);
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');

  const handleDismiss = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Container className="py-4" id="inicio">
        <Container className="mb-5">
          <Row>
            <Col>
              <FormularioTweet setMessageAlert={setMessageAlert} setShowAlert={setShowAlert} />
            </Col>
          </Row>
        </Container>
        <Container className="mb-4">
          {loading ? (
            <h2 className="text-center">Cargando todos los tweets...</h2>
          ) : (
            <>
              {error ? (<h2 className="text-center">Error al conectar con el servidor</h2>)
                : (
                  <>
                    {data.allTweets.length === 0 ? (
                      <h2 className="text-center">No hay ningún Tweet...</h2>
                    ) : (
                      <h2 className="text-center mb-4">Tweet Realizados</h2>
                    )}
                    <Row xs={1} md={1} lg={1} xl={1} className="g-4">
                      {data.allTweets.map((tweet) => (
                        <Col key={tweet.id}>
                          <Tweet tweet={tweet} setMessageAlert={setMessageAlert} setShowAlert={setShowAlert} />
                        </Col>
                      ))}
                    </Row></>)}
            </>
          )}
        </Container>
      </Container>

      <CustomAlert
        message={messageAlert}
        show={showAlert}
        duration={3000}
        onDismiss={handleDismiss}
      />
    </>
  );
}