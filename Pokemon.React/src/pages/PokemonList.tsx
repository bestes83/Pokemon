// import { NextPage } from 'next'
import { Link } from 'react-router-dom';
import { Col, Row, Container, PageItem, Pagination } from 'react-bootstrap'
import axios from 'axios';
import { useEffect, useState } from 'react'

import { Config } from '../config'
import Pokemon from '../components/pokemon'
import { PokemonModel } from '../models/pokemonModel'

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<PokemonModel[]>()
  const [activePage, setActivePage] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  useEffect(() => {
    axios.get(Config.PokemonApi + '/pokemon/getlist/0').then((response: any) => {
        setPokemonList(response.data);
        setIsLoaded(true);
      }).catch(err => console.log(err));
  }, []);

  const elements = pokemonList?.map((item, index) => {
    return (
      <Col key={index} lg="2">
        <Link to={"/pokemondetail/" + item.id}>
          <Pokemon pokemon={item}/>
        </Link>
      </Col>
    )
  });

  const pageHandler = (index: number) => {
    setIsLoaded(false);
    setPokemonList([]);
    setActivePage(index);
    axios.get(Config.PokemonApi + '/pokemon/getlist/' + index).then((response: any) => {
      setPokemonList(response.data);
      setIsLoaded(true);
    }).catch(err => console.log(err));
  }

  const pageItems = [];
  for(let i = 0; i < 5; i++)
  {
    let el = <PageItem key={i} onClick={() => pageHandler(i)} active={activePage === i}>{i+1}</PageItem>
    pageItems.push(el);
  }

  return (
    <>
    { !isLoaded && 
      <Container>
        <Row>
          <Col lg="5"></Col>
          <Col>Loading Data......</Col>
          <Col lg="5"></Col>
        </Row>
      </Container>
    }
    { isLoaded && 
      <Container fluid>
          <Row>
            <Col lg="1" xlg="1"></Col>
            <Col>
              <Container fluid>
                <Row>
                  {elements}
                </Row>
              </Container>
            </Col>
            <Col lg="1" xlg="1"></Col>
          </Row>
          <Row>
            <Col lg="5"></Col>
            <Col>
              <Pagination>
                <Pagination.Prev onClick={() => pageHandler(activePage - 1)}></Pagination.Prev>
                {pageItems}
                <Pagination.Next onClick={() => pageHandler(activePage + 1)}></Pagination.Next>
              </Pagination>
            </Col>
            <Col lg="5"></Col>
          </Row>
      </Container> }
    </>
  )
}

export default PokemonList
