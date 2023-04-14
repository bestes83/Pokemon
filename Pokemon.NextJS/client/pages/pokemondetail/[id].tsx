import {NextPage} from 'next'
import { useRouter } from 'next/router'
import { Card, Table } from 'react-bootstrap'
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Config } from '../../config'
import Header from '../../components/header'
import { PokemonModel } from '../../models/pokemonModel';

const PokemonDetail:NextPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const imageUrl = Config.PokemonImageUrl + id?.toString().padStart(3, '00') + ".png"
    const [pokemon, setPokemon] = useState<PokemonModel>();

    useEffect(() => {
        axios.get(Config.PokemonApi + "/Pokemon/GetPokemon/" + id).then((response) => {
            setPokemon(response.data);
        });
    }, [])

    const typeElements = pokemon?.types.map((item, index) => <span key={index} className="type">{item}</span>);
    const abilityElements = pokemon?.abilities.map((item, index) => <li key={index}>{item}</li>)
    return (
        <>
        <Header />
        <Card className="pokemon-detail-card">
            <div>
                <div className="pokemon-detail-image" >
                    <img src={imageUrl} style={{width:"500px", height:"500px"}}/>
                </div>
                <div className="pokemon-detail-stats">
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
                        </tbody>
                    </Table>
                </div>
            </div>
        </Card>
        </>
    )
}

export default PokemonDetail