import React,{useRef, useState} from 'react'
import logo from '../../../assets/images/logo.png'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'

import './Content.css'
const Content = () =>  {

    const data = [
        {
            id:1,
            image: logo,
            header:'Short notes on IP and patents for startups',
            desc: 'A patent is “the exclusive right granted by a government to an inventor to manufacture, use, or sell an invention for a certain number of years”. Startup founders often look at a patent as what will protect them from competition. Does a patent really protect you, and if yes, how and in what cases ? Let’s dive in ! ',
            link:'http://192.168.8.102/index.php/2022/03/16/patents/'
        },
        {
            id: 2,
            image: logo,
            header: 'Become Rolex-profitable! ',
            desc: 'Y Combinators founder Paul Graham coined the term “ramen profitable” - meaning that a start-up is making just enough money to pay the founders\' living expenses(only eating cheap ramen noodles).',
            link:'http://192.168.8.102/index.php/2022/03/16/patents/'
        },
        {
            id: 3,
            image: logo,
            header: 'What is Prioritization',
            desc: 'The disciplined process of evaluating the relative importance of work, ideas, and requests to eliminate wasteful practices and deliver value in the quickest possible way, given a variety of constraints.',
            link:'http://192.168.8.102/index.php/2022/03/16/patents/'
        },
        {
            id: 4,
            image: logo,
            header: 'What is a business model?',
            desc: 'According to Peter Drucker, a business model, is a detailed description of who the customer is, the value that they desire and how this value can be delivered at an appropriate cost.  ',
            link:'http://192.168.8.102/index.php/2022/03/16/patents/'
        },
        {
            id: 5,
            image: logo,
            header: 'THE ART OF BARGAINING AND NEGOTIATING ',
            desc: 'Bargaining and negotiation is a skill that most people don’t have while to other people, it comes out naturally either by experience or by learning the art. Sometimes it is a psychological skill that aims at de-campaigning someone\'s position and convincing someone to buy your perspective and come to a common agreement.',
            link:'http://192.168.8.102/index.php/2022/03/16/patents/'
        },
        {
            id: 6,
            image: logo,
            header: 'THE ART OF BARGAINING AND NEGOTIATING ',
            desc: 'Bargaining and negotiation is a skill that most people don’t have while to other people, it comes out naturally either by experience or by learning the art. Sometimes it is a psychological skill that aims at de-campaigning someone\'s position and convincing someone to buy your perspective and come to a common agreement.',
            link: 'http://192.168.8.102/index.php/2022/03/16/patents/'
        }
        ,
        {
            id: 7,
            image: logo,
            header: 'THE ART OF BARGAINING AND NEGOTIATING ',
            desc: 'Bargaining and negotiation is a skill that most people don’t have while to other people, it comes out naturally either by experience or by learning the art. Sometimes it is a psychological skill that aims at de-campaigning someone\'s position and convincing someone to buy your perspective and come to a common agreement.',
            link: 'http://192.168.8.102/index.php/2022/03/16/patents/'
        }
    ]

    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [visible4, setVisible4] = useState(false)
    const [visible5, setVisible5] = useState(false)

    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const ref4 = useRef(null)
    const ref5 = useRef(null)

    const scroll1 = (scrollOffset) => {
        ref1.current.scrollLeft += scrollOffset
        if ((ref1.current.scrollLeft += scrollOffset) >= 300) setVisible1(true)
        if ((ref1.current.scrollLeft += scrollOffset) <= 10) setVisible1(false)
    }

    const scroll2 = (scrollOffset) => {
        ref2.current.scrollLeft += scrollOffset
        if ((ref2.current.scrollLeft += scrollOffset) >= 300) setVisible2(true)
        if ((ref2.current.scrollLeft += scrollOffset) <= 10) setVisible2(false)
    }

    const scroll3 = (scrollOffset) => {
        ref3.current.scrollLeft += scrollOffset
        if ((ref3.current.scrollLeft += scrollOffset) >= 300) setVisible3(true)
        if ((ref3.current.scrollLeft += scrollOffset) <= 10) setVisible3(false)
    }

    const scroll4 = (scrollOffset) => {
        ref4.current.scrollLeft += scrollOffset
        if ((ref4.current.scrollLeft += scrollOffset) >= 300) setVisible4(true)
        if ((ref4.current.scrollLeft += scrollOffset) <= 10) setVisible4(false)
    }

    const scroll5 = (scrollOffset) => {
        ref5.current.scrollLeft += scrollOffset
        if ((ref5.current.scrollLeft += scrollOffset) >= 300) setVisible5(true)
        if ((ref5.current.scrollLeft += scrollOffset) <= 10) setVisible5(false)
    }


  return (
      <div id="div" className="content-container">
          <div className="content-menu">
              <div className="scroll-column">
                  <h2>Legal and Admin</h2>
                <div className="scroll-row">
                    {!visible1 ? null : <ArrowCircleLeftIcon onClick={() => scroll1(-50)} className="scroll-icons" style={{ color: '#333', fontSize: '30px' }} />}
                    <div className="scroll-container" ref={ref1}>
                          {data.map(r => (
                              <div className="scroll-content">
                                  <div className="scroll-content-header">
                                      <h2>{r.header}</h2>
                                      <img src={r.image} alt="logo" />
                                  </div>
                                  <div className="scroll-desc">
                                      <h5>{r.desc.substring(0, 100) + '.....'}</h5>
                                  </div>
                                  <a href={r.link} target="_blank">More</a>
                              </div>
                          ))}
                    </div>
                      {!visible1 ? <ArrowCircleRightIcon onClick={() => scroll1(50)} className="scroll-icons" style={{ color: '#333', fontSize: '30px' }} /> : null}
                </div>
              </div>
              <div className="scroll-column">
                  <h2>Business Modeling</h2>
                  <div className="scroll-row">
                      {!visible2 ? null : <ArrowCircleLeftIcon onClick={() => scroll2(-50)} className="scroll-icons" style={{ color: '#333', fontSize: '30px' }} />}
                      <div className="scroll-container" ref={ref2}>
                          {data.map(r => (
                              <div className="scroll-content">
                                  <div className="scroll-content-header">
                                      <h3>{r.header}</h3>
                                      <img src={r.image} alt="logo" />
                                  </div>
                                  <div className="scroll-desc">
                                      <h5>{r.desc.substring(0, 100) + '.....'}</h5>
                                  </div>
                                  <a href={r.link} target="_blank">More</a>
                              </div>
                          ))}
                      </div>
                      {!visible2 ? <ArrowCircleRightIcon onClick={() => scroll2(50)} className="scroll-icons" style={{ color: '#333', fontSize: '30px' }} /> : null }
                  </div>
              </div>
              <div className="scroll-column">
                  <h2>Financing and Investment</h2>
                  <div className="scroll-row">
                      {!visible3 ? null : <ArrowCircleLeftIcon onClick={() => scroll3(-50)} className="scroll-icons" style={{ color: '#333', fontSize: '30px' }} />}
                      <div className="scroll-container" ref={ref3}>
                          {data.map(r => (
                              <div className="scroll-content">
                                  <div className="scroll-content-header">
                                      <h3>{r.header}</h3>
                                      <img src={r.image} alt="logo" />
                                  </div>
                                  <div className="scroll-desc">
                                      <h5>{r.desc.substring(0, 100) + '.....'}</h5>
                                  </div>
                                  <a href={r.link} target="_blank">More</a>
                              </div>
                          ))}
                      </div>
                      {!visible3 ? <ArrowCircleRightIcon onClick={() => scroll3(50)} className="scroll-icons" style={{ color: '#333', fontSize: '30px' }} /> : null}
                  </div>
              </div>
              <div className="scroll-column">
                  <h2>Journey and Strategy</h2>
                  <div className="scroll-row">
                      {!visible4 ? null : <ArrowCircleLeftIcon onClick={() => scroll4(-50)} className="scroll-icons" style={{ color: '#333', fontSize: '30px' }} />}
                      <div className="scroll-container" ref={ref4}>
                          {data.map(r => (
                              <div className="scroll-content">
                                  <div className="scroll-content-header">
                                      <h3>{r.header}</h3>
                                      <img src={r.image} alt="logo" />
                                  </div>
                                  <div className="scroll-desc">
                                      <h5>{r.desc.substring(0, 100) + '.....'}</h5>
                                  </div>
                                  <a href={r.link} target="_blank">More</a>
                              </div>
                          ))}
                      </div>
                      {!visible4 ? <ArrowCircleRightIcon onClick={() => scroll4(50)} className="scroll-icons" style={{ color: '#333', fontSize: '30px' }} /> : null}
                  </div>
              </div>
              <div className="scroll-column">
                  <h2>Journey and Strategy</h2>
                  <div className="scroll-row">
                      {!visible5 ? null : <ArrowCircleLeftIcon onClick={() => scroll5(-50)} className="scroll-icons" style={{ color: '#333', fontSize: '30px' }} />}
                      <div className="scroll-container" ref={ref5}>
                        {data.map(r => (
                            <div className="scroll-content">
                                <div className="scroll-content-header">
                                    <h3>{r.header}</h3>
                                    <img src={r.image} alt="logo" />
                                </div>
                                <div className="scroll-desc">
                                    <h5>{r.desc.substring(0, 100) + '.....'}</h5>
                                </div>
                                <a href={r.link} target="_blank">More</a>
                            </div>
                        ))}
                      </div>
                      {!visible5 ? <ArrowCircleRightIcon onClick={() => scroll5(50)} className="scroll-icons" style={{ color: '#333', fontSize: '30px' }} /> : null}
                  </div>
              </div>
        </div>
    </div>
  )
}

export default  Content
