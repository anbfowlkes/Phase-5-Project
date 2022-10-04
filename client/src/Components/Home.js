import { useState, useEffect } from 'react'
let Home = () => {

    const [user, setUser] = useState({ name: "" });
    const [form, setForm] = useState({});
    let handleLogin = (e) => {
        e.preventDefault();
        console.log(form);
        fetch("http://localhost:2000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                setUser({
                    name: data.user.email,
                });
            });
    };
    let updateForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        let token = localStorage.getItem("jwt");
        if (token && !user.name) {
            fetch("http://localhost:2000/profile", {
                headers: {
                    token: token,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUser({
                        name: data.email,
                    });
                });
        }
    }, []);



    return (
        <div>
            <h3>Login:</h3>
            <form onSubmit={handleLogin}>
                <label>Username:
                <input type='text' />
                </label>
                <label>Password:
                <input type='text' />
                </label>
                <input type='submit' />
            </form>

            <h3>Create Account:</h3>
            <form>
                <label>New Username:
                    <input type='text' />
                </label>
                <label>New Password:
                    <input type='text' />
                </label>
                <input type='submit' />
            </form>
        </div>
    )
}

export default Home