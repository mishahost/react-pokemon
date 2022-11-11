import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Components
import Loader from '../components/Loader';

const PokemonPage = ({ match }) => {

    const [pokemonDetails, setPokemonDetails] = useState();
    const [loading, setLoading] = useState(true);

    const id = match.params.id;

    const getPokemon = async (id) => {
        const details = await getPokemonData(id);
        setPokemonDetails(details.data);
        console.log(details.data)
        setLoading(false);
    }

    const getPokemonData = async (id) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res;
    }

    useEffect(() => {
        getPokemon(id);
    }, [])

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card className='my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white' style={{ border: 'none' }}>
                            <Link to={`/pokemon/${pokemonDetails.id}`}>
                                <Card.Img style={{ width: '15rem' }} src={pokemonDetails.sprites.front_default} variant='top'/>
                            </Link>
                            <Card.Body className={`${pokemonDetails.types[0].type.name} rounded text-white`}>
                                <Link to={`/pokemon/${pokemonDetails.name}`} className='link-name'>
                                    <Card.Title as='div'>
                                        <strong>#{pokemonDetails.id} {pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</strong>
                                    </Card.Title>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card className='p-3 rounded text-center shadow p-3 mb-5 bg-white' style={{ border: 'none' }}>
                            <Card.Body>
                                    <Card.Text>
                                    <Row className='mt-4'>
                                        <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div className='px-4 py-1 rounded' style={{ border: '1px black solid' }}><h4>Abilities</h4></div>
                                        </Col>
                                    </Row>
                                    <Row className='text-center'>
                                        {pokemonDetails.abilities.map(a => (
                                            <Col key={a.ability.name} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div className={`rounded px-4 py-1`}>
                                                    <h5>{a.ability.name.toUpperCase()}</h5>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                        <Row>
                                        <Col>
                                        <div className="base-stat">
                                          {
                                              pokemonDetails.stats.map(poke=>{
                                                  return(
                                                      <>
                                                          <h5>{poke.stat.name}:{poke.base_stat}</h5>
                                                      </>
                                                  )
                                              })
                                          }
                                      </div>
                                      </Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                                </Card>
                                </Col>
                </Row>
            )}
        </>
    )
}

export default PokemonPage;
