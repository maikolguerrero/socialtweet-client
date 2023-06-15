import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Tweet from '../components/Tweets/Tweet';

//IMplementamos la consulta graphql
const SEARCH_TWEETS = gql`
    query SearchTweets($searchTerm: String!) {
    searchTweets(searchTerm: $searchTerm) {
        id
        username
        content
        date
        like
    }
    }
`;

// Definimos un componente de React llamado SearchBar que permite al usuario buscar tweets utilizando una consulta GraphQL y maneja el estado y los errores de la búsqueda.
export default function SearchBar({ favoritos, setSearching }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTweets, { data, error }] = useLazyQuery(SEARCH_TWEETS);

    if (error) {
        console.log(error);
    } 

    const [searched, setSearched] = useState(false);

    const handleSearch = () => {
        searchTweets({ variables: { searchTerm } });
        setSearched(true);
        setSearching(true);
    };

    const handleReset = () => {
        setSearchTerm('');
        setSearched(false);
        setSearching(false);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <Container className="my-3 mb-5">
        <Form>
            <Row className="align-items-center">
            <Col xs={8} sm={10}>
            {/* Campo de entrada para el término de búsqueda */}
            <Form.Control
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                onKeyDown={handleKeyDown}
                />
                </Col>
            <Col xs={4} sm={1}>
                {/* Botón para ejecutar la búsqueda */}
                <Button variant="primary" className="w-100" onClick={handleSearch}>
                    Buscar
                </Button>
            </Col>
            <Col xs={4} sm={1}>
                {/* Botón para restablecer la búsqueda */}
                <Button variant="warning" className="w-100" onClick={handleReset}>
                    Regresar
                </Button>
            </Col>
            </Row>
        </Form>
        {/* Mostramos un mensaje si no se encontraron resultados */}
        {searched && data && data.searchTweets && data.searchTweets.filter(tweet => tweet.username.includes(searchTerm) || tweet.content.includes(searchTerm)).length === 0 ? (
            <h2 className="text-center mt-4" style={{ fontSize: '18px' }}>No se encontraron resultados para la búsqueda "{searchTerm}".</h2>
        ) : (
            <>
            {/* Mostramos el título de los resultados de la búsqueda */}
            {searched && <h2 className="text-center mt-4" style={{ fontSize: '18px' }}>Resultados de la búsqueda</h2>}
            <Row xs={1} md={1} lg={1} xl={1} className="g-4">
                {/* Mostramos los tweets resultantes de la búsqueda */}
                {data && data.searchTweets && data.searchTweets.filter(tweet => tweet.username.includes(searchTerm) || tweet.content.includes(searchTerm)).filter(tweet => !favoritos || favoritos.includes(tweet.id)).map((tweet) => (
                    <Col key={tweet.id} style={{ paddingTop: '20px' }}>
                <Tweet tweet={tweet} />
                </Col>
            ))}
            </Row>
        </>
        )}
    </Container>
    );
}
