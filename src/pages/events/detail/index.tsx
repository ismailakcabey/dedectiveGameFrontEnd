import { useParams } from "react-router-dom";

const EventDetail = () => {
    const { id } = useParams();
    return(
        <>Event Detail for ID: {id}</>
    )
}
export default EventDetail