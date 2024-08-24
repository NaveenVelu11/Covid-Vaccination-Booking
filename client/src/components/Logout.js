import swal from 'sweetalert';
function Logout() {
    localStorage.clear();
    swal({
        title: "Logout Successfully!",
        icon: "success",
        button: "Login"
    })
        .then(function () { window.location = "/login" });
        return(null)
}
export default Logout