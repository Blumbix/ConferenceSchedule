import React from 'react'
import {Collapse, Divider, Tabs} from 'antd';
import {Presentation} from "./Presentation";
import {Session} from "./Session";
import {Room} from "./Room";
const {Panel} = Collapse;

export const Home = () => {
    const { TabPane } = Tabs;

    return (
        <>
            <Collapse>
                <Panel header='Sessions' key='1'>
                    <Session/>
                </Panel>
                <Panel header='Rooms' key='2'>
                    <Room/>
                </Panel>
            </Collapse>
            <Divider/>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Monday" key="1">
                    <Presentation date='2019-09-02'/>
                </TabPane>
                <TabPane tab="Tuesday" key="2">
                    <Presentation date='2019-09-03'/>
                </TabPane>
                <TabPane tab="Wednesday" key="3">
                    <Presentation date='2019-09-04'/>
                </TabPane>
                <TabPane tab="Thursday" key="4">
                    <Presentation date='2019-09-05'/>
                </TabPane>
                <TabPane tab="Friday" key="5">
                    <Presentation date='2019-09-06'/>
                </TabPane>
            </Tabs>
        </>
    )
};