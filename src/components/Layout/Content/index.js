import React from 'react'
import patents from '../../../assets/images/patents.jpeg'
import model from '../../../assets/images/business-model.jpg'
import negotiation from '../../../assets/images/negotiation.jpg'
import prioritization from '../../../assets/images/prioritization.jpg'
import profit from '../../../assets/images/profit.jpg'

import './Content.css'
const Content = () =>  {

    const data = [
        {
            id:1,
            image: patents,
            header:'Short notes on IP and patents for startups',
            desc: 'A patent is “the exclusive right granted by a government to an inventor to manufacture, use, or sell an invention for a certain number of years”. Startup founders often look at a patent as what will protect them from competition. Does a patent really protect you, and if yes, how and in what cases ? Let’s dive in ! ',
            link:'http://192.168.8.102/index.php/2022/03/16/patents/'
        },
        {
            id: 2,
            image: profit,
            header: 'Become Rolex-profitable! ',
            desc: 'Y Combinators founder Paul Graham coined the term “ramen profitable” - meaning that a start-up is making just enough money to pay the founders\' living expenses(only eating cheap ramen noodles).',
            link:'http://192.168.8.102/index.php/2022/03/16/patents/'
        },
        {
            id: 3,
            image: prioritization,
            header: 'What is Prioritization',
            desc: 'The disciplined process of evaluating the relative importance of work, ideas, and requests to eliminate wasteful practices and deliver value in the quickest possible way, given a variety of constraints.',
            link:'http://192.168.8.102/index.php/2022/03/16/patents/'
        },
        {
            id: 4,
            image: model,
            header: 'What is a business model?',
            desc: 'According to Peter Drucker, a business model, is a detailed description of who the customer is, the value that they desire and how this value can be delivered at an appropriate cost.  ',
            link:'http://192.168.8.102/index.php/2022/03/16/patents/'
        },
        {
            id: 5,
            image: negotiation,
            header: 'THE ART OF BARGAINING AND NEGOTIATING ',
            desc: 'Bargaining and negotiation is a skill that most people don’t have while to other people, it comes out naturally either by experience or by learning the art. Sometimes it is a psychological skill that aims at de-campaigning someone\'s position and convincing someone to buy your perspective and come to a common agreement.',
            link:'http://192.168.8.102/index.php/2022/03/16/patents/'
        },
    ]


  return (
      <div className="content-container">
          <div className="content-menu">
              <div className="card-container">
                  {data.map((r => (
                      <div className="card">
                          <img src={r.image} alt="image" />
                          <div className="card-desc">
                              <h3>{r.header}</h3>
                              <h5>{r.desc.substring(0, 200) + '.....'}</h5>
                              <button><a href={r.link} target='_blank' >Read more</a></button>
                          </div>
                      </div>
                  )))}
                  {[...new Array(3 - data.length % 3).fill()].map((r) => (
                      <div className="card-hide hidden"  />
                  ))}
              </div>
        </div>
    </div>
  )
}

export default  Content
