import React, { useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom' //
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = () => {
  const [qty , setQty] = useState(1)

  const params = useParams();
  // const navigate = useNavigate();

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch])

  // const addToCartHandler = () => {
  //   navigate(`/cart/${params.id}?qty=${qty}`)
  // }

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading ? 
        <Loader />
        : error
          ? <Message variant='danger'>{error}</Message>  
          : (
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid/>
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item variant='dark'>
                  <h4>{product.name}</h4>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews}`} color={'#f8e825'}/>
                </ListGroup.Item>

                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item variant='dark'>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item variant='dark'>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item variant='dark'>
                        <Row>
                            <Col>Qty:</Col>
                            <Col xs='auto' >
                                <Form.Control
                                    as="select"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                >
                                  {
                                    [...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))
                                  }
                                </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item variant='dark'>
                    <Row>
                      <Button
                        // onClick={addToCartHandler}
                        className='btn-block'
                        disabled={product.countInStock == 0}
                        type='button'>
                          Add to Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          )
    }
      
    </div>
  )
}

export default ProductScreen