import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { CrearTweet } from '../../graphql/mutations';
import { allTweets } from '../../graphql/querys';

export default function FormularioTweet({ setMessageAlert, setShowAlert }) {

  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  function validacion(usuario, tweet) {
    if (usuario.trim().length == 0 || tweet.trim().length == 0) return true
    if (usuario.length > 15 || tweet.length > 280) return true
    return false
  }

  const disabledBtn = validacion(username, content)

  const [addTweet] = useMutation(CrearTweet, {
    refetchQueries: [{ query: allTweets }]
  })

  return (
    <>
      <section className="h-auto p-4 bg-primary m-auto rounded-3 mt-4" >
        <form onSubmit={e => {
          e.preventDefault()

          const tweetContent = content.trim();

          addTweet({ variables: { username: username, content: tweetContent } })
            .then(() => {
              setUsername('');
              setContent('');
              setMessageAlert('Tweet agregado exitosamente.');
              setShowAlert(true);
            })
            .catch(() => {
              setMessageAlert('Error al agregar el tweet.');
              setShowAlert(true);
            });
        }}>
          <Form.Group className="mb-3" controlId="formEditUsername">
            <Form.Control type="text" maxLength={15} placeholder="@username" itemID='username'
              value={username}
              onChange={e => {
                setUsername(e.target.value.trim())
              }} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEditContent">
            <Form.Control as="textarea" maxLength={280} rows={3}
              placeholder='¡¿Qué estás pensando?!'
              itemID='content'
              value={content}
              onChange={e => {
                const content = e.target.value;
                setContent(content);
              }}
            />
          </Form.Group>
          <div className="d-flex flex-row-reverse">
            <button type="submit" className="btn btn-light" disabled={disabledBtn}>Twittear</button>
          </div>
        </form>
      </section>
    </>
  )
}