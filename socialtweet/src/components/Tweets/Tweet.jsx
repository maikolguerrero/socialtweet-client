import { HiHandThumbUp, HiBookmark } from "react-icons/hi2";
import { useMutation } from '@apollo/client';
import { AñadirFavorito, EliminarTweet } from "../graphql/mutations";
import { allTweets } from "../graphql/querys";
import { useState } from "react";
import ModalEdicionTweet from "./ModalEdicionTweet";

export default function Tweet({ tweet }) {

    const [editar, setEditar] = useState(false)

    const [ addFavorito ] = useMutation( AñadirFavorito, {
        refetchQueries: [ { query: allTweets } ]
    })
    const [ deleteTweet ] = useMutation( EliminarTweet, {
        refetchQueries: [ { query: allTweets } ]
    })

    return (
        <>
            <article className="w-full h-auto p-4 bg-info mt-4 mb-4 rounded-3">
                <div className="d-flex gap-4 mb-2">
                    <h5 className="m-0 fw-bold">@{tweet.username}</h5>
                    <p className="m-0 ">{tweet.date}</p>
                </div>

                <div className="mb-2 rounded-3 bg-light p-2">
                    <p className="">{tweet.content}</p>
                </div>

                <div className="d-flex">
                    <div className="d-flex gap-3 w-50">
                        <ModalEdicionTweet tweet={tweet.content} id={tweet.id}/>
                        <button type="button" className="btn btn-danger"
                        onClick={
                            () => {
                                deleteTweet({ variables: { deleteTweetId: tweet.id} })
                            }
                        }>Eliminar</button>
                    </div>

                    <div className="d-flex gap-3 w-50 flex-row-reverse align-items-center">
                        <button className="btn p-0"
                        onClick={
                            () => {
                                addFavorito({ variables: { addFavoritoId: tweet.id, like: !tweet.like} })
                            }
                        }>
                            {tweet.like ? <HiBookmark className="fs-1 text-warning"/> : <HiBookmark className="fs-1"/>}
                        </button>
                    </div>
                </div>
            </article>
        </>
    )
}