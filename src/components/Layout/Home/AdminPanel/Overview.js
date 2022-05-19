import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import * as actionCreators from '../../../store/actionCreators'
import { Progress } from 'antd'
import ModalUI from '../../../ModalUI'
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
const Overview = (props) => {

    const [expireTime, setexpireTime] = useState(false)

    const { tokenExpiration} = useSelector(state => state.auth)
    const { users } = useSelector(state => state.admin)
    const { all_objectives } = useSelector(state => state.admin)

    const dispatch = useDispatch()
    const current_date = Date.now()

    const objectives = () =>  dispatch(actionCreators.getAllObjectives())

    const handleLogoutClick = () => {
        dispatch(actionCreators.removeUser())
        props.history.push('/')
    }

    useEffect(() => {
        if (current_date >= tokenExpiration) {
            return setexpireTime(true)
        }
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

    // console.log(qiribu)
    
    
    
    
    //Qiribu overview data filter
    const qiribuOverrallPercentage = qiribu && qiribu.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / qiribu.length
    
    const QiribuQ1 = qiribu.filter(e => e.quarter === 1)
    const QiribuQ1Percentage = QiribuQ1 && QiribuQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / QiribuQ1.length
    const qiribuQ1Changes = QiribuQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const qiribuQ1Complete = QiribuQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length
    
    const QiribuQ2 = qiribu.filter(e => e.quarter === 2)
    const QiribuQ2Percentage = QiribuQ2 && QiribuQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / QiribuQ2.length
    const qiribuQ2Changes = QiribuQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const qiribuQ2Complete = QiribuQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length
    
    const QiribuQ3 = qiribu.filter(e => e.quarter === 3)
    const QiribuQ3Percentage = QiribuQ3 && QiribuQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / QiribuQ3.length
    const qiribuQ3Changes = QiribuQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const qiribuQ3Complete = QiribuQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length
  
    const QiribuQ4 = qiribu.filter(e => e.quarter === 4)
    const QiribuQ4Percentage = QiribuQ4 && QiribuQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / QiribuQ4.length
    const qiribuQ4Changes = QiribuQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const qiribuQ4Complete = QiribuQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length
    
    //InoveLabs overview data filter
    const inoveLabsOverrallPercentage = inoveLabs && inoveLabs.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / inoveLabs.length
    
    const inoveLabsQ1 = inoveLabs.filter(e => e.quarter === 1)
    const inoveLabsQ1Percentage = inoveLabsQ1 && inoveLabsQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / inoveLabsQ1.length
    const inoveLabsQ1Changes = inoveLabsQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const inoveLabsQ1Complete = inoveLabsQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length
    
    const inoveLabsQ2 = inoveLabs.filter(e => e.quarter === 2)
    const inoveLabsQ2Percentage = inoveLabsQ2 && inoveLabsQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / inoveLabsQ2.length
    const inoveLabsQ2Changes = inoveLabsQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const inoveLabsQ2Complete = inoveLabsQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length
    
    const inoveLabsQ3 = inoveLabs.filter(e => e.quarter === 3)
    const inoveLabsQ3Percentage = inoveLabsQ3 && inoveLabsQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / inoveLabsQ3.length
    const inoveLabsQ3Changes = inoveLabsQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const inoveLabsQ3Complete = inoveLabsQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length
    
    const inoveLabsQ4 = inoveLabs.filter(e => e.quarter === 4)
    const inoveLabsQ4Percentage = inoveLabsQ4 && inoveLabsQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / inoveLabsQ4.length
    const inoveLabsQ4Changes = inoveLabsQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const inoveLabsQ4Complete = inoveLabsQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length
    
    // Isharc overview data filter
    const isharcOverrallPercentage = isharc && isharc.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / isharc.length
    
    const isharcQ1 = isharc.filter(e => e.quarter === 1)
    const isharcQ1Percentage = isharcQ1 && isharcQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / isharcQ1.length
    const isharcQ1Changes = isharcQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const isharcQ1Complete = isharcQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length
    
    const isharcQ2 = isharc.filter(e => e.quarter === 2)
    const isharcQ2Percentage = isharcQ2 && isharcQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / isharcQ2.length
    const isharcQ2Changes = isharcQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const isharcQ2Complete = isharcQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const isharcQ3 = isharc.filter(e => e.quarter === 3)
    const isharcQ3Percentage = isharcQ3 && isharcQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / isharcQ3.length
    const isharcQ3Changes = isharcQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const isharcQ3Complete = isharcQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const isharcQ4 = isharc.filter(e => e.quarter === 4)
    const isharcQ4Percentage = isharcQ4 && isharcQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / isharcQ4.length
    const isharcQ4Changes = isharcQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const isharcQ4Complete = isharcQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    // SocialClark overview data filter
    const socialClarkOverrallPercentage = socialClark && socialClark.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / socialClark.length
    
    const socialClarkQ1 = socialClark.filter(e => e.quarter === 1)
    const socialClarkQ1Percentage = socialClarkQ1 && socialClarkQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / socialClarkQ1.length
    const socialClarkQ1Changes = socialClarkQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const socialClarkQ1Complete = socialClarkQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const socialClarkQ2 = socialClark.filter(e => e.quarter === 2)
    const socialClarkQ2Percentage = socialClarkQ2 && socialClarkQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / socialClarkQ2.length
    const socialClarkQ2Changes = socialClarkQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const socialClarkQ2Complete = socialClarkQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const socialClarkQ3 = socialClark.filter(e => e.quarter === 3)
    const socialClarkQ3Percentage = socialClarkQ3 && socialClarkQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / socialClarkQ3.length
    const socialClarkQ3Changes = socialClarkQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const socialClarkQ3Complete = socialClarkQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const socialClarkQ4 = socialClark.filter(e => e.quarter === 4)
    const socialClarkQ4Percentage = socialClarkQ4 && socialClarkQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / socialClarkQ4.length
    const socialClarkQ4Changes = socialClarkQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const socialClarkQ4Complete = socialClarkQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    // Figurines overview data filter
    const figurinesOverrallPercentage = figurines && figurines.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / figurines.length
    
    const figurinesQ1 = figurines.filter(e => e.quarter === 1)
    const figurinesQ1Percentage = figurinesQ1 && figurinesQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / figurinesQ1.length
    const figurinesQ1Changes = figurinesQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const figurinesQ1Complete = figurinesQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length
    
    const figurinesQ2 = figurines.filter(e => e.quarter === 2)
    const figurinesQ2Percentage = figurinesQ2 && figurinesQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / figurinesQ2.length 
    const figurinesQ2Changes = figurinesQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const figurinesQ2Complete = figurinesQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length
    
    const figurinesQ3 = figurines.filter(e => e.quarter === 3)
    const figurinesQ3Percentage = figurinesQ3 && figurinesQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / figurinesQ3.length
    const figurinesQ3Changes = figurinesQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const figurinesQ3Complete = figurinesQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const figurinesQ4 = figurines.filter(e => e.quarter === 4)
    const figurinesQ4Percentage = figurinesQ4 && figurinesQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / figurinesQ4.length
    const figurinesQ4Changes = figurinesQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const figurinesQ4Complete = figurinesQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    // RadaSafaris overview data filter
    const radaSafarisOverrallPercentage = radaSafaris && radaSafaris.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / radaSafaris.length

    const radaSafarisQ1 = radaSafaris.filter(e => e.quarter === 1)
    const radaSafarisQ1Percentage = radaSafarisQ1 && radaSafarisQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / radaSafarisQ1.length
    const radaSafarisQ1Changes = radaSafarisQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const radaSafarisQ1Complete = radaSafarisQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const radaSafarisQ2 = radaSafaris.filter(e => e.quarter === 2)
    const radaSafarisQ2Percentage = radaSafarisQ2 && radaSafarisQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / radaSafarisQ2.length
    const radaSafarisQ2Changes = radaSafarisQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const radaSafarisQ2Complete = radaSafarisQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const radaSafarisQ3 = radaSafaris.filter(e => e.quarter === 3)
    const radaSafarisQ3Percentage = radaSafarisQ3 && radaSafarisQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / radaSafarisQ3.length
    const radaSafarisQ3Changes = radaSafarisQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const radaSafarisQ3Complete = radaSafarisQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const radaSafarisQ4 = radaSafaris.filter(e => e.quarter === 4)
    const radaSafarisQ4Percentage = radaSafarisQ4 && radaSafarisQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / radaSafarisQ4.length
    const radaSafarisQ4Changes = radaSafarisQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const radaSafarisQ4Complete = radaSafarisQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    // ZetuAfrica overview data filter
    const zetuAfricaOverrallPercentage = zetuAfrica && zetuAfrica.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / zetuAfrica.length

    const zetuAfricaQ1 = zetuAfrica.filter(e => e.quarter === 1)
    const zetuAfricaQ1Percentage = zetuAfricaQ1 && zetuAfricaQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / zetuAfricaQ1.length
    const zetuAfricaQ1Changes = zetuAfricaQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const zetuAfricaQ1Complete = zetuAfricaQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const zetuAfricaQ2 = zetuAfrica.filter(e => e.quarter === 2)
    const zetuAfricaQ2Percentage = zetuAfricaQ2 && zetuAfricaQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / zetuAfricaQ2.length
    const zetuAfricaQ2Changes = zetuAfricaQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const zetuAfricaQ2Complete = zetuAfricaQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const zetuAfricaQ3 = zetuAfrica.filter(e => e.quarter === 3)
    const zetuAfricaQ3Percentage = zetuAfricaQ3 && zetuAfricaQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / zetuAfricaQ3.length
    const zetuAfricaQ3Changes = zetuAfricaQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const zetuAfricaQ3Complete = zetuAfricaQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const zetuAfricaQ4 = zetuAfrica.filter(e => e.quarter === 4)
    const zetuAfricaQ4Percentage = zetuAfricaQ4 && zetuAfricaQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / zetuAfricaQ4.length
    const zetuAfricaQ4Changes = zetuAfricaQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const zetuAfricaQ4Complete = zetuAfricaQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    // OmniGym overview data filter
    const omniGymOverrallPercentage = omniGym && omniGym.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / omniGym.length

    const omniGymQ1 = omniGym.filter(e => e.quarter === 1)
    const omniGymQ1Percentage = omniGymQ1 && omniGymQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / omniGymQ1.length
    const omniGymQ1Changes = omniGymQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const omniGymQ1Complete = omniGymQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const omniGymQ2 = omniGym.filter(e => e.quarter === 2)
    const omniGymQ2Percentage = omniGymQ2 && omniGymQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / omniGymQ2.length
    const omniGymQ2Changes = omniGymQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const omniGymQ2Complete = omniGymQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const omniGymQ3 = omniGym.filter(e => e.quarter === 3)
    const omniGymQ3Percentage = omniGymQ3 && omniGymQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / omniGymQ3.length
    const omniGymQ3Changes = omniGymQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const omniGymQ3Complete = omniGymQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const omniGymQ4 = omniGym.filter(e => e.quarter === 4)
    const omniGymQ4Percentage = omniGymQ4 && omniGymQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / omniGymQ4.length
    const omniGymQ4Changes = omniGymQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const omniGymQ4Complete = omniGymQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    // Solfix overview data filter
    const solfixOverrallPercentage = solfix && solfix.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / solfix.length

    const solfixQ1 = solfix.filter(e => e.quarter === 1)
    const solfixQ1Percentage = solfixQ1 && solfixQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / solfixQ1.length
    const solfixQ1Changes = solfixQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const solfixQ1Complete = solfixQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const solfixQ2 = solfix.filter(e => e.quarter === 2)
    const solfixQ2Percentage = solfixQ2 && solfixQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / solfixQ2.length
    const solfixQ2Changes = solfixQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const solfixQ2Complete = solfixQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const solfixQ3 = solfix.filter(e => e.quarter === 3)
    const solfixQ3Percentage = solfixQ3 && solfixQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / solfixQ3.length
    const solfixQ3Changes = solfixQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const solfixQ3Complete = solfixQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const solfixQ4 = solfix.filter(e => e.quarter === 4)
    const solfixQ4Percentage = solfixQ4 && solfixQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / solfixQ4.length
    const solfixQ4Changes = solfixQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const solfixQ4Complete = solfixQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    // GrabGas overview data filter
    const grabGasOverrallPercentage = grabGas && grabGas.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / grabGas.length

    const grabGasQ1 = grabGas.filter(e => e.quarter === 1)
    const grabGasQ1Percentage = grabGasQ1 && grabGasQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / grabGasQ1.length
    const grabGasQ1Changes = grabGasQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const grabGasQ1Complete = grabGasQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const grabGasQ2 = grabGas.filter(e => e.quarter === 2)
    const grabGasQ2Percentage = grabGasQ2 && grabGasQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / grabGasQ2.length
    const grabGasQ2Changes = grabGasQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const grabGasQ2Complete = grabGasQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const grabGasQ3 = grabGas.filter(e => e.quarter === 3)
    const grabGasQ3Percentage = grabGasQ3 && grabGasQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / grabGasQ3.length
    const grabGasQ3Changes = grabGasQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const grabGasQ3Complete = grabGasQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const grabGasQ4 = grabGas.filter(e => e.quarter === 4)
    const grabGasQ4Percentage = grabGasQ4 && grabGasQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / grabGasQ4.length
    const grabGasQ4Changes = grabGasQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const grabGasQ4Complete = grabGasQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    // Devine overview data filter
    const devineOverrallPercentage = devine && devine.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / devine.length

    const devineQ1 = devine.filter(e => e.quarter === 1)
    const devineQ1Percentage = devineQ1 && devineQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / devineQ1.length
    const devineQ1Changes = devineQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const devineQ1Complete = devineQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const devineQ2 = devine.filter(e => e.quarter === 2)
    const devineQ2Percentage = devineQ2 && devineQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / devineQ2.length
    const devineQ2Changes = devineQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const devineQ2Complete = devineQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const devineQ3 = devine.filter(e => e.quarter === 3)
    const devineQ3Percentage = devineQ3 && devineQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / devineQ3.length
    const devineQ3Changes = devineQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const devineQ3Complete = devineQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const devineQ4 = devine.filter(e => e.quarter === 4)
    const devineQ4Percentage = devineQ4 && devineQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / devineQ4.length
    const devineQ4Changes = devineQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const devineQ4Complete = devineQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    // Onetope overview data filter
    const onetopeOverrallPercentage = onetope && onetope.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / onetope.length

    const onetopeQ1 = onetope.filter(e => e.quarter === 1)
    const onetopeQ1Percentage = onetopeQ1 && onetopeQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / onetopeQ1.length
    const onetopeQ1Changes = onetopeQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const onetopeQ1Complete = onetopeQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const onetopeQ2 = onetope.filter(e => e.quarter === 2)
    const onetopeQ2Percentage = onetopeQ2 && onetopeQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / onetopeQ2.length
    const onetopeQ2Changes = onetopeQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const onetopeQ2Complete = onetopeQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const onetopeQ3 = onetope.filter(e => e.quarter === 3)
    const onetopeQ3Percentage = onetopeQ3 && onetopeQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / onetopeQ3.length
    const onetopeQ3Changes = onetopeQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const onetopeQ3Complete = onetopeQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const onetopeQ4 = onetope.filter(e => e.quarter === 4)
    const onetopeQ4Percentage = onetopeQ4 && onetopeQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / onetopeQ4.length
    const onetopeQ4Changes = onetopeQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const onetopeQ4Complete = onetopeQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    // FastMere overview data filter
    const fastMereOverrallPercentage = fastMere && fastMere.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / fastMere.length

    const fastMereQ1 = fastMere.filter(e => e.quarter === 1)
    const fastMereQ1Percentage = fastMereQ1 && fastMereQ1.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / fastMereQ1.length
    const fastMereQ1Changes = fastMereQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const fastMereQ1Complete = fastMereQ1.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const fastMereQ2 = fastMere.filter(e => e.quarter === 2)
    const fastMereQ2Percentage = fastMereQ2 && fastMereQ2.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / fastMereQ2.length
    const fastMereQ2Changes = fastMereQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const fastMereQ2Complete = fastMereQ2.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const fastMereQ3 = fastMere.filter(e => e.quarter === 3)
    const fastMereQ3Percentage = fastMereQ3 && fastMereQ3.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / fastMereQ3.length
    const fastMereQ3Changes = fastMereQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const fastMereQ3Complete = fastMereQ3.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    const fastMereQ4 = fastMere.filter(e => e.quarter === 4)
    const fastMereQ4Percentage = fastMereQ4 && fastMereQ4.map(e => !e.objPercentage ? 0 : e.objPercentage).reduce((a, b) => a + b, 0) / fastMereQ4.length
    const fastMereQ4Changes = fastMereQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.update === true).length
    const fastMereQ4Complete = fastMereQ4.flatMap(({ keyresults }) => keyresults).filter(e => e.measureOfSuccess === '100').length

    return (
        <div className="admin-main">
            {expireTime ?
                <ModalUI>
                    <div className="edit-card">
                        <h5>Session timeout please login again</h5>
                        <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                    </div>
                </ModalUI>
                : null}
            <div className="admin-overview">
                <div className="admin-overview-row">
                    <Qiribu
                        overrall={qiribuOverrallPercentage}
                        Q1={QiribuQ1Percentage}
                        Q2={QiribuQ2Percentage}
                        Q3={QiribuQ3Percentage}
                        Q4={QiribuQ4Percentage}
                        username={catalyzer[0].username}
                        Q1update={qiribuQ1Changes}
                        Q2update={qiribuQ2Changes}
                        Q3update={qiribuQ3Changes}
                        Q4update={qiribuQ4Changes}
                        Q1complete={qiribuQ1Complete}
                        Q2complete={qiribuQ2Complete}
                        Q3complete={qiribuQ3Complete}
                        Q4complete={qiribuQ4Complete}
                    />
                    <InoveLabs
                        overrall={inoveLabsOverrallPercentage}
                        Q1={inoveLabsQ1Percentage}
                        Q2={inoveLabsQ2Percentage}
                        Q3={inoveLabsQ3Percentage}
                        Q4={inoveLabsQ4Percentage}
                        username={catalyzer[1].username}
                        Q1update={inoveLabsQ1Changes}
                        Q2update={inoveLabsQ2Changes}
                        Q3update={inoveLabsQ3Changes}
                        Q4update={inoveLabsQ4Changes}
                        Q1complete={inoveLabsQ1Complete}
                        Q2complete={inoveLabsQ2Complete}
                        Q3complete={inoveLabsQ3Complete}
                        Q4complete={inoveLabsQ4Complete}
                    />
                    <Isharc
                        overrall={isharcOverrallPercentage}
                        Q1={isharcQ1Percentage}
                        Q2={isharcQ2Percentage}
                        Q3={isharcQ3Percentage}
                        Q4={isharcQ4Percentage}
                        username={catalyzer[2].username}
                        Q1update={isharcQ1Changes}
                        Q2update={isharcQ2Changes}
                        Q3update={isharcQ3Changes}
                        Q4update={isharcQ4Changes}
                        Q1complete={isharcQ1Complete}
                        Q2complete={isharcQ2Complete}
                        Q3complete={isharcQ3Complete}
                        Q4complete={isharcQ4Complete}
                    />
                    <SocialClark
                        overrall={socialClarkOverrallPercentage}
                        Q1={socialClarkQ1Percentage}
                        Q2={socialClarkQ2Percentage}
                        Q3={socialClarkQ3Percentage}
                        Q4={socialClarkQ4Percentage}
                        username={catalyzer[3].username}
                        Q1update={socialClarkQ1Changes}
                        Q2update={socialClarkQ2Changes}
                        Q3update={socialClarkQ3Changes}
                        Q4update={socialClarkQ4Changes}
                        Q1complete={socialClarkQ1Complete}
                        Q2complete={socialClarkQ2Complete}
                        Q3complete={socialClarkQ3Complete}
                        Q4complete={socialClarkQ4Complete}
                    />
                    <Figurines
                        overrall={figurinesOverrallPercentage}
                        Q1={figurinesQ1Percentage}
                        Q2={figurinesQ2Percentage}
                        Q3={figurinesQ3Percentage}
                        Q4={figurinesQ4Percentage}
                        username={catalyzer[4].username}
                        Q1update={figurinesQ1Changes}
                        Q2update={figurinesQ2Changes}
                        Q3update={figurinesQ3Changes}
                        Q4update={figurinesQ4Changes}
                        Q1complete={figurinesQ1Complete}
                        Q2complete={figurinesQ2Complete}
                        Q3complete={figurinesQ3Complete}
                        Q4complete={figurinesQ4Complete}
                    />
                    <RadaSafaris
                        overrall={radaSafarisOverrallPercentage}
                        Q1={radaSafarisQ1Percentage}
                        Q2={radaSafarisQ2Percentage}
                        Q3={radaSafarisQ3Percentage}
                        Q4={radaSafarisQ4Percentage}
                        username={catalyzer[5].username}
                        Q1update={radaSafarisQ1Changes}
                        Q2update={radaSafarisQ2Changes}
                        Q3update={radaSafarisQ3Changes}
                        Q4update={radaSafarisQ4Changes}
                        Q1complete={radaSafarisQ1Complete}
                        Q2complete={radaSafarisQ2Complete}
                        Q3complete={radaSafarisQ3Complete}
                        Q4complete={radaSafarisQ4Complete}
                    />
                    <ZetuAfrica
                        overrall={zetuAfricaOverrallPercentage}
                        Q1={zetuAfricaQ1Percentage}
                        Q2={zetuAfricaQ2Percentage}
                        Q3={zetuAfricaQ3Percentage}
                        Q4={zetuAfricaQ4Percentage}
                        username={catalyzer[6].username}
                        Q1update={zetuAfricaQ1Changes}
                        Q2update={zetuAfricaQ2Changes}
                        Q3update={zetuAfricaQ3Changes}
                        Q4update={zetuAfricaQ4Changes}
                        Q1complete={zetuAfricaQ1Complete}
                        Q2complete={zetuAfricaQ2Complete}
                        Q3complete={zetuAfricaQ3Complete}
                        Q4complete={zetuAfricaQ4Complete}
                    />
                    <OminGym
                        overrall={omniGymOverrallPercentage}
                        Q1={omniGymQ1Percentage}
                        Q2={omniGymQ2Percentage}
                        Q3={omniGymQ3Percentage}
                        Q4={omniGymQ4Percentage}
                        username={catalyzer[7].username}
                        Q1update={omniGymQ1Changes}
                        Q2update={omniGymQ2Changes}
                        Q3update={omniGymQ3Changes}
                        Q4update={omniGymQ4Changes}
                        Q1complete={omniGymQ1Complete}
                        Q2complete={omniGymQ2Complete}
                        Q3complete={omniGymQ3Complete}
                        Q4complete={omniGymQ4Complete}
                    />
                    <Solfix
                        overrall={solfixOverrallPercentage}
                        Q1={solfixQ1Percentage}
                        Q2={solfixQ2Percentage}
                        Q3={solfixQ3Percentage}
                        Q4={solfixQ4Percentage}
                        username={catalyzer[9].username}
                        Q1update={solfixQ1Changes}
                        Q2update={solfixQ2Changes}
                        Q3update={solfixQ3Changes}
                        Q4update={solfixQ4Changes}
                        Q1complete={solfixQ1Complete}
                        Q2complete={solfixQ2Complete}
                        Q3complete={solfixQ3Complete}
                        Q4complete={solfixQ4Complete}
                    />
                    <GrabGas
                        overrall={grabGasOverrallPercentage}
                        Q1={grabGasQ1Percentage}
                        Q2={grabGasQ2Percentage}
                        Q3={grabGasQ3Percentage}
                        Q4={grabGasQ4Percentage}
                        username={catalyzer[10].username}
                        Q1update={grabGasQ1Changes}
                        Q2update={grabGasQ2Changes}
                        Q3update={grabGasQ3Changes}
                        Q4update={grabGasQ4Changes}
                        Q1complete={grabGasQ1Complete}
                        Q2complete={grabGasQ2Complete}
                        Q3complete={grabGasQ3Complete}
                        Q4complete={grabGasQ4Complete}
                    />
                    <Devine
                        overrall={devineOverrallPercentage}
                        Q1={devineQ1Percentage}
                        Q2={devineQ2Percentage}
                        Q3={devineQ3Percentage}
                        Q4={devineQ4Percentage}
                        username={catalyzer[13].username}
                        Q1update={devineQ1Changes}
                        Q2update={devineQ2Changes}
                        Q3update={devineQ3Changes}
                        Q4update={devineQ4Changes}
                        Q1complete={devineQ1Complete}
                        Q2complete={devineQ2Complete}
                        Q3complete={devineQ3Complete}
                        Q4complete={devineQ4Complete}
                    />
                    <Onestope
                        overrall={onetopeOverrallPercentage}
                        Q1={onetopeQ1Percentage}
                        Q2={onetopeQ2Percentage}
                        Q3={onetopeQ3Percentage}
                        Q4={onetopeQ4Percentage}
                        username={catalyzer[14].username}
                        Q1update={onetopeQ1Changes}
                        Q2update={onetopeQ2Changes}
                        Q3update={onetopeQ3Changes}
                        Q4update={onetopeQ4Changes}
                        Q1complete={onetopeQ1Complete}
                        Q2complete={onetopeQ2Complete}
                        Q3complete={onetopeQ3Complete}
                        Q4complete={onetopeQ4Complete}
                    />
                    <Fastmere
                        overrall={fastMereOverrallPercentage}
                        Q1={fastMereQ1Percentage}
                        Q2={fastMereQ2Percentage}
                        Q3={fastMereQ3Percentage}
                        Q4={fastMereQ4Percentage}
                        username={catalyzer[15].username}
                        Q1update={fastMereQ1Changes}
                        Q2update={fastMereQ2Changes}
                        Q3update={fastMereQ3Changes}
                        Q4update={fastMereQ4Changes}
                        Q1complete={fastMereQ1Complete}
                        Q2complete={fastMereQ2Complete}
                        Q3complete={fastMereQ3Complete}
                        Q4complete={fastMereQ4Complete}
                    />
                </div>
           </div>
        </div>
    )
}

export default Overview
