import { useEffect, useState } from "react"
import "./Locations.css"

export const LocationsList = () => {
    const [locations, setlocations] = useState([])

    useEffect(
        () => {
            if (locations) {
                fetch(`http://localhost:8088/locations`)
                    .then(response => response.json())
                    .then((locations) => {
                        setlocations(locations)
                    })
            }
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
        <h1> Kandy Korner</h1>
        <h2>Store Locations</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location" key={`location--${location.id}`} >
                            <div className="location__item">{location.address}:&nbsp;&nbsp;{location.area}</div>
                        </section>
                    }
                )
            }
        </article>
    </>
}

