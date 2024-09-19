import { Link } from "react-router-dom";
import './Home.css';
export default function ProductItem(props) {
    return (
        <div className="product-item" style={{ width: "350px", height: "350px", margin: "1rem", boxShadow: "10px 10px 42px -14px rgba(0,0,0,0.75)" , borderRadius: "30px" , position:"relative" , backgroundColor: "#fffff"}}>
            <div className="image-container" style={{ textAlign: "center" , mผargin: "1rem 0"}}>
                <img src={`http://localhost:8080/images/${props.data.image_url}`} width={170} height={150} style={{borderRadius:"30px" , boxShadow: "10px 10px 42px -14px rgba(0,0,0,0.75)"}} alt={props.data.product_name} />
                
            </div>
            <div className="content-container" style={{margin: "1rem"}}>
                <h5 className="text-primary">{props.data.product_name}</h5>
            </div>
            <div className="button-container" style={{margin: "1rem"}}>
                <Link to={`/product/${props.data.product_id}`} className="btn btn-outline-primary me-3">แก้ไข</Link>
                <button type="button" className="btn btn-outline-danger">ลบ</button>
            </div>
            <p className="" style={{position:"absolute" , buttom: "0" , right: "30px", fontSize: "30px" ,color:"red"}}>{props.data.price} บาท</p>
        </div>
        
    );
}
