import React from 'react';
import Cookies from "universal-cookie";
import {useState, useEffect} from 'react';

const cookies = new Cookies();
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        getSession();
    }, [])
    
    const getSession = () => {
        fetch("posts/api/session/", {
            credentials: "same-origin",
          })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.isAuthenticated) {
              setAuthenticated(true);
            } else {
              setAuthenticated(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }

    const whoami = () => {
        fetch("posts/api/whoami/", {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("You are logged in as: " + data.username);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    
    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
      }

    const handleUsernameInput = (e) => {
        setUsername(e.target.value);
    }

    const isResponseOk = (response) => {
        if(response.status >= 200 && response.status <= 299) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    }

    const login = (e) => {
        e.preventDefault();
        fetch("posts/api/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": cookies.get("csrftoken"),
          },
          credentials: "same-origin",
          body: JSON.stringify({username, password}),
        })
        .then(isResponseOk)
        .then((data) => {
          console.log(data);
          setAuthenticated(true);
          setUsername('');
          setPassword('');
          setError('');
        })
        .catch((err) => {
          console.log(err);
          setError('Wrong username or password');
        });
      }
    const logout = () => {
        fetch("posts/api/logout", {
          credentials: "same-origin",
        })
        .then(isResponseOk)
        .then((data) => {
          console.log(data);
          setAuthenticated(false);
        })
        .catch((err) => {
          console.log(err);
        });
      };
    const showForm = () => {
        if (!isAuthenticated) {
            return (
                <div className="container mt-3">
                <h1>React Cookie Auth</h1>
                <br />
                <h2>Login</h2>
                <form onSubmit={login}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" name="username" value={username} onChange={handleUsernameInput} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={handlePasswordInput} />
                    <div>
                      {error &&
                        <small className="text-danger">
                          {error}
                        </small>
                      }
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
              </div>
            )
        } else {
            return (
                <div className="container mt-3">
                  <h1>React Cookie Auth</h1>
                  <p>You are logged in!</p>
                  <button className="btn btn-primary mr-2" onClick={whoami}>WhoAmI</button>
                  <button className="btn btn-danger" onClick={logout}>Log out</button>
                </div>
              )
        }
    }
    return (

        <div>
          {showForm()}  
        </div>
    );
}

export default LoginPage;
