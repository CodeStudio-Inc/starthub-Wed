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
    
    const percentages = Array.from(qiribu && qiribu, ({ objPercentage }) => objPercentage)
    const qiribuOverallTotal = percentages && percentages.reduce((a, b) => a + b, 0)
    const qiribuOverallAverage = qiribuOverallTotal / qiribu.length 

    console.log(qiribuOverallTotal, qiribuOverallAverage, percentages, qiribu,'lll')    
    const QiribuQ1 = qiribu.filter(e => e.quarter === 1)
    const QiribuQ1Average = Array.from(QiribuQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / QiribuQ1.length

    const QiribuQ2 = qiribu.filter(e => e.quarter === 2)
    const QiribuQ2Average = Array.from(QiribuQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / QiribuQ2.length

    const QiribuQ3 = qiribu.filter(e => e.quarter === 3)
    const QiribuQ3Average = Array.from(QiribuQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / QiribuQ3.length

    const QiribuQ4 = qiribu.filter(e => e.quarter === 4)
    const QiribuQ4Average = Array.from(QiribuQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / QiribuQ4.length

    //InoveLabs overview data filter
    // const inoveLabsOverallAverage = Array.from(inoveLabs, ({ objPercentage }) => Math.round(!objPercentage ? 0 : objPercentage)).reduce((a, b) => a + b, 0) / inoveLabs.length

    // const inoveLabsQ1 = inoveLabs.filter(e => e.quarter === 1)
    // const inoveLabsQ1Average = Array.from(inoveLabsQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / inoveLabsQ1.length

    // const inoveLabsQ2 = inoveLabs.filter(e => e.quarter === 2)
    // const inoveLabsQ2Average = Array.from(inoveLabsQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / inoveLabsQ2.length

    // const inoveLabsQ3 = inoveLabs.filter(e => e.quarter === 3)
    // const inoveLabsQ3Average = Array.from(inoveLabsQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / inoveLabsQ3.length

    // const inoveLabsQ4 = inoveLabs.filter(e => e.quarter === 4)
    // const inoveLabsQ4Average = Array.from(inoveLabsQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / inoveLabsQ4.length

    //Isharc overview data filter
    // const isharcOverallAverage = Array.from(isharc, ({ objPercentage }) => Math.round(!objPercentage ? 0 : objPercentage)).reduce((a, b) => a + b, 0) / isharc.length

    // const isharcQ1 = isharc.filter(e => e.quarter === 1)
    // const isharcQ1Average = Array.from(isharcQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / isharcQ1.length

    // const isharcQ2 = isharc.filter(e => e.quarter === 2)
    // const isharcQ2Average = Array.from(isharcQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / isharcQ2.length

    // const isharcQ3 = isharc.filter(e => e.quarter === 3)
    // const isharcQ3Average = Array.from(isharcQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / isharcQ3.length

    // const isharcQ4 = isharc.filter(e => e.quarter === 4)
    // const isharcQ4Average = Array.from(isharcQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / isharcQ4.length

    //SocialClark overview data filter
    // const socialClarkOverallAverage = Array.from(socialClark, ({ objPercentage }) => Math.round(!objPercentage ? 0 : objPercentage)).reduce((a, b) => a + b, 0) / socialClark.length

    // const socialClarkQ1 = socialClark.filter(e => e.quarter === 1)
    // const socialClarkQ1Average = Array.from(socialClarkQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / socialClarkQ1.length

    // const socialClarkQ2 = socialClark.filter(e => e.quarter === 2)
    // const socialClarkQ2Average = Array.from(socialClarkQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / socialClarkQ2.length

    // const socialClarkQ3 = socialClark.filter(e => e.quarter === 3)
    // const socialClarkQ3Average = Array.from(socialClarkQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / socialClarkQ3.length

    // const socialClarkQ4 = socialClark.filter(e => e.quarter === 4)
    // const socialClarkQ4Average = Array.from(socialClarkQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / socialClarkQ4.length

    //Figurines overview data filter
    // const figurinesOverallAverage = Array.from(figurines, ({ objPercentage }) => Math.round(!objPercentage ? 0 : objPercentage)).reduce((a, b) => a + b, 0) / figurines.length

    // const figurinesQ1 = figurines.filter(e => e.quarter === 1)
    // const figurinesQ1Average = Array.from(figurinesQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / figurinesQ1.length

    // const figurinesQ2 = figurines.filter(e => e.quarter === 2)
    // const figurinesQ2Average = Array.from(figurinesQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / figurinesQ2.length

    // const figurinesQ3 = figurines.filter(e => e.quarter === 3)
    // const figurinesQ3Average = Array.from(figurinesQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / figurinesQ3.length

    // const figurinesQ4 = figurines.filter(e => e.quarter === 4)
    // const figurinesQ4Average = Array.from(figurinesQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / figurinesQ4.length

    //RadaSafaris overview data filter
    // const radaSafarisOverallAverage = Array.from(radaSafaris, ({ objPercentage }) => Math.round(!objPercentage ? 0 : objPercentage)).reduce((a, b) => a + b, 0) / radaSafaris.length

    // const radaSafarisQ1 = radaSafaris.filter(e => e.quarter === 1)
    // const radaSafarisQ1Average = Array.from(radaSafarisQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / radaSafarisQ1.length

    // const radaSafarisQ2 = radaSafaris.filter(e => e.quarter === 2)
    // const radaSafarisQ2Average = Array.from(radaSafarisQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / radaSafarisQ2.length

    // const radaSafarisQ3 = radaSafaris.filter(e => e.quarter === 3)
    // const radaSafarisQ3Average = Array.from(radaSafarisQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / radaSafarisQ3.length

    // const radaSafarisQ4 = radaSafaris.filter(e => e.quarter === 4)
    // const radaSafarisQ4Average = Array.from(radaSafarisQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / radaSafarisQ4.length

    //ZetuAfrica overview data filter
    // const zetuAfricaOverallAverage = Array.from(zetuAfrica, ({ objPercentage }) => Math.round(!objPercentage ? 0 : objPercentage)).reduce((a, b) => a + b, 0) / zetuAfrica.length

    // const zetuAfricaQ1 = zetuAfrica.filter(e => e.quarter === 1)
    // const zetuAfricaQ1Average = Array.from(zetuAfricaQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / zetuAfricaQ1.length

    // const zetuAfricaQ2 = zetuAfrica.filter(e => e.quarter === 2)
    // const zetuAfricaQ2Average = Array.from(zetuAfricaQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / zetuAfricaQ2.length

    // const zetuAfricaQ3 = zetuAfrica.filter(e => e.quarter === 3)
    // const zetuAfricaQ3Average = Array.from(zetuAfricaQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / zetuAfricaQ3.length

    // const zetuAfricaQ4 = zetuAfrica.filter(e => e.quarter === 4)
    // const zetuAfricaQ4Average = Array.from(zetuAfricaQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / zetuAfricaQ4.length

    //OmniGym overview data filter
    // const omniGymOverallAverage = Array.from(omniGym, ({ objPercentage }) => Math.round(!objPercentage ? 0 : objPercentage)).reduce((a, b) => a + b, 0) / omniGym.length

    // const omniGymQ1 = omniGym.filter(e => e.quarter === 1)
    // const omniGymQ1Average = Array.from(omniGymQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / omniGymQ1.length

    // const omniGymQ2 = omniGym.filter(e => e.quarter === 2)
    // const omniGymQ2Average = Array.from(omniGymQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / omniGymQ2.length

    // const omniGymQ3 = omniGym.filter(e => e.quarter === 3)
    // const omniGymQ3Average = Array.from(omniGymQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / omniGymQ3.length

    // const omniGymQ4 = omniGym.filter(e => e.quarter === 4)
    // const omniGymQ4Average = Array.from(omniGymQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / omniGymQ4.length

    //Solfix overview data filter
    // const solfixOverallAverage = Array.from(solfix, ({ objPercentage }) => Math.round(!objPercentage ? 0 : objPercentage)).reduce((a, b) => a + b, 0) / solfix.length

    // const solfixQ1 = solfix.filter(e => e.quarter === 1)
    // const solfixQ1Average = Array.from(solfixQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / solfixQ1.length

    // const solfixQ2 = solfix.filter(e => e.quarter === 2)
    // const solfixQ2Average = Array.from(solfixQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / solfixQ2.length

    // const solfixQ3 = solfix.filter(e => e.quarter === 3)
    // const solfixQ3Average = Array.from(solfixQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / solfixQ3.length

    // const solfixQ4 = solfix.filter(e => e.quarter === 4)
    // const solfixQ4Average = Array.from(solfixQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / solfixQ4.length

    //GrabGas overview data filter
    // const grabGasOverallAverage = Array.from(grabGas, ({ objPercentage }) => Math.round(!objPercentage ? 0 : objPercentage)).reduce((a, b) => a + b, 0) / grabGas.length

    // const grabGasQ1 = grabGas.filter(e => e.quarter === 1)
    // const grabGasQ1Average = Array.from(grabGasQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / grabGasQ1.length

    // const grabGasQ2 = grabGas.filter(e => e.quarter === 2)
    // const grabGasQ2Average = Array.from(grabGasQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / grabGasQ2.length

    // const grabGasQ3 = grabGas.filter(e => e.quarter === 3)
    // const grabGasQ3Average = Array.from(grabGasQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / grabGasQ3.length

    // const grabGasQ4 = grabGas.filter(e => e.quarter === 4)
    // const grabGasQ4Average = Array.from(grabGasQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / grabGasQ4.length
    
    //Devine overview data filter
    // const devineOverallAverage = Array.from(devine, ({ objPercentage }) => Math.round(!objPercentage ? 0 : objPercentage)).reduce((a, b) => a + b, 0) / devine.length

    // const devineQ1 = devine.filter(e => e.quarter === 1)
    // const devineQ1Average = Array.from(devineQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / devineQ1.length

    // const devineQ2 = devine.filter(e => e.quarter === 2)
    // const devineQ2Average = Array.from(devineQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / devineQ2.length

    // const devineQ3 = devine.filter(e => e.quarter === 3)
    // const devineQ3Average = Array.from(devineQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / devineQ3.length

    // const devineQ4 = devine.filter(e => e.quarter === 4)
    // const devineQ4Average = Array.from(devineQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / devineQ4.length

    //Onetope overview data filter
    // const onetopeOverallAverage = Array.from(onetope, ({ objPercentage }) => Math.round(!objPercentage ? 0 : objPercentage)).reduce((a, b) => a + b, 0) / onetope.length

    // const onetopeQ1 = onetope.filter(e => e.quarter === 1)
    // const onetopeQ1Average = Array.from(onetopeQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / onetopeQ1.length

    // const onetopeQ2 = onetope.filter(e => e.quarter === 2)
    // const onetopeQ2Average = Array.from(onetopeQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / onetopeQ2.length

    // const onetopeQ3 = onetope.filter(e => e.quarter === 3)
    // const onetopeQ3Average = Array.from(onetopeQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / onetopeQ3.length

    // const onetopeQ4 = onetope.filter(e => e.quarter === 4)
    // const onetopeQ4Average = Array.from(onetopeQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / onetopeQ4.length

    //FastMere overview data filter
    // const fastMereOverallAverage = Array.from(fastMere, ({ objPercentage }) => Math.round(!objPercentage ? 0 : objPercentage)).reduce((a, b) => a + b, 0) / fastMere.length

    // const fastMereQ1 = fastMere.filter(e => e.quarter === 1)
    // const fastMereQ1Average = Array.from(fastMereQ1, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / fastMereQ1.length

    // const fastMereQ2 = fastMere.filter(e => e.quarter === 2)
    // const fastMereQ2Average = Array.from(fastMereQ2, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / fastMereQ2.length

    // const fastMereQ3 = fastMere.filter(e => e.quarter === 3)
    // const fastMereQ3Average = Array.from(fastMereQ3, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / fastMereQ3.length

    // const fastMereQ4 = fastMere.filter(e => e.quarter === 4)
    // const fastMereQ4Average = Array.from(fastMereQ4, ({ objPercentage }) => Math.round(objPercentage)).reduce((a, b) => a + b, 0) / fastMereQ4.length
    
    // console.log(omniGymOverallAverage)
    return (
        <div className="admin-main">
            <div className="admin-overview">
                <div className="admin-overview-row">
                    <Qiribu
                        overrall={qiribuOverallAverage}
                        Q1={QiribuQ1Average}
                        Q2={QiribuQ2Average}
                        Q3={QiribuQ3Average}
                        Q4={QiribuQ4Average}
                        username={catalyzer[0].username}
                    />
                    {/* <InoveLabs
                        overrall={inoveLabsOverallAverage}
                        Q1={inoveLabsQ1Average}
                        Q2={inoveLabsQ2Average}
                        Q3={inoveLabsQ3Average}
                        Q4={inoveLabsQ4Average}
                        username={catalyzer[1].username}
                    />
                    <Isharc
                        overrall={isharcOverallAverage}
                        Q1={isharcQ1Average}
                        Q2={isharcQ2Average}
                        Q3={isharcQ3Average}
                        Q4={isharcQ4Average}
                        username={catalyzer[2].username}
                    />
                    <SocialClark
                        overrall={socialClarkOverallAverage}
                        Q1={socialClarkQ1Average}
                        Q2={socialClarkQ2Average}
                        Q3={socialClarkQ3Average}
                        Q4={socialClarkQ4Average}
                        username={catalyzer[3].username}
                    />
                    <Figurines
                        overrall={figurinesOverallAverage}
                        Q1={figurinesQ1Average}
                        Q2={figurinesQ2Average}
                        Q3={figurinesQ3Average}
                        Q4={figurinesQ4Average}
                        username={catalyzer[4].username}
                    />
                    <RadaSafaris
                        overrall={radaSafarisOverallAverage}
                        Q1={radaSafarisQ1Average}
                        Q2={radaSafarisQ2Average}
                        Q3={radaSafarisQ3Average}
                        Q4={radaSafarisQ4Average}
                        username={catalyzer[5].username}
                    />
                    <ZetuAfrica
                        overrall={zetuAfricaOverallAverage}
                        Q1={zetuAfricaQ1Average}
                        Q2={zetuAfricaQ2Average}
                        Q3={zetuAfricaQ3Average}
                        Q4={zetuAfricaQ4Average}
                        username={catalyzer[6].username}
                    />
                    <OminGym
                        overrall={omniGymOverallAverage}
                        Q1={omniGymQ1Average}
                        Q2={omniGymQ2Average}
                        Q3={omniGymQ3Average}
                        Q4={omniGymQ4Average}
                        username={catalyzer[7].username}
                    />
                    <Solfix
                        overrall={solfixOverallAverage}
                        Q1={solfixQ1Average}
                        Q2={solfixQ2Average}
                        Q3={solfixQ3Average}
                        Q4={solfixQ4Average}
                        username={catalyzer[9].username}
                    />
                    <GrabGas
                        overrall={grabGasOverallAverage}
                        Q1={grabGasQ1Average}
                        Q2={grabGasQ2Average}
                        Q3={grabGasQ3Average}
                        Q4={grabGasQ4Average}
                        username={catalyzer[10].username}
                    />
                    <Devine
                        overrall={devineOverallAverage}
                        Q1={devineQ1Average}
                        Q2={devineQ2Average}
                        Q3={devineQ3Average}
                        Q4={devineQ4Average}
                        username={catalyzer[13].username}
                    />
                    <Onestope
                        overrall={onetopeOverallAverage}
                        Q1={onetopeQ1Average}
                        Q2={onetopeQ2Average}
                        Q3={onetopeQ3Average}
                        Q4={onetopeQ4Average}
                        username={catalyzer[14].username}
                    />
                    <Fastmere
                        overrall={fastMereOverallAverage}
                        Q1={fastMereQ1Average}
                        Q2={fastMereQ2Average}
                        Q3={fastMereQ3Average}
                        Q4={fastMereQ4Average}
                        username={catalyzer[15].username}
                    /> */}
                </div>
           </div>
        </div>
    )
}

export default Overview
