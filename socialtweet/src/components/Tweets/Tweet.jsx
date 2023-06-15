import { AiOutlineHeart, AiFillHeart, AiFillDelete } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { AñadirFavorito, EliminarTweet } from "../../graphql/mutations";
import { allTweets, tweetFavoritos } from "../../graphql/querys";
import { useState } from "react";
import ModalEdicionTweet from "./ModalEdicionTweet";
import Button from 'react-bootstrap/Button';
import ConfirmationModal from "../alertas/ConfirmationModal";

export default function Tweet({ tweet, setMessageAlert, setShowAlert }) {

  const [showModal, setShowModal] = useState(false);

  const [addFavorito] = useMutation(AñadirFavorito, {
    refetchQueries: [
      { query: allTweets },
      { query: tweetFavoritos }
    ]
  })
  const [deleteTweet] = useMutation(EliminarTweet, {
    refetchQueries: [{ query: allTweets }]
  })

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    deleteTweet({ variables: { id: tweet.id } })
      .then(() => {
        setMessageAlert("Tweet eliminado exitosamente.");
      })
      .catch(() => {
        setMessageAlert("Error al eliminar el Tweet.");
      });
    setShowAlert(true);
  };

  const editComplete = (completed) => {
    setMessageAlert(completed ? "Tweet editado exitosamente." : "Error al editar el tweet.");
    setShowAlert(true);
  };

  const timestampStr = tweet.date;
  const timestamp = parseInt(timestampStr, 10);
  const tweetDate = new Date(timestamp);

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const formattedDate = tweetDate.toLocaleString(undefined, options);

  return (
    <>
      <article className="h-auto p-4 bg-info rounded-3 m-auto">
        <div className="d-flex gap-4 mb-2">
          <h5 className="m-0 fw-bold">@{tweet.username}</h5>
          <p className="m-0 ">{formattedDate}</p>
        </div>

        <div className="mb-2 rounded-3 bg-light p-2">
          <p className="">{tweet.content}</p>
        </div>

        <div className="d-flex mt-3">
          <div className="d-flex text-center alig-items-center gap-3 w-50">

            <ModalEdicionTweet content={tweet.content} id={tweet.id} editComplete={editComplete} />
            <Button type="button" className="btn btn-danger d-flex text-center align-middle justify-content-center align-items-center"
              onClick={
                () => {
                  setShowModal(true);
                }
              }><AiFillDelete /></Button>
          </div>

          <div className="d-flex gap-3 w-50 flex-row-reverse align-items-center">
            <button className="btn p-0"
              onClick={
                () => {
                  addFavorito({ variables: { id: tweet.id } })
                    .catch((error) => {
                      setMessageAlert('Error al realizar la acción.');
                      setShowAlert(true);
                    });
                }
              }>
              {tweet.like ? <AiFillHeart className="fs-1 text-danger" />
                : <AiOutlineHeart className="fs-1" />}
            </button>
          </div>
        </div>
      </article>

      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />
    </>
  )
}