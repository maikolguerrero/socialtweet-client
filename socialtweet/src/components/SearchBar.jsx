import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Tweet from '../components/Tweets/Tweet';

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

    return (
        <Container className="my-3 mb-5">
        <Form>
            <Row className="align-items-center">
            <Col xs={8} sm={10}>
            <Form.Control
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                />
                </Col>
            <Col xs={4} sm={2}>
                <Button variant="primary" className="w-100" onClick={handleSearch}>
                    Buscar
                </Button>
            </Col>
            </Row>
        </Form>
        {searched && data && data.searchTweets && data.searchTweets.filter(tweet => tweet.username === searchTerm).length === 0 ? (
            <h2 className="text-center mt-4" style={{ fontSize: '18px' }}>No se encontraron resultados para la búsqueda "{searchTerm}".</h2>
        ) : (
            <>
            {searched && <h2 className="text-center mt-4" style={{ fontSize: '18px' }}>Resultados de la búsqueda</h2>}
            <Row xs={1} md={1} lg={1} xl={1} className="g-4">
                {data && data.searchTweets && data.searchTweets.filter(tweet => tweet.username === searchTerm).filter(tweet => !favoritos || favoritos.includes(tweet.id)).map((tweet) => (
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
