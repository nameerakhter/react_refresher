import { useEffect, useState } from "react"

export default function App() {
  const [data, setData] = useState([])
  const [count, setCount] = useState(1)
  function loadMoreUsers() {
    setCount((prevCount) => prevCount + 1)
  }


  async function fetchdata(count) {
    try {
      const res = await fetch(`https://randomuser.me/api?=page=${count}`)
      const response = await res.json()
      console.log(response.results[0])
      setData((prevData) => [...prevData, response.results[0]])
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

      {data.map((user, index) => (
        <Card key={index} data={user} />
      ))}
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

function useFetch(url, loading) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState()

  async function getData() {
    try {
      setLoading(true)
      const res = await fetch(url)
      const response = await res.json()
      setData(response)
      setLoading(false)

    } catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    getData()
  }, [url])

  return { data, loading }
}

function usePrev() {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}

function usePrev(target, value) {
  const ref = useRef({ target, value })

  if (ref.current.target !== value) {
    ref.current.previous = target
    ref.current.target = target
  }

  return ref.current.value

}

function useDebounce() {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, 1000);

    return () => {
      clearTimeout(handler)
    }
  }, [value])
}
