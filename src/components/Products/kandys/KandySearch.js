
export const KandySearch = ({setterFunction}) => {
    return (
       <div>
           <input
           onChange={
               (changeEvent) => {
                   setterFunction(changeEvent.target.value)
               }
           }
            type="text" className="find__kandy" placeholder="What Kandy are you looking for?" />
       </div>
        
    )
}