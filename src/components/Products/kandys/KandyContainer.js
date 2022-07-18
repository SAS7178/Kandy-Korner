import { useState } from "react"
import { KandyList } from "./KandyList"
import { KandySearch } from "./KandySearch"

export const KandyContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <KandySearch setterFunction={setSearchTerms}/>
        <KandyList searchTermState={searchTerms} />
    </>
}