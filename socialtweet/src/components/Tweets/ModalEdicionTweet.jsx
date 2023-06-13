import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';
import { EditarTweet } from '../graphql/mutations';
import { allTweets } from '../graphql/querys';

function MyVerticallyCenteredModal(props) {
    const [tweet, setTweet] = useState(props.tweet);

    const [ editTweet ] = useMutation( EditarTweet, {
        refetchQueries: [ { query: allTweets } ]
    })

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className='bg-info'>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edita el Tweet posteado
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-info'>
                <form onSubmit={e => {
                    e.preventDefault()

                    editTweet({ variables: { editTweetId: props.id, content: tweet} })
                }}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3}
                            placeholder='¿Qué estas pensando?......'
                            itemID='tweet'
                            value={tweet}
                            onChange={e => {
                                setTweet(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <div className="d-flex flex-row-reverse">
                        <button type="submit" className="btn btn-light">Editar Tweet</button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='bg-info'>
                <Button onClick={props.onHide} className='btn btn-danger'>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function ModalEdicionTweet({ tweet, id }) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Editar
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                tweet={tweet}
                id= {id}
            />
        </>
    );
}