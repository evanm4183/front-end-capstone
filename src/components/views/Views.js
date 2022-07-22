import { MemberViews } from "./MemberViews"

export const Views = () => {
    
    if (localStorage.getItem("localUser")) {
        return <MemberViews />
    } else {
        //this should never be accessed. Placeholder for when guest view is made
    }
}