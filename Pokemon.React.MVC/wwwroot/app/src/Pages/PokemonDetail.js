import React from 'react';
import Axios from 'axios';

class PokemonDetail extends React.Component {
    constructor(props) {
        super();
        this.state = {
            pokemon: null,
            isLoaded: false,
        }
    }

    componentDidMount() {
        console.log(this.props.pokemonId);
        Axios.get('/Pokemon/GetPokemon/'+this.props.pokemonId).then(response => {
            console.log(response.data);
            this.setState({
                pokemon: response.data,
                isLoaded: true,
            });
        });
    }

    render() {
        const { pokemon, isLoaded } = this.state;

        if (!isLoaded)
        {
            return <div>Loading.....</div>;
        }
        else {

            var types = pokemon.types.map((type) => { return <div style={{ margin: "0 5px 0 5px", display: "inline" }}>{type}</div> });
            var abilities = pokemon.abilities.map((ability) => { return <div style={{ margin: "0 5px 0 5px", display: "inline" }}>{ability}</div> });
            var stage1 = pokemon.evolution.stage1.map((p) => {
                var url = "/Pokemon/Detail/"+ p.id;
                return <div style={{ display: "block" }}>
                            <a href={url}>
                                <div><img style={{height: "100px", width: "100px"}} src={p.imageUrl} /></div>
                                <div>{p.name} #{p.id}</div>
                            </a>
                        </div>
            });

            var stage2 = pokemon.evolution.stage2.map((p) => {
                    var url = "/Pokemon/Detail/"+ p.id;
                    return <div style={{ display: "block" }}>
                                <a href={url}>
                                    <div><img style={{height: "100px", width: "100px"}} src={p.imageUrl} /></div>
                                    <div>{p.name} #{p.id}</div>
                                </a>
                            </div>
            });

            var stage3 = pokemon.evolution.stage3.map((p) => {
                    var url = "/Pokemon/Detail/"+ p.id;
                    return <div style={{ display: "block" }}>
                                <a href={url}>
                                    <div><img style={{height: "100px", width: "100px"}} src={p.imageUrl} /></div>
                                    <div>{p.name} #{p.id}</div>
                                </a>
                            </div>
            });

            return (
                <div>
                    <div style={{margin: "0 auto", textAlign: "center" }}>
                        <h1>{pokemon.name}</h1>
                    </div>

                    <div style={{ margin: "0 auto", textAlign: "center" }}>
                        <h6>{pokemon.genus}</h6>
                    </div> 

                    <div style={{ margin: "0 auto", display:"table", textAlign: "center" }}>
                        <div style={{ display: "table-row" }}>
                            <div style={{ display: "table-cell", padding: "100px 100px 0 0" }}>
                                <table>
                                    <tr style={{textAlign: "left"}}>
                                        <td>
                                            Id:
                                        </td>
                                        <td>
                                            #{pokemon.id}
                                        </td>
                                    </tr>
                                    <tr style={{ textAlign: "left" }}>
                                        <td>
                                            Height:
                                        </td>
                                        <td>
                                            {pokemon.heightInMeters}m
                                        </td>
                                    </tr>
                                    <tr style={{ textAlign: "left" }}>
                                        <td>
                                            Weight:
                                        </td>
                                        <td>
                                            {pokemon.weightInKg}kg
                                        </td>
                                    </tr>
                                    <tr style={{ textAlign: "left" }}>
                                        <td>
                                            Type:
                                        </td>
                                        <td>
                                            {types}
                                        </td>
                                    </tr>
                                    <tr style={{ textAlign: "left" }}>
                                        <td>
                                            Abilities:
                                        </td>
                                        <td>
                                            {abilities}
                                        </td>
                                    </tr>
                                    <tr style={{ textAlign: "left" }}>
                                        <td>
                                        </td>
                                        <td>
                                            {pokemon.legendaryOrMethicalTag}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div style={{ display: "table-cell", verticalAlign: "top" }}>
                                <img src={pokemon.imageUrl} />
                            </div>
                        </div>
                        <div style={{display: "table-row"}}>
                            <div style={{display: "table-cell"}}>{stage1}</div>
                            <div style={{display: "table-cell"}}>{stage2}</div>
                            <div style={{display: "table-cell"}}>{stage3}</div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}



export default PokemonDetail;