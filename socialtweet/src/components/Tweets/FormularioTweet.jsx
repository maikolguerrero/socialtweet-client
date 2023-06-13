import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { CrearTweet } from '../graphql/mutations';
import { allTweets } from '../graphql/querys';


export default function FormularioTweet() {

    const [usuario, setUsuario] = useState();
    const [tweet, setTweet] = useState();

    const [addTweet] = useMutation(CrearTweet, {
        refetchQueries: [{ query: allTweets }]
    })

    return (
        <>
            <section className="w-50 h-auto p-4 bg-primary m-auto rounded-3" >
                <form onSubmit={e => {
                    e.preventDefault()

                    const tiempoTranscurrido = Date.now();
                    const hoy = new Date(tiempoTranscurrido);

                    addTweet({ variables: { username: usuario, content: tweet, like: false, date: hoy.toDateString() } })

                    setUsuario('');
                    setTweet('');
                }}>
                    <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Control type="text" placeholder="@Usuario" itemID='usuario'
                            value={usuario}
                            onChange={e => {
                                setUsuario(e.target.value)
                            }} />
                    </Form.Group>
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
                        <button type="submit" className="btn btn-light">Enviar Tweet</button>
                    </div>
                </form>
            </section>
        </>
    )
}