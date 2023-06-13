import { useQuery } from "@apollo/client";
import FormularioTweet from "./Tweets/FormularioTweet";
import Tweet from "./Tweets/Tweet";
import { allTweets } from "./graphql/querys";

export default function Tweets() {

  const { data, loading, error } = useQuery(allTweets);

  return (
    <>
      <main className="min-vh-100 h-auto p-5 " >
        <FormularioTweet />
        <section className="w-75 h-auto p-4 m-auto mt-5 mb-5">
          {loading
            ? <h2>Cargando todos los tweets...</h2>
            : (
              <>
                { data.allTweets.length === 0 
                ? <h2>No hay ningún Tweet...</h2>
                : <h2>Tweet Realizados</h2>}
                {data.allTweets.map( tweet => <Tweet tweet={tweet} key={tweet.id}/>)}
              </>
            )
          }
        </section>
      </main>
    </>
  )
}