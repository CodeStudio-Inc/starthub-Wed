import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import * as actionCreators from '../../../store/actionCreators'
import { Progress } from 'antd'
import Qiribu from './Startups/Qiribu'
import InoveLabs from './Startups/InoveLabs'
import Isharc from './Startups/Isharc'
import SocialClark from './Startups/SocialClark'
import Figurines from './Startups/Figurines'
import RadaSafaris from './Startups/RadaSafaris'
import ZetuAfrica from './Startups/ZetuAfrica'
import OminGym from './Startups/OmniGym'
import Solfix from './Startups/Solfix'
import GrabGas from './Startups/GrabGas'
import Devine from './Startups/Devine'
import Onestope from './Startups/Onestope'
import Fastmere from './Startups/Fastmere'

import './Admin.css'
const Overview = () => {

    const { users } = useSelector(state => state.admin)
    const { all_objectives } = useSelector(state => state.admin)

    const dispatch = useDispatch()

    const objectives = () =>  dispatch(actionCreators.getAllObjectives())

    useEffect(() => {
        objectives()
    },[])

    const catalyzer = users && users.filter(e => e.category === 'catalyzer')

    const qiribu = all_objectives && all_objectives.filter(e => e.creator === catalyzer[0]._id)
    const inoveLabs = all_objectives && all_objectives.filter(e => e.creator === catalyzer[1]._id)
    const isharc = all_objectives && all_objectives.filter(e => e.creator === catalyzer[2]._id)
    const socialClark = all_objectives && all_objectives.filter(e => e.creator === catalyzer[3]._id)
    const figurines = all_objectives && all_objectives.filter(e => e.creator === catalyzer[4]._id)
    const radaSafaris = all_objectives && all_objectives.filter(e => e.creator === catalyzer[5]._id)
    const zetuAfrica = all_objectives && all_objectives.filter(e => e.creator === catalyzer[6]._id)
    const omniGym = all_objectives && all_objectives.filter(e => e.creator === catalyzer[7]._id)
    const solfix = all_objectives && all_objectives.filter(e => e.creator === catalyzer[9]._id)
    const grabGas = all_objectives && all_objectives.filter(e => e.creator === catalyzer[10]._id)
    const devine = all_objectives && all_objectives.filter(e => e.creator === catalyzer[13]._id)
    const onetope = all_objectives && all_objectives.filter(e => e.creator === catalyzer[14]._id)
    const fastMere = all_objectives && all_objectives.filter(e => e.creator === catalyzer[15]._id)

    //Qiribu overview data filter
    const qiribuOverrallPercentage = qiribu && qiribu.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / qiribu.length
    
    const QiribuQ1 = qiribu.filter(e => e.quarter === 1)
    const QiribuQ1Percentage = QiribuQ1 && QiribuQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / QiribuQ1.length

    const QiribuQ2 = qiribu.filter(e => e.quarter === 2)
    const QiribuQ2Percentage = QiribuQ2 && QiribuQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / QiribuQ2.length

    const QiribuQ3 = qiribu.filter(e => e.quarter === 3)
    const QiribuQ3Percentage = QiribuQ3 && QiribuQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / QiribuQ3.length

    const QiribuQ4 = qiribu.filter(e => e.quarter === 4)
    const QiribuQ4Percentage = QiribuQ4 && QiribuQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / QiribuQ4.length

    //InoveLabs overview data filter
    const inoveLabsOverrallPercentage = inoveLabs && inoveLabs.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / inoveLabs.length
    
    const inoveLabsQ1 = inoveLabs.filter(e => e.quarter === 1)
    const inoveLabsQ1Percentage = inoveLabsQ1 && inoveLabsQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / inoveLabsQ1.length

    const inoveLabsQ2 = inoveLabs.filter(e => e.quarter === 2)
    const inoveLabsQ2Percentage = inoveLabsQ2 && inoveLabsQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / inoveLabsQ2.length

    const inoveLabsQ3 = inoveLabs.filter(e => e.quarter === 3)
    const inoveLabsQ3Percentage = inoveLabsQ3 && inoveLabsQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / inoveLabsQ3.length

    const inoveLabsQ4 = inoveLabs.filter(e => e.quarter === 4)
    const inoveLabsQ4Percentage = inoveLabsQ4 && inoveLabsQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / inoveLabsQ4.length

    // Isharc overview data filter
    const isharcOverrallPercentage = isharc && isharc.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / isharc.length

    const isharcQ1 = isharc.filter(e => e.quarter === 1)
    const isharcQ1Percentage = isharcQ1 && isharcQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / isharcQ1.length

    const isharcQ2 = isharc.filter(e => e.quarter === 2)
    const isharcQ2Percentage = isharcQ2 && isharcQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / isharcQ2.length

    const isharcQ3 = isharc.filter(e => e.quarter === 3)
    const isharcQ3Percentage = isharcQ3 && isharcQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / isharcQ3.length

    const isharcQ4 = isharc.filter(e => e.quarter === 4)
    const isharcQ4Percentage = isharcQ4 && isharcQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / isharcQ4.length

    // SocialClark overview data filter
    const socialClarkOverrallPercentage = socialClark && socialClark.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / socialClark.length

    const socialClarkQ1 = socialClark.filter(e => e.quarter === 1)
    const socialClarkQ1Percentage = socialClarkQ1 && socialClarkQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / socialClarkQ1.length

    const socialClarkQ2 = socialClark.filter(e => e.quarter === 2)
    const socialClarkQ2Percentage = socialClarkQ2 && socialClarkQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / socialClarkQ2.length

    const socialClarkQ3 = socialClark.filter(e => e.quarter === 3)
    const socialClarkQ3Percentage = socialClarkQ3 && socialClarkQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / socialClarkQ3.length

    const socialClarkQ4 = socialClark.filter(e => e.quarter === 4)
    const socialClarkQ4Percentage = socialClarkQ4 && socialClarkQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / socialClarkQ4.length

    // Figurines overview data filter
    const figurinesOverrallPercentage = figurines && figurines.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / figurines.length

    const figurinesQ1 = figurines.filter(e => e.quarter === 1)
    const figurinesQ1Percentage = figurinesQ1 && figurinesQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / figurinesQ1.length

    const figurinesQ2 = figurines.filter(e => e.quarter === 2)
    const figurinesQ2Percentage = figurinesQ2 && figurinesQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / figurinesQ2.length 

    const figurinesQ3 = figurines.filter(e => e.quarter === 3)
    const figurinesQ3Percentage = figurinesQ3 && figurinesQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / figurinesQ3.length

    const figurinesQ4 = figurines.filter(e => e.quarter === 4)
    const figurinesQ4Percentage = figurinesQ4 && figurinesQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / figurinesQ4.length

    // RadaSafaris overview data filter
    const radaSafarisOverrallPercentage = radaSafaris && radaSafaris.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / radaSafaris.length

    const radaSafarisQ1 = radaSafaris.filter(e => e.quarter === 1)
    const radaSafarisQ1Percentage = radaSafarisQ1 && radaSafarisQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / radaSafarisQ1.length

    const radaSafarisQ2 = radaSafaris.filter(e => e.quarter === 2)
    const radaSafarisQ2Percentage = radaSafarisQ2 && radaSafarisQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / radaSafarisQ2.length

    const radaSafarisQ3 = radaSafaris.filter(e => e.quarter === 3)
    const radaSafarisQ3Percentage = radaSafarisQ3 && radaSafarisQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / radaSafarisQ3.length

    const radaSafarisQ4 = radaSafaris.filter(e => e.quarter === 4)
    const radaSafarisQ4Percentage = radaSafarisQ4 && radaSafarisQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / radaSafarisQ4.length

    // ZetuAfrica overview data filter
    const zetuAfricaOverrallPercentage = zetuAfrica && zetuAfrica.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / zetuAfrica.length

    const zetuAfricaQ1 = zetuAfrica.filter(e => e.quarter === 1)
    const zetuAfricaQ1Percentage = zetuAfricaQ1 && zetuAfricaQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / zetuAfricaQ1.length

    const zetuAfricaQ2 = zetuAfrica.filter(e => e.quarter === 2)
    const zetuAfricaQ2Percentage = zetuAfricaQ2 && zetuAfricaQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / zetuAfricaQ2.length

    const zetuAfricaQ3 = zetuAfrica.filter(e => e.quarter === 3)
    const zetuAfricaQ3Percentage = zetuAfricaQ3 && zetuAfricaQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / zetuAfricaQ3.length

    const zetuAfricaQ4 = zetuAfrica.filter(e => e.quarter === 4)
    const zetuAfricaQ4Percentage = zetuAfricaQ4 && zetuAfricaQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / zetuAfricaQ4.length

    // OmniGym overview data filter
    const omniGymOverrallPercentage = omniGym && omniGym.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / omniGym.length

    const omniGymQ1 = omniGym.filter(e => e.quarter === 1)
    const omniGymQ1Percentage = omniGymQ1 && omniGymQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / omniGymQ1.length

    const omniGymQ2 = omniGym.filter(e => e.quarter === 2)
    const omniGymQ2Percentage = omniGymQ2 && omniGymQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / omniGymQ2.length

    const omniGymQ3 = omniGym.filter(e => e.quarter === 3)
    const omniGymQ3Percentage = omniGymQ3 && omniGymQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / omniGymQ3.length

    const omniGymQ4 = omniGym.filter(e => e.quarter === 4)
    const omniGymQ4Percentage = omniGymQ4 && omniGymQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / omniGymQ4.length

    // Solfix overview data filter
    const solfixOverrallPercentage = solfix && solfix.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / solfix.length

    const solfixQ1 = solfix.filter(e => e.quarter === 1)
    const solfixQ1Percentage = solfixQ1 && solfixQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / solfixQ1.length

    const solfixQ2 = solfix.filter(e => e.quarter === 2)
    const solfixQ2Percentage = solfixQ2 && solfixQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / solfixQ2.length

    const solfixQ3 = solfix.filter(e => e.quarter === 3)
    const solfixQ3Percentage = solfixQ3 && solfixQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / solfixQ3.length

    const solfixQ4 = solfix.filter(e => e.quarter === 4)
    const solfixQ4Percentage = solfixQ4 && solfixQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / solfixQ4.length

    // GrabGas overview data filter
    const grabGasOverrallPercentage = grabGas && grabGas.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / grabGas.length

    const grabGasQ1 = grabGas.filter(e => e.quarter === 1)
    const grabGasQ1Percentage = grabGasQ1 && grabGasQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / grabGasQ1.length

    const grabGasQ2 = grabGas.filter(e => e.quarter === 2)
    const grabGasQ2Percentage = grabGasQ2 && grabGasQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / grabGasQ2.length

    const grabGasQ3 = grabGas.filter(e => e.quarter === 3)
    const grabGasQ3Percentage = grabGasQ3 && grabGasQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / grabGasQ3.length

    const grabGasQ4 = grabGas.filter(e => e.quarter === 4)
    const grabGasQ4Percentage = grabGasQ4 && grabGasQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / grabGasQ4.length

    // Devine overview data filter
    const devineOverrallPercentage = devine && devine.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / devine.length

    const devineQ1 = devine.filter(e => e.quarter === 1)
    const devineQ1Percentage = devineQ1 && devineQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / devineQ1.length

    const devineQ2 = devine.filter(e => e.quarter === 2)
    const devineQ2Percentage = devineQ2 && devineQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / devineQ2.length

    const devineQ3 = devine.filter(e => e.quarter === 3)
    const devineQ3Percentage = devineQ3 && devineQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / devineQ3.length

    const devineQ4 = devine.filter(e => e.quarter === 4)
    const devineQ4Percentage = devineQ4 && devineQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / devineQ4.length

    // Onetope overview data filter
    const onetopeOverrallPercentage = onetope && onetope.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / onetope.length

    const onetopeQ1 = onetope.filter(e => e.quarter === 1)
    const onetopeQ1Percentage = onetopeQ1 && onetopeQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / onetopeQ1.length

    const onetopeQ2 = onetope.filter(e => e.quarter === 2)
    const onetopeQ2Percentage = onetopeQ2 && onetopeQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / onetopeQ2.length

    const onetopeQ3 = onetope.filter(e => e.quarter === 3)
    const onetopeQ3Percentage = onetopeQ3 && onetopeQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / onetopeQ3.length

    const onetopeQ4 = onetope.filter(e => e.quarter === 4)
    const onetopeQ4Percentage = onetopeQ4 && onetopeQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / onetopeQ4.length

    // FastMere overview data filter
    const fastMereOverrallPercentage = fastMere && fastMere.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / fastMere.length

    const fastMereQ1 = fastMere.filter(e => e.quarter === 1)
    const fastMereQ1Percentage = fastMereQ1 && fastMereQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / fastMereQ1.length

    const fastMereQ2 = fastMere.filter(e => e.quarter === 2)
    const fastMereQ2Percentage = fastMereQ2 && fastMereQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / fastMereQ2.length

    const fastMereQ3 = fastMere.filter(e => e.quarter === 3)
    const fastMereQ3Percentage = fastMereQ3 && fastMereQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / fastMereQ3.length

    const fastMereQ4 = fastMere.filter(e => e.quarter === 4)
    const fastMereQ4Percentage = fastMereQ4 && fastMereQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / fastMereQ4.length

    return (
        <div className="admin-main">
            <div className="admin-overview">
                <div className="admin-overview-row">
                    <Qiribu
                        overrall={qiribuOverrallPercentage}
                        Q1={QiribuQ1Percentage}
                        Q2={QiribuQ2Percentage}
                        Q3={QiribuQ3Percentage}
                        Q4={QiribuQ4Percentage}
                        username={catalyzer[0].username}
                    />
                    <InoveLabs
                        overrall={inoveLabsOverrallPercentage}
                        Q1={inoveLabsQ1Percentage}
                        Q2={inoveLabsQ2Percentage}
                        Q3={inoveLabsQ3Percentage}
                        Q4={inoveLabsQ4Percentage}
                        username={catalyzer[1].username}
                    />
                    <Isharc
                        overrall={isharcOverrallPercentage}
                        Q1={isharcQ1Percentage}
                        Q2={isharcQ2Percentage}
                        Q3={isharcQ3Percentage}
                        Q4={isharcQ4Percentage}
                        username={catalyzer[2].username}
                    />
                    <SocialClark
                        overrall={socialClarkOverrallPercentage}
                        Q1={socialClarkQ1Percentage}
                        Q2={socialClarkQ2Percentage}
                        Q3={socialClarkQ3Percentage}
                        Q4={socialClarkQ4Percentage}
                        username={catalyzer[3].username}
                    />
                    <Figurines
                        overrall={figurinesOverrallPercentage}
                        Q1={figurinesQ1Percentage}
                        Q2={figurinesQ2Percentage}
                        Q3={figurinesQ3Percentage}
                        Q4={figurinesQ4Percentage}
                        username={catalyzer[4].username}
                    />
                    <RadaSafaris
                        overrall={radaSafarisOverrallPercentage}
                        Q1={radaSafarisQ1Percentage}
                        Q2={radaSafarisQ2Percentage}
                        Q3={radaSafarisQ3Percentage}
                        Q4={radaSafarisQ4Percentage}
                        username={catalyzer[5].username}
                    />
                    <ZetuAfrica
                        overrall={zetuAfricaOverrallPercentage}
                        Q1={zetuAfricaQ1Percentage}
                        Q2={zetuAfricaQ2Percentage}
                        Q3={zetuAfricaQ3Percentage}
                        Q4={zetuAfricaQ4Percentage}
                        username={catalyzer[6].username}
                    />
                    <OminGym
                        overrall={omniGymOverrallPercentage}
                        Q1={omniGymQ1Percentage}
                        Q2={omniGymQ2Percentage}
                        Q3={omniGymQ3Percentage}
                        Q4={omniGymQ4Percentage}
                        username={catalyzer[7].username}
                    />
                    <Solfix
                        overrall={solfixOverrallPercentage}
                        Q1={solfixQ1Percentage}
                        Q2={solfixQ2Percentage}
                        Q3={solfixQ3Percentage}
                        Q4={solfixQ4Percentage}
                        username={catalyzer[9].username}
                    />
                    <GrabGas
                        overrall={grabGasOverrallPercentage}
                        Q1={grabGasQ1Percentage}
                        Q2={grabGasQ2Percentage}
                        Q3={grabGasQ3Percentage}
                        Q4={grabGasQ4Percentage}
                        username={catalyzer[10].username}
                    />
                    <Devine
                        overrall={devineOverrallPercentage}
                        Q1={devineQ1Percentage}
                        Q2={devineQ2Percentage}
                        Q3={devineQ3Percentage}
                        Q4={devineQ4Percentage}
                        username={catalyzer[13].username}
                    />
                    <Onestope
                        overrall={onetopeOverrallPercentage}
                        Q1={onetopeQ1Percentage}
                        Q2={onetopeQ2Percentage}
                        Q3={onetopeQ3Percentage}
                        Q4={onetopeQ4Percentage}
                        username={catalyzer[14].username}
                    />
                    <Fastmere
                        overrall={fastMereOverrallPercentage}
                        Q1={fastMereQ1Percentage}
                        Q2={fastMereQ2Percentage}
                        Q3={fastMereQ3Percentage}
                        Q4={fastMereQ4Percentage}
                        username={catalyzer[15].username}
                    />
                </div>
           </div>
        </div>
    )
}

export default Overview
