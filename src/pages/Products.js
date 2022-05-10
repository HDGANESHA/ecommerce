import Sidebar from "../component/Sidebar";
import { useNavigate } from "react-router-dom";

function Products() {
    let navigate = useNavigate();
    const inp = {

        fontfamily: 'sans-serif',

        letterSpacing: '3px'
    }
    const move = () => {
        navigate('../../');
    }
    return (<>
        <Sidebar />
        <div className="alfi">
            <div class="headerbox">
                <h1 style={inp}>Welcome Ganesh</h1>
                <button className="clkbtn" onClick={move}>Sign Out</button>

            </div>
        </div>

    </>);
}

export default Products;