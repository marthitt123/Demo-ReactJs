import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  useRoutes
} from 'react-router-dom';
import './App.css';
const hero_list = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'necromancer' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tomado' },
]
function App() {
  let routes = useRoutes([
    { path: "/", element: <Navigate to="/hero" /> },
    { path: "hero", element: <Hero /> },
    { path: "posts", element: <Posts /> }
    // ...
  ]);
  return routes;
};
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
function Hero() {
  let [hero_select, setHero] = useState("");
  let items = hero_list.map(m => {
    return (<li key={m.name} onClick={() => setHero(hero_select = m.name)}>{m.id} {m.name}</li>)
  })
  return (
    <>
      <h1>My Heros</h1>
      <ul>
        {items}
      </ul>
      <div>
        <label>My hero is {hero_select}</label>
      </div>
    </>);
}

function Posts() {
  const [users, setUsers] = useState([])
  async function fetchData(){
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    res.json()
    .then(data => {
      setUsers(data)
    });
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>User Id</th>
              <th>title</th>
              <th>body</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userId}</td>
                <td>{user.title}</td>
                <td>{user.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div></div>
    </div>
  );
}
export default AppWrapper;
