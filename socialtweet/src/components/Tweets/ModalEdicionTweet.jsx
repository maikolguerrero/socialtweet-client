import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';
import { EditarTweet } from '../../graphql/mutations';
import { allTweets, tweetFavoritos } from '../../graphql/querys';
import { FaEdit } from "react-icons/fa";

function MyVerticallyCenteredModal(props) {
  const [content, setContent] = useState(props.content);

  const [editTweet] = useMutation(EditarTweet, {
    refetchQueries: [
      { query: allTweets },
      { query: tweetFavoritos }
    ]
  })

  function validacion(content) {
    if (!content) return true;
    if (content.trim().length == 0) return true
    if (content.length > 280) return true

    return false
  }

  const disabledBtn = validacion(content);

  const handleEditComplete = () => {
    const tweetContent = content.trim();
    editTweet({ variables: { id: props.id, content: tweetContent } })
      .then(() => {
        props.editComplete(true);
        setContent(tweetContent);
      })
      .catch((error) => {
        console.log('Error al editar el tweet:', error);
        props.editComplete(false);
      });
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      content={props.content}
      id={props.id}
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
          handleEditComplete();
        }}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3}
              placeholder='¡¿Qué estás pensando?!'
              itemID='content'
              value={content}
              onChange={e => {
                setContent(e.target.value)
              }}
            />
          </Form.Group>
          <div className="d-flex flex-row-reverse">
            <button type="submit" className="btn btn-light" onClick={props.onHide} disabled={disabledBtn} >Editar Tweet</button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='bg-info'>
        <Button onClick={props.onHide} className='btn btn-danger'>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function ModalEdicionTweet({ content, id, editComplete }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)} className='d-flex text-center justify-content-center align-items-center'>
        <FaEdit className="align-middle" />
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        content={content}
        id={id}
        editComplete={editComplete}
      />
    </>
  );
}
