import { useEffect, useState } from "react"

export default function App() {
  const [data, setData] = useState(null)
  async function fetchdata() {
    try {

      const res = await fetch('https://randomuser.me/api/')
      const response = await res.json()
      console.log(response.results[0])
      setData(response.results[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchdata()
  }, [])
  return (
    <div className="text-white text-xl w-[1300px]  ">
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>


      {data && <Card data={data} />}

    </div>
  )
}



function Card({ data }) {
  return (
    <>
      <div className="text-white">
        <h1> {data.name.first} </h1>
        <img src={data.picture.large} width={200} height={200} />
      </div>
    </>
  )
}
