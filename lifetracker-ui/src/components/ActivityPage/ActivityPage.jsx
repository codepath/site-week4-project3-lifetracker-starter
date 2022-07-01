import AccessForbidden from "../AccessForbidden/AccessForbidden";
export default function ActivityPage() {
    var userAccess = false;
    function Ac(){
        return <AccessForbidden/>
    }

    return (
        <div className="activity-page">
            <Ac />
        </div>
    )
}