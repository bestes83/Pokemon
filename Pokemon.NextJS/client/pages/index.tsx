import { NextPage } from 'next'
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap'
import axios from 'axios';
import { useEffect, useState } from 'react'

import { Config } from '../config'
import Header from '../components/header'
import Pokemon from '../components/pokemon'
import { PokemonModel } from '../models/pokemonModel'

const PokemonList: NextPage = () => {
  const [pokemonList, setPokemonList] = useState<PokemonModel[]>()

  useEffect(() => {
    axios.get(Config.PokemonApi + '/pokemon/getlist/0').then((response: any) => {
        setPokemonList(response.data);
      }).catch(err => console.log(err));
  }, []);

  const elements = pokemonList?.map((item, index) => {
    return (
      <Col key={index}>
        <Link href={"/pokemondetail/" + item.id}>
          <a>
          <Pokemon pokemon={item}/>
          </a>
        </Link>
      </Col>
    )
  })
  return (
    <>
      <Header />
      <div style={{padding: "0 10px", display: "inline"}}>
        <Row>
          {elements}
        </Row>
      </div>
    </>
  )
}

export default PokemonList
