import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,

    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: isLoadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(payload);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
    }
  };

  const uploadFileHandler = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const result = await uploadProductImage(formData).unwrap();
      toast.success("Image Uploaded Successfully");
      setImage(result.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Link to="/admin/products" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isUpdateLoading && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage}
              ></Form.Control>
              <Form.Control
                type="file"
                label="Choose File"
                onChange={uploadFileHandler}
              ></Form.Control>
              {isLoadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
