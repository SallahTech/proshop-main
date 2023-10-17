import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [searchKeyword, setSearchKeyword] = useState(keyword || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      setSearchKeyword(" ");
      navigate(`/search/${searchKeyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
