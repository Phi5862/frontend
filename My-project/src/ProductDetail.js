import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductDetail() {
    const params = useParams();

    const [productName, setProductName] = useState("");
    const [productTypes, setProductTypes] = useState([]);
    const [productTypeId, setProductTypeId] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [validated, setValidated] = useState(false);

    

    useEffect(() => {
        async function fetchData(){
            const response = await fetch(
                "http://localhost:8080/api/product_types",
                {
                    method:"GET",
                    headers: {
                        Accept:'application/json',
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + localStorage.getItem("access_token")
                    }
                }
            );
    
            const json = await response.json();
            setProductTypes(json.data);
        }
        fetchData();
    }, []);
    
    
    const onSave = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false){
            event.stopPropagation();
        }
        else {
            if (params.productId ==="add") {
                doCreateProduct();
            }
            else {
                doUpdateProduct();
            }
        }

        setValidated(true);
    }


    const doCreateProduct = async () => {
        const response = await fetch(
            "http://localhost:8080/api/product/add",
            {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    product_name: productName,
                    product_type_id: productTypeId,
                    price: price,
                    stock: stock
                })
            }
        );
        let json = await response.json();
        if (json.result) {
            window.location ="/home";
        }
    }

    const doUpdateProduct = () => {

    }


    return(
        <>
        product detail ID: {params.productId}
        <>

    <div className='container m-auto'>
        <Form noValidate validated={validated} onSubmit={onSave}>
<Row className="mb-3">
    <Form.Group as={Col} controlId="validateProductName">
        <Form.Label>ชื่อสินค้า</Form.Label>
        <Form.Control
            required
            type="text"
            value={productName}
            placeholder="ชื่อสินค้า"
            onChange={(e) => setProductName(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">กรุณากรอก ชื่อสินค้า</Form.Control.Feedback>
    </Form.Group>
</Row>

<Row className="mb-3">
    <Form.Group as={Col} controlId="validateProductType">
        <Form.Label>ประเภทสินค้า</Form.Label>
        <Form.Select
            value={productTypeId}
            onChange={(e) => setProductTypeId(e.target.value)}
            required
        >

          <option value={0} label="กรุณาเลือกประเภทสินค้า"></option>
          {/* {productTypes && productTypes.map(item => (
            <option key={item.product_type_id} value={item.product_type_id}>
              {item.product_type_name}
            </option>
          ))
          } */}


            <option label="กรุณาเลือกประเภทสินค้า"></option>
            {
                productTypes.map(item => (
                    <option
                        key={item.product_type_id}
                        value={item.product_type_id}>{item.product_type_name}
                    </option>
                ))
            }

        </Form.Select>
        <Form.Control.Feedback type="invalid">กรุณาเลือก ประเภทสินค้า</Form.Control.Feedback>
    </Form.Group>
</Row>


            <Row className="mb-3">
                <Form.Group as={Col} controlId="validateProductName">
                    <Form.Label>ราคาสินค้า</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        value={price}
                        placeholder="ราคาสินค้า"
                        onChange={(e) => setPrice(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">กรุณากรอก ราคาสินค้า</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="validateProductName">
                    <Form.Label>จำนวนสินค้า</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        value={stock}
                        min={0}
                        placeholder="จำนวนสินค้า"
                        onChange={(e) => setStock(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">กรุณากรอก จำนวนสินค้า</Form.Control.Feedback>
                </Form.Group>
            </Row>

            {/* <Row className="mb-3">
                <button variant="primary" as="input" type="submit" value="SAVE"></button>
            </Row> */}

                    <Row className="mb-3">
                        <button variant="primary" as="input" type="submit" value="SAVE">SAVE</button>
                    </Row>
                </Form>
            </div>

       
    </>
        </>
    );

}