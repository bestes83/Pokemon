import React from "react";
import Axios from 'axios';

class PokemonList extends React.Component{
    constructor(props){
        super();
        this.state = {
            pokemonList: [],
            isLoaded: false,
        }

        this.onPageClicked = this.onPageClicked.bind(this);
        this.onPreviousPageClicked = this.onPreviousPageClicked.bind(this);
    }

    componentDidMount(){
        // Axios.get('/Home/GetList/' + this.props.currentIndex).then(response => {
        //     this.setState({
        //         pokemonList: response.data,
        //         isLoaded: true,
        //         currentIndex: 0,
        //     });
        // });
        this.getList(this.props.currentIndex);
    }

    onPageClicked(e, currentIndex){
        e.preventDefault();

        this.getList(currentIndex);
    }

    onPreviousPageClicked(e){
        e.preventDefault();
        const { currentIndex } = this.state;

        var newIndex = currentIndex - 50;

        this.getList(newIndex)

        this.setState({
            currentIndex: newIndex,
        });
    }

    getList(currentIndex){
        this.setState({
            pokemonList: [],
            isLoaded: false,            
        });

        Axios.get('/Home/GetList/' + currentIndex).then(response => {
            this.setState({
                pokemonList: response.data,
                isLoaded: true,
                currentIndex: currentIndex
            });
        });
    }

    render(){
        const { pokemonList, isLoaded } = this.state;

        if(!isLoaded){
            return <div style={{margin: "0 auto;"}}>Loading......</div>
        }
        else{
            var listElements = pokemonList.map((p, index) => {
                var url = "/Pokemon/Detail/" + p.id;

                return (
                    <a className={"col-md-5"} style={{width: "150px"}} href={url}>
                        <div className={"card border-dark mb-3"}>
                            <div className={"card-body"}>
                                <img style={{height: "100px", width: "100px"}} src={p.imageUrl} alt={p.name} />
                                {p.name}
                            </div>
                        </div>
                    </a>
                )});

            return (
                <React.StrictMode>
                    <div className={"row"} style={{margin: "0 0 100px 0"}}>
                        {listElements}
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item">
                                    {/* <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a> */}
                                    <button class="page-link" onClick={(e) => this.onPreviousPageClicked(e)}>
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 1)}>1</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 52)}>52</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 103)}>103</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 154)}>154</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 205)}>205</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 256)}>256</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 307)}>307</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 358)}>358</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 409)}>409</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 460)}>460</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 511)}>511</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 562)}>562</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 613)}>613</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 664)}>664</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 715)}>715</button></li>
                                <li class="page-item"><button class="page-link" onClick={(e) => this.onPageClicked(e, 766)}>766</button></li>
                                <li class="page-item">
                                    {/* <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a> */}
                                    <button class="page-link" onClick={(e) => this.onPageClicked(e, 766)}>766</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </React.StrictMode>
            );
        }
        
    }
}

export default PokemonList;