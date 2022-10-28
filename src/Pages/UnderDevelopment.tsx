import SiteUnderConstruction from "../images/Site_under_construction.svg";

export default function UnderDevelopment() {
    return (
        <div style={{width: "92vw",height: "88vh"}}>
            <img src={SiteUnderConstruction} alt="I" style={{
                position: "relative", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50vw", height: "50vh"
            }} />
        </div>
    )
}