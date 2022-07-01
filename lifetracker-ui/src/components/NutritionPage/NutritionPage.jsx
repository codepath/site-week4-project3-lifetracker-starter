import AccessForbidden from "../AccessForbidden/AccessForbidden";
export default function NutritionPage() {
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