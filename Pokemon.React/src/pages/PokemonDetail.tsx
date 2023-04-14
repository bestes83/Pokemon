import { useParams, Link } from 'react-router-dom'
import { Card, Container, Row, Col, Table } from 'react-bootstrap'
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Config } from '../config'
import { PokemonModel } from '../models/pokemonModel';
import Pokemon from '../components/pokemon';

const PokemonDetail = () => {
    //const router = useRouter();
    let defaultPokemon = {
        name: "",
        id:"",
        types:[],
        heightInMeters: 0,
        weightInKg: 0,
        genus:"",
        abilities:[],
        weaknesses:[],
        evolution:{}
    }

    const {id} = useParams();
    const imageUrl = Config.PokemonImageUrl + id?.toString().padStart(3, '00') + ".png"
    const [pokemon, setPokemon] = useState<PokemonModel>(defaultPokemon);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const loadPokemonData = (id:string) => {
        setIsLoaded(false);
        axios.get(Config.PokemonApi + "/Pokemon/GetPokemon/" + id).then((response) => {
            setPokemon(response.data as PokemonModel);
            setIsLoaded(true);
            console.log(response.data.evolution);
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        loadPokemonData(id as string)
    }, [id])

    const typeElements = pokemon?.types.map((item, index) => <span key={index} className="type">{item}</span>);
    const weaknessElements = pokemon?.weaknesses.map((item, index) => <li key={index} className="type">{item}</li>)
    const abilityElements = pokemon?.abilities.map((item, index) => <li key={index}>{item}</li>)
    return (
        <>
        {!isLoaded && 
            <Container>
                <Row>
                    <Col lg="5"></Col>
                    <Col>
                        <div>Loading Data....</div>
                    </Col>
                    <Col lg="5"></Col>
                </Row>
            </Container>}
        {isLoaded && 
        <Container>
            <Row>
                <Card className="pokemon-detail-card">
                    <Container>
                        <Row>
                            <Col>
                                <div className="pokemon-detail-image">
                                    <img src={imageUrl} style={{width:"500px", height:"500px"}}/>
                                </div>
                            </Col>
                            <Col>
                                <Container>
                                    <Row>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <span className="data-label">Type:</span>
                                                    </td>
                                                    <td>
                                                        {typeElements}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="data-label">Species:</span>
                                                    </td>
                                                    <td>
                                                        <span className="data-value">{pokemon?.genus}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="data-label">Weight:</span>
                                                    </td>
                                                    <td>
                                                        <span className="data-value">{pokemon?.weightInKg}&nbsp;kg</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="data-label">Height:</span>
                                                    </td>
                                                    <td>
                                                        <span className="data-value">{pokemon?.heightInMeters}&nbsp;m</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="data-label">Abilities:</span>
                                                    </td>
                                                    <td>
                                                        <ol>
                                                            {abilityElements}
                                                        </ol>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="data-label">Weak Against:</span>
                                                    </td>
                                                    <td>
                                                        <ol>
                                                            {weaknessElements}
                                                        </ol>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Row>
            <Row>
                <Col lg="3"></Col>
                <Col lg="2">
                    <Link to={"/pokemondetail/" + pokemon.evolution.stage1.id}>
                        <Pokemon pokemon={pokemon.evolution.stage1}/>
                    </Link>
                    {/* <a href="#" onClick={() => loadPokemonData(pokemon.evolution.stage1.id as string)}>
                        <Pokemon pokemon={pokemon.evolution.stage1}></Pokemon>
                    </a> */}
                </Col>
                <Col lg="2">
                <Link to={"/pokemondetail/" + pokemon.evolution.stage2.id}>
                        <Pokemon pokemon={pokemon.evolution.stage2}/>
                    </Link>
                    {/* <a href="#" onClick={() => loadPokemonData(pokemon.evolution.stage2.id as string)}>
                        <Pokemon pokemon={pokemon.evolution.stage2}></Pokemon>
                    </a> */}
                </Col>
                <Col lg="2">
                <Link to={"/pokemondetail/" + pokemon.evolution.stage3.id}>
                        <Pokemon pokemon={pokemon.evolution.stage3}/>
                    </Link>
                    {/* <a href="#" onClick={() => loadPokemonData(pokemon.evolution.stage3.id as string)}>
                        <Pokemon pokemon={pokemon.evolution.stage3}></Pokemon>
                    </a> */}
                </Col>
                <Col lg="3"></Col>
            </Row>
        </Container>
        }
        </>
    )
}

export default PokemonDetail