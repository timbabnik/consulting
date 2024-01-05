import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Consult from '../components/Consult'
import styles from '../styles/Home.module.css'

export default function Home() {


  const neki = [{
    id: 1,
    description: "Strategy"
  }]


  const allConsulting = [{
    id: 1,
    description: "Strategy",
    info: "Looking for strategic minds to help us refine our business approach in the decentralized consulting landscape. As we navigate challenges and opportunities, we invite strategic thinkers to join our consultancy team. Your insights on market positioning, competitive analysis, and growth strategies will contribute to shaping the strategic direction of our web3 platform.",
    color: "red",
    address: "0x3...tr4"
  }, {
    id: 2,
    description: "Research",
    info: "Embarking on a research-driven journey for our web3 platform, we're in search of individuals passionate about exploring the latest trends, user behaviors, and industry innovations. Join our consultancy team to contribute your research skills in areas such as user experience, market analysis, and emerging technologies. Together, we'll ensure our platform remains at the forefront of the decentralized consulting landscape.",
    color: "blue",
    address: "0xd...432"
  },{
    id: 3,
    description: "Marketing",
    info: "Seeking expert guidance for our marketing strategy in the highly competitive crypto space. We are looking to elevate our brand visibility, capture a broader audience, and optimize our marketing channels. Join our consultancy team to contribute your insights on effective marketing tactics, audience engagement, and innovative promotional strategies for our web3 platform.",
    color: "green",
    address: "0xa...ztg"
  },{
    id: 4,
    description: "Research",
    info: "Research is at the heart of our web3 platform, and we're inviting curious minds to join our consultancy team. If you have a knack for in-depth exploration, data analysis, and a keen interest in the evolving dynamics of the web3 space, we want you. Collaborate with us to drive evidence-based decisions, ensuring our platform remains a hub for cutting-edge insights and solutions.",
    color: "orange",
    address: "0x1...ki4"
  },{
    id: 5,
    description: "Technology",
    info: "Diving into the world of blockchain technology, we are on a quest for knowledgeable individuals to guide us in integrating cutting-edge blockchain solutions into our platform. If you're passionate about decentralized systems, smart contracts, and the latest blockchain advancements, join our consultancy team. Your expertise will be instrumental in shaping the technological backbone of our web3 platform.",
    color: "blue",
    address: "0x9...677"
  },{
    id: 6,
    description: "Research",
    info: "We're on the lookout for research enthusiasts to join our consultancy team for the web3 platform. Dive into the world of market trends, user behaviors, and emerging technologies as we collectively shape the future of our decentralized consulting hub.",
    color: "red",
    address: "0xh...kgd"
  },{
    id: 7,
    description: "Strategy",
    info: "Embarking on a strategic overhaul for our web3 consulting platform. We're keen on optimizing our business model, exploring new partnerships, and staying ahead in this dynamic industry. If you have a knack for strategic planning and want to be part of a forward-thinking team, join us. Together, we'll define and implement the next phase of our platform's growth.",
    color: "yellow",
    address: "0xt...aa3"
  },{
    id: 8,
    description: "Marketing",
    info: "In need of marketing expertise to propel our web3 platform to new heights. We're specifically interested in harnessing the power of social media, content marketing, and community engagement. If you're passionate about creating impactful marketing campaigns in the blockchain industry, join our consultancy team. Your valuable input will shape the future of our platform.",
    color: "pink",
    address: "0xn...1v3"
  },]


  return (
    <div className="flex flex-col  items-center justify-center w-full bg-[#111729]">
      <Head>
        <title>Consulting App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="flex justify-between w-full">
      <div className="flex items-center m-5">
        <img src="https://i.postimg.cc/05z87KKh/1p-If-Jv-Logo-Makr.png" className="h-12" />
        <p className="ml-2 text-xl text-[#62baf1]">Conschain</p>
      </div>
      <div className="flex items-center">
      <p class="hidden md:block text-sm text-[#dde0e6] mr-6 hover:text-[#aebcdb] cursor-not-allowed">Become a consultant</p>

        <Link href="/account"><p className="m-5 mr-10 font-bold bg-[#3c9bd6] p-3 text-sm px-6 text-[#fff] rounded-full hover:bg-[#83b8d8] cursor-pointer hover:text-black">Start here</p></Link>
      </div>
    </div>
    <div className={styles.mainmain}>
      <div className="flex flex-col justify-center items-center">
        <span className="inline-block bg-[#1a273e] px-3 py-2 rounded-full">
          <p className="text-[#62baf1] text-sm ">Decentralized management consultancy</p>
        </span>
        <p className="md:text-5xl text-3xl xs:text-2xl w-full font-bold text-center mt-4 lg:text-7xl">Create your own consultancy and research team</p>
        <p className="text-[#98a2b6] md:text-xl text-md mt-4 w-2/3 text-center">Create your own hybrid consultancy team between your audience and professional consultants.</p>
      </div>
      <Link href="/account"><div className="bg-[#51b0eb] p-3 rounded-lg text-md w-32 justify-center items-center flex mt-10 cursor-pointer hover:bg-[#3c9bd6]">Get started</div></Link>
      <img src="https://i.postimg.cc/m2fRmFyn/undraw-Lives-matter-38lv-removebg-preview.png" className="mt-10 mb-10" />
      
    </div>
    
    <div className="w-full min-h-64 bg-[#131a31] justify-center flex items-center flex-col">
      
  <div className={styles.intro}>
    <div className="flex flex-wrap mt-20 mb-32 justify-center">
      <div className="bg-[#20293A] p-8 rounded-lg mx-5 w-80 mt-10">
        <img src="https://i.postimg.cc/05z87KKh/1p-If-Jv-Logo-Makr.png" className="h-12" />
        <p className="text-[#fff] text-xl font-bold mt-4">Explain your problem</p>
        <p className="text-[#c3cee0] text-sm mt-4">Describe your problem and what kind of a help you need - Ideas, Research, Technology.</p>
       
        
      </div>
      <div className="bg-[#20293A] p-6 rounded-lg mx-5 w-80 mt-10">
        <img src="https://i.postimg.cc/QMY2MSmC/3-Ppjn-P-Logo-Makr.png" className="h-12" />
        <p className="text-[#fff] text-xl font-bold mt-4">Get people´s feedback</p>
        
        <p className="text-[#c3cee0] text-sm mt-4">Give your own audience a chance to help you and be a part of the team.</p>
        <p className="text-[#c3cee0] text-sm mt-4">Or let professionals give you some ideas and advice on how they can help you.</p>
      </div>
      <div className="bg-[#20293A] p-6 rounded-lg mx-5 mt-10 w-80">
        <img src="https://i.postimg.cc/sx7qwzrG/3i-Eo3-T-Logo-Makr.png" className="h-12" />
        <p className="text-[#fff] text-xl font-bold mt-4">Create your team</p>
        <p className="text-[#c3cee0] text-sm mt-4">Add individuals who provided insightful answers and whom you'd like to collaborate with to your group chat. Allow them to contribute to problem-solving.</p>
      </div>
    </div>
  </div>
</div>
<div className="bg-[#0e1429] w-full items-center flex flex-col pb-36">
<p className="mt-20 text-4xl font-bold">Become a consultant</p>
<div className="flex items-center">
<div className={styles.introo}>
  {allConsulting.map((data, index) => (
    <Consult key={index} description={data.description} info={data.info} color={data.color} address={data.address} />
  ))}
</div>

</div>
</div>


<div className="w-full h-10 bg-gray-900"></div>
  
    </div>
  )
}
