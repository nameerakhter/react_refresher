import { useEffect, useState } from "react"

export default function App() {
  const [data, setData] = useState(null)
  const [count, setCount] = useState(0)
  function loadMoreUsers() {
    setCount((prevCount) => prevCount + 1)
  }

  async function fetchdata(count) {
    try {
      const res = await fetch(`https://randomuser.me/api?=page=${count}`)
      const response = await res.json()
      console.log(response.results[0])
      setData(response.results[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchdata(count)

  }, [count])
  return (
    <div className="text-white text-xl w-[1300px]  ">
      <button onClick={loadMoreUsers} className=" bg-white text-black border rounded-xl p-2"> load more data </button>
      {data && <Card data={data} />}

    </div>
  )
}



function Card({ data }) {
  const username = `${data.name.first}  ${data.name.last}`
  return (
    <>
      <div className="text-white">
        <h1> {username} </h1>
        <img src={data.picture.large} width={200} height={200} />
      </div>
    </>
  )
}
