import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
const App = () => {

  return (
    <div className="text-white text-4xl ">

      <BrowserRouter>
        <Link to='/Home'>Home</Link>
        <br />
        <Link to='/blogs'>blogs</Link>
        <br />
        <Link to='/profile'>profile</Link>
        <br />
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/profile' element={<Profile />} />
          Hi there
        </Routes>
      </BrowserRouter>
    </div>
  );
};

console.log(App)
export default App;


function Home() {
  return (
    <div>This is home page
    </div>
  )
}



function Blogs() {
  return (
    <div>This is blogs page
    </div>
  )
}

function Profile() {
  return (
    <div>This is Profile page
    </div>
  )
}

