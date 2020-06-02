import React, {useEffect, useState} from 'react'
import API from "../../services/api";
import {PresDisplay} from "./PresDisplay";
import {Col, Row} from "antd";
//import PresDisplay from "./PresDisplay";

export const Presentation = (props) => {
    const [presentations, setPresentations] = useState([]);

    useEffect( () => {
            API.get(`/presentations?date=${props.date}`, {})
                .then(response => {
                    console.log('Presentations claimed.');
                    setPresentations(response.data);
                })
                .catch(errInfo => {
                    console.log('Presentations error: ', errInfo)
                });
        }, //eslint-disable-next-line
        []);

    return (
        <div className="site-card-border-less-wrapper">
            <Row>
                    {presentations.map(pres =>
                        <Col span={6} key={pres.id}>
                            <div className="card-content">
                                <PresDisplay keywords={pres.keywords} authors={pres.authors} title={pres.title}
                                         filename={pres.filename} session={pres.session} id={pres.id}
                                         date={pres.date}/>
                            </div>
                        </Col>

                    )}
            </Row>
        </div>
    )
};