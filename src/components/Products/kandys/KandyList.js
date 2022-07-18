import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ProductsList } from "../Product"
import "./Kandys.css"

export const KandyList = ({ searchTermState }) => {
    const [kandys, setKandys] = useState([])
    const [filteredKandy, setFiltered] = useState([])
    const navigate = useNavigate()

    // const localKandyUser = localStorage.getItem("kandy_user")
    // const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            console.log(searchTermState)
            const searchedKandys = kandys.filter(kandy => kandy.name.startsWith(searchTermState))
            setFiltered(searchedKandys)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(response => response.json())
                .then((kandyArray) => {
                    setKandys(kandyArray)
                })

        },
        [ProductsList] // When this array is empty, you are observing initial component state
    )

    return <>
        <h2>Kandy Finder</h2>

        <article className="kandys">
            {
                filteredKandy.map(
                    (kandy) => {
                        return <section className="kandy" key={`kandy--${kandy.id}`} >
                            <div className="search">
                                <header><b>{kandy.name}</b></header>
                                <div><b>{kandy.price}</b></div>
                                <li>
                                    <Link className="navbar__link" to="/locations">
                                        Show Me Where</Link>
                                </li>
                            </div>
                        </section>
                    }
                )
            }
        </article>
    </>
}