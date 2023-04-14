import {Card} from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { Config } from '../config';
import { PokemonModel } from '../models/pokemonModel'

interface PokemonProps{
    //pokemonId:string;
    pokemon:PokemonModel
}



const Pokemon = (props: PokemonProps) =>{
    const imageUrl = Config.PokemonThumbnailUrl + props.pokemon.id.toString().padStart(3, '00') + ".png"
    const [pokemon, setPokemon] = useState<PokemonModel>();

    useEffect(()=>{
        setPokemon(props.pokemon);
    }, []);

    return(
        <Card className="pokemon-card">
            <Card.Header>#{pokemon?.id}&nbsp;{pokemon?.name}</Card.Header>
            <Card.Body>
                <img src={imageUrl} style={{height: 125, width: 125}}/>
            </Card.Body>
        </Card>
    )
}

export default Pokemon;