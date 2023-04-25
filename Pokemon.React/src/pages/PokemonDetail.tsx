import { useParams, Link } from 'react-router-dom'
import { Card, Container, Row, Col, Table } from 'react-bootstrap'
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Config } from '../config'
import { PokemonModel } from '../models/pokemonModel';
import Pokemon from '../components/pokemon';
import { EvolutionModel } from '../models/EvolutionModel';
import Loading from '../components/Loading';


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

    let defaultEvolution = {
        stage1: defaultPokemon,
        stage2: defaultPokemon,
        stage3: defaultPokemon,
    }

    const {id} = useParams();
    const imageUrl = Config.PokemonImageUrl + id?.toString().padStart(3, '00') + ".png"
    const [pokemon, setPokemon] = useState<PokemonModel>(defaultPokemon);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [evolution, setEvolution] = useState<EvolutionModel>(defaultEvolution);

    const loadPokemonData = (id:string) => {
        setIsLoaded(false);
        axios.get(Config.PokemonApi + "/Pokemon/GetPokemon/" + id).then((response) => {
            setPokemon(response.data as PokemonModel);
            setIsLoaded(true);
            console.log(response.data.evolution);
        }).catch((err) => console.log(err));

        axios.get(Config.PokemonApi + "/Pokemon/GetEvolutionChain/" + id).then((response) => {
            setEvolution(response.data as EvolutionModel)
            setIsLoaded(true);
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        loadPokemonData(id as string)
    }, [id])

    const typeElements = pokemon?.types.map((item, index) => <span key={index} className="type">{item}</span>);
    const weaknessElements = pokemon?.weaknesses.map((item, index) => <li key={index}>{item}</li>)
    const abilityElements = pokemon?.abilities.map((item, index) => <li key={index}>{item}</li>)
    return (
        <>
        {!isLoaded && 
            <Loading />}
        {isLoaded && 
        <Container>
            <Row>
                <Card className="pokemon-detail-card">
                    <Container>
                        <Row>
                            <Col>
                                <h1>#{pokemon.id}&nbsp;{pokemon.name}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <img src={imageUrl} className="pokemon-detail-image"/>
                            </Col>
                            <Col>
                                <Container>
                                    <Row>
                                        <Table bordered>
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
                    <Link to={"/pokemondetail/" + evolution.stage1.id}>
                        <Pokemon pokemon={evolution.stage1}/>
                    </Link>
                </Col>
                <Col lg="2">
                    <Link to={"/pokemondetail/" + evolution.stage2.id}>
                        <Pokemon pokemon={evolution.stage2}/>
                    </Link>
                </Col>
                <Col lg="2">
                    <Link to={"/pokemondetail/" + evolution.stage3.id}>
                        <Pokemon pokemon={evolution.stage3}/>
                    </Link>
                </Col>
                <Col lg="3"></Col>
            </Row>
        </Container>
        }
        </>
    )
}

export default PokemonDetail