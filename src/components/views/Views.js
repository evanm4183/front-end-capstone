import { MemberViews } from "./MemberViews"

export const Views = () => {
    console.log(localStorage.getItem("localUser"))
    if (localStorage.getItem("localUser")) {
        console.log("true")
        return <MemberViews />
    } else {
        //this should never be accessed. Placeholder for when guest view is made
    }
}