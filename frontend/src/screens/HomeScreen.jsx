import React, { useState, useEffect} from 'react'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
// import products from '../products'

const HomeScreen = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/products/')
      setProduct(res.data)
    }
    fetchProducts();
  }, [])

  return (
    <div>
        <h1>Latest Products</h1>
        <Row>
            {product.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product}/>
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default HomeScreen