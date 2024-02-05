
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, serverTimestamp, orderBy, getDoc } from '@firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import Comment from "../components/Comment"
import Pro from '../components/Pro';
import { db } from '../firebase';
import styles from '../styles/Home.module.css'

function Account() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
    const [modalVisibleThree, setModalVisibleThree] = useState(false);
    const [modalVisibleFour, setModalVisibleFour] = useState(false);
    const [selected, setSelected] = useState("");
    const [selectedTwo, setSelectedTwo] = useState("");
    const [selectedThree, setSelectedThree] = useState("");
    const [selectedFour, setSelectedFour] = useState("");
    const [accounts, setAccounts] = useState("");
    const [posts, setPosts] = useState(0);
    const [show, setShow] = useState("");
    const [help, setHelp] = useState("Your audience")
    const [input, setInput] = useState("");
    const [potential, setPotential] = useState("");

    const [refresh, setRefresh] = useState(false);
    const [messageInput, setMessageInput] = useState("");

    const [selectedGroup, setSelectedGroup] = useState("");

    const [getMyGroup, setGetMyGroup] = useState([]);
    const [getMyGroupOne, setGetMyGroupOne] = useState([]);

    const [getPotential, setGetPotential] = useState([]);
    const [getConsultants, setGetConsultants] = useState([]);
    const [getId, setGetId] = useState([]);
    const [getMessages, setGetMessages] = useState([]);

    const [getTeam, setGetTeam] = useState([]);

    const [selectColor, setSelectColor] = useState("");

    const [allGroups, setAllGroups] = useState([]);

    const [whatColor, setWhatColor] = useState("white");

    const [numberPrice, setNumberPrice] = useState("");


    const [research, setResearch] = useState(false);
    const [ideas, setIdeas] = useState(false);
    const [content, setContent] = useState(false);

    const [link, setLink] = useState("");
    const [shortDesc, setShortDesc] = useState("");

    const [info, setInfo] = useState(true);

    const [trueOwner, setTrueOwner] = useState(false);
    

    const pos = []

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };

    const connectMetamask = async() => {
        if (window.ethereum) {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            setAccounts(account);
            
        }

        
      }


      const allConsulting = [{
        id: 1,
        description: "Strategy",
        info: "Looking for strategic minds to help us refine our business approach in the decentralized consulting landscape. As we navigate challenges and opportunities, we invite strategic thinkers to join our consultancy team. Your insights on market positioning, competitive analysis, and growth strategies will contribute to shaping the strategic direction of our web3 platform.",
        color: "red",
        address: "0x3...tr4",
        type: "Research"
      }, {
        id: 2,
        description: "Research",
        info: "Embarking on a research-driven journey for our web3 platform, we're in search of individuals passionate about exploring the latest trends, user behaviors, and industry innovations. Join our consultancy team to contribute your research skills in areas such as user experience, market analysis, and emerging technologies. Together, we'll ensure our platform remains at the forefront of the decentralized consulting landscape.",
        color: "blue",
        address: "0xd...432",
        type: "Ideas"
      },{
        id: 3,
        description: "Marketing",
        info: "Seeking expert guidance for our marketing strategy in the highly competitive crypto space. We are looking to elevate our brand visibility, capture a broader audience, and optimize our marketing channels. Join our consultancy team to contribute your insights on effective marketing tactics, audience engagement, and innovative promotional strategies for our web3 platform.",
        color: "green",
        address: "0xa...ztg",
        type: "Technology"
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
    
    


    const categories = ["Research", "Ideas", "Content"];

    const messageClass = "bg-blue-500 text-white rounded-lg p-2 max-w-md self-end"

    const addGroup = async (id) => {
      

      const doc = await addDoc(collection(db, "allChats"), {
        name: id
      })

      const docId = doc.id;

      addDoc(collection(db, "accounts", accounts[0], "myGroups"), {
        name: id,
        groupId: docId,
        owner: accounts[0]
      });

      addDoc(collection(db, "accounts", id, "myGroups"), {
        name: accounts[0],
        groupId: docId,
        color: "black"
      });

      const snapshot = await getDocs(collection(db, "allChats", docId, "messages"));
          setGetMessages(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })));

      setSelectedGroup(docId);
    }

    const addConsultant = async (id, idTwo) => {
      

      const doc = await addDoc(collection(db, "allChats"), {
        name: id
      })

      const docId = doc.id;

      addDoc(collection(db, "accounts", accounts[0], "myGroups"), {
        name: idTwo,
        groupId: docId
      });

      addDoc(collection(db, "accounts", id, "myGroups"), {
        name: accounts[0],
        groupId: docId,
        color: "black"
      });

      const snapshot = await getDocs(collection(db, "allChats", docId, "messages"));
          setGetMessages(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })));

      setSelectedGroup(docId);
    }

    const addGroupTwo = async (id) => {
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

      const firstDocRef = await addDoc(collection(db, "accounts", id, "myGroups"), {
        name: id,
        groupId: getMyGroupOne[0].data.groupId,
        color: randomColor,
        group: true,
        id: getMyGroupOne[0].data.id,
        link: getMyGroupOne[0].data.link
      });

      const groupId = firstDocRef.id;

      addDoc(collection(db, "accounts", accounts[0], "team"), {
        address: id,
        color: randomColor,
        groupId: groupId
      });

      
    }
                                    
    const researchAll = ["Web3", "Blockchain", "Analysis"];
    const ideasAll = ["Marketing", "Social", "Functions"];
    const technologyAll = ["Smart contract", "Blockchain", "Solidity"];


    useEffect(() => {

      const fetchData = async () => {

        onSnapshot(collection(db, "accounts", accounts[0], "potential"),
      
        (snapshot) => setGetPotential(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

      };

      if (accounts) {
        fetchData();
      }
    }, [accounts])


    useEffect(() => {

      const fetchData = async () => {

        onSnapshot(collection(db, "consultants"),
      
        (snapshot) => setGetConsultants(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

      };

      if (accounts) {
        fetchData();
      }
    }, [accounts])


    useEffect(() => {

      const fetchData = async () => {

        onSnapshot(collection(db, "accounts", accounts[0], "group"),
      
        (snapshot) => setGetMyGroupOne(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

      };

      if (accounts) {
        fetchData();
      }
    }, [accounts])

    useEffect(() => {

      const fetchData = async () => {

        onSnapshot(collection(db, "accounts", accounts[0], "myGroups"),
      
        (snapshot) => setGetMyGroup(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))

      };

      if (accounts) {
        fetchData();
      }
    }, [accounts])


    useEffect(() => {

      const fetchData = async () => {
        
          onSnapshot(collection(db, "accounts", accounts[0], "team"),
      
      (snapshot) => setGetTeam(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
      }))))
        
      };
    
      if (accounts) {
        fetchData();
      }
    }, [accounts]);


    const createGroup = async () => {
      const doc = await addDoc(collection(db, "allChats"), {
        
      })

      const docId = doc.id;


      const docTwo = await addDoc(collection(db, "consultingTeam"), {
        link: link,
        shortDescription: shortDesc,
        goal: input,
        owner: accounts[0],
        reward: numberPrice,
        resarch: research,
        ideas: ideas,
        content: content
      });

      const docIdTwo = docTwo.id;

      addDoc(collection(db, "accounts", accounts[0], "group"), {
        type: selected,
        sub: selectedTwo,
        description: input,
        groupId: docId,
        owner: accounts[0],
        id: docIdTwo,
        link: link,
      });


      

      setModalVisible(false);
    }

    const [groupId, setGroupId] = useState("");
    const [linkId, setLinkId] = useState("");


    useEffect(() => {
      const fetchData = async () => {
        const snapshot = await getDocs(collection(db, "accounts", accounts[0], "group"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        const snapshotTwo = await getDocs(collection(db, "accounts", accounts[0], "myGroups"));
        const dataTwo = snapshotTwo.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
    
        if (data.length > 0) {
          setGetId(data);
          setSelectedGroup(data[0].data.groupId);
          setGroupId(data[0].data.id);
          
        } else if (data.length == 0 && dataTwo.length > 0) {
          setLinkId(dataTwo[0].data.link);
          setGetId(dataTwo);
          setSelectedGroup(dataTwo[0].data.groupId);
          setSelectColor(dataTwo[0].data.color);
          setGroupId(dataTwo[0].data.id);
          
        }
      };
    
      if (accounts) {
        fetchData();
      }
    }, [accounts]);
    
    
    useEffect(() => {
      const fetchDataTwo = async () => {
        if (getId && getId.length > 0) {
          const messagesQuery = query(
            collection(db, "allChats", selectedGroup, "messages"),
            orderBy("timestamp", "asc") // Sort by timestamp in ascending order
          );
        
          const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const messages = snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));
            setGetMessages(messages);
          });
         
        }

        console.log(groupId, "timo");

        if (groupId && linkId) {
          const docRef = doc(db, "consultingTeam", groupId);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            setInfo(false);
            console.log("Document data:", docSnap.data());
            setProjectInfo(docSnap.data());
          } else {
            setInfo(true);
          }
        }
        

        
      };

      
    
      fetchDataTwo();

      
    }, [getId, refresh]);


    const [projectInfo, setProjectInfo] = useState([]);


    const fetchDataTwo = async (id, color, link, idd, name) => {
      const querySnapshot = await getDocs(
        query(collection(db, "allChats", id, "messages"), orderBy("timestamp"))
      );
    
      setGetMessages(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    
      setSelectedGroup(id);
      setSelectColor(color);
      console.log(name, accounts[0])
      if (name && accounts && name.toUpperCase() === accounts[0].toUpperCase()) {
        setTrueOwner(true);
      } else {
        setTrueOwner(false);
      }

      if (link) {
        setInfo(false);
        const docRef = doc(db, "consultingTeam", idd);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              setProjectInfo(docSnap.data());
            }
      } else {
        setInfo(true);
      }
    };
    


    const deleteGroup = async (id) => {
      deleteDoc(doc(db, "accounts", accounts[0], "myGroups", id));
      
    }


    const deleteRequest = async (id) => {
      deleteDoc(doc(db, "accounts", accounts[0], "potential", id));
      
    }


    const sendMessage = () => {
      if (getMyGroupOne.length > 0) {
        const owner = getMyGroupOne[0]?.data?.owner;
        if (owner && accounts[0].toUpperCase() === owner.toUpperCase()) {
          addDoc(collection(db, "allChats", selectedGroup, "messages"), {
            message: messageInput,
            owner: accounts[0],
            timestamp: serverTimestamp(),
            isOwner: true
          });
        } else {
          addDoc(collection(db, "allChats", selectedGroup, "messages"), {
            message: messageInput,
            owner: accounts[0],
            timestamp: serverTimestamp(),
            isOwner: false,
            color: selectColor
          });
        }
      } else {
        addDoc(collection(db, "allChats", selectedGroup, "messages"), {
          message: messageInput,
          owner: accounts[0],
          timestamp: serverTimestamp(),
          isOwner: false,
          color: selectColor
        });
      }
      
      

      setMessageInput("");
      setRefresh(!refresh);
    }

    const TIME_DIFFERENCE_THRESHOLD = 120; // Adjust the threshold as needed (in seconds)

let prevTimestamp = 0;

    const [getPersonId, setGetPersonId] = useState("");
    const [deleteGroupId, setDeleteGroupId] = useState("");
    const [teamId, setTeamId] = useState("");
    const [groupChatId, setGroupChatId] = useState("");

    const removePerson = (id, idTwo, idThree, idFour) => {
      setModalVisibleTwo(true);
      setWhatColor(id);
      setGetPersonId(idFour);
      setDeleteGroupId(idTwo);
      setTeamId(idThree);
    }

    const removePotential = (id) => {
      setModalVisibleFour(true);
      setPotential(id)
    }


    const remoPersonTeam = () => {
      deleteDoc(doc(db, "accounts", getPersonId, "myGroups", deleteGroupId));
      deleteDoc(doc(db, "accounts", accounts[0], "team", teamId));
      setModalVisibleTwo(false);
    }


    const deleteGroupChat = (id) => {
      setGroupChatId(id)
      setModalVisibleThree(true);
    }


    const deletedeleteGroupChat = () => {
      setModalVisibleThree(false);
      deleteDoc(doc(db, "accounts", accounts[0], "myGroups", groupChatId));
    }


    const deletePotential = () => {
      setModalVisibleFour(false);
      deleteDoc(doc(db, "accounts", accounts[0], "potential", potential));
    }


    const messagesEndRef = useRef(null); // Create a ref for the last message element

// ...

    useEffect(() => {
      // Scroll to the last message when the component updates (i.e., when new messages arrive)
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView();
      }
    }, [getMessages]);


    const chooseSelect = (id) => {
      setSelected(id)
      setSelectedTwo("");
    }
    
  
    return (
        <div className={styles.acc}>
           {modalVisible && (
          <div className={styles.modaloverlay} onClick={closeModal}>
            <div className={styles.modalcontent}>
              <div onClick={(e) => e.stopPropagation() /* prevent closing when clicking on the content */}>
                <div className="flex w-full flex-col px-10">
               
                
               
              
                
                <div className="mt-0 text-xl font-bold">What you need help with</div>
               
                <div className="flex items-center w-64 justify-between mt-5">
                    
                   <div onClick={() => setResearch(!research)} className={`${research ? "text-[#fff" : "text-[#3c9bd6]"} border ${research ? "bg-[#3c9bd6]" : null} border-[#3c9bd6] cursor-pointer hover:text-white p-2 px-4 rounded-md text-xs`}>Research</div>
                   <div onClick={() => setIdeas(!ideas)} className={`${ideas ? "text-[#fff" : "text-[#3c9bd6]"} border ${ideas ? "bg-[#3c9bd6]" : null} border-[#3c9bd6] cursor-pointer hover:text-white p-2 px-4 rounded-md text-xs`}>Ideas</div>
                   <div onClick={() => setContent(!content)} className={`${content ? "text-[#fff" : "text-[#3c9bd6]"} border ${content ? "bg-[#3c9bd6]" : null} border-[#3c9bd6] cursor-pointer hover:text-white p-2 px-4 rounded-md text-xs`}>Content</div>

                </div>
                <div className="mt-10 text-xl font-bold">Reward</div>
                <input type="number" onChange={(e) => setNumberPrice(e.target.value)} value={numberPrice} placeholder="0.1 eth" className=" mt-6 h-10 text-sm pl-2 rounded-md border border-[#1e294d] bg-blue-950"></input>
                <div className="mt-10 text-xl font-bold">Campaign description</div>
                <p className="mt-6 text-sm text-[#6175cc]">Your project:</p>
                <input  onChange={(e) => setLink(e.target.value)} value={link} placeholder="Link" className=" mt-2 h-10 text-sm pl-2 rounded-md border border-[#1e294d] bg-blue-950"></input>
                <p className="mt-6 text-sm text-[#6175cc]">Describe your platform and what goals you want to achieve with this marketing campaign (example: onboard 10 new people on your app)</p>
                <textarea
                  onChange={(e) => setInput(e.target.value)} 
                  value={input}
                  placeholder="Describe your campaign goals ..."
                  className="mt-6 h-40 text-sm pl-2 rounded-md border border-[#1e294d] bg-blue-950 pt-2 resize-none"
                ></textarea>
                
                <div className=" justify-end flex">
                <div onClick={createGroup} className="bg-blue-700 w-24 p-2 flex justify-center items-center rounded-lg mt-10 cursor-pointer hover:bg-blue-600">Create</div>
                </div>
                </div>
                {/* Close button */}
                
              </div>
            </div>
          </div>
        )}
        {modalVisibleTwo && (
          <div className={styles.modaloverlay} onClick={() => setModalVisibleTwo(false)}>
            <div className={styles.modalcontentTwo}>
              <div onClick={(e) => e.stopPropagation() /* prevent closing when clicking on the content */}>
                <div className="flex w-full flex-col px-10 justify-center items-center">
                  <img src="https://i.postimg.cc/zByPsmLy/undraw-throw-down-ub2l-removebg-preview.png" className="w-1/2" />
                  <p className="text-center mt-6 text-gray-200">Do you want to remove this person from your Consulting team?</p>
                  <div style={{height: 30, width: 30, borderRadius: "100%", backgroundColor: whatColor, marginTop: 16}}></div>
                  <div onClick={remoPersonTeam} className="bg-blue-700 w-24 p-2 flex justify-center items-center rounded-lg mt-10 cursor-pointer hover:bg-blue-600">Yes</div>
                </div>
                {/* Close button */}
                
              </div>
            </div>
          </div>
        )}
        {modalVisibleThree && (
          <div className={styles.modaloverlay} onClick={() => setModalVisibleThree(false)}>
            <div className={styles.modalcontentTwo}>
              <div onClick={(e) => e.stopPropagation() /* prevent closing when clicking on the content */}>
                <div className="flex w-full flex-col px-10 justify-center items-center">
                  <img src="https://i.postimg.cc/c4H9qVr7/undraw-moving-re-pipp-removebg-preview.png" className="w-full" />
                  <p className="text-center mt-6 text-gray-200">Do you want to delete this group chat?</p>
                  
                  <div onClick={deletedeleteGroupChat} className="bg-blue-700 w-24 p-2 flex justify-center items-center rounded-lg mt-10 cursor-pointer hover:bg-blue-600">Yes</div>
                </div>
                {/* Close button */}
                
              </div>
            </div>
          </div>
        )}
        {modalVisibleFour && (
          <div className={styles.modaloverlay} onClick={() => setModalVisibleFour(false)}>
            <div className={styles.modalcontentTwo}>
              <div onClick={(e) => e.stopPropagation() /* prevent closing when clicking on the content */}>
                <div className="flex w-full flex-col px-10 justify-center items-center">
                  <img src="https://i.postimg.cc/c4H9qVr7/undraw-moving-re-pipp-removebg-preview.png" className="w-full" />
                  <p className="text-center mt-6 text-gray-200">Do you want to delete this?</p>
                  
                  <div onClick={deletePotential} className="bg-blue-700 w-24 p-2 flex justify-center items-center rounded-lg mt-10 cursor-pointer hover:bg-blue-600">Yes</div>
                </div>
                {/* Close button */}
                
              </div>
            </div>
          </div>
        )}
          <div className={styles.mainUp} style={{paddingTop: 5, paddingBottom: 5}}>
        <div className=" flex" >
            
                    {
                        accounts ? (
                            <>
                            <div className="w-11 h-11 rounded-full bg-blue-300 ml-4"></div>
                            <div>
                                <p className="ml-2 text-sm text-gray-500">{accounts[0].slice(0,4)}...{accounts[0].slice(accounts[0].length - 4, accounts[0].length)}</p>
                                <div className="ml-2 text-md text-black">
                                
                            </div>
                            </div>
                            {/*<div onClick={balanceAndWithdraw} className="flex items-center hover:bg-gray-200 p-2 rounded-xl cursor-pointer">
                            <div className="w-11 h-11 rounded-full bg-blue-300"></div>
                            <div>
                                <p className="ml-2 text-sm text-gray-500">{accounts[0].slice(0,4)}...{accounts[0].slice(accounts[0].length - 4, accounts[0].length)}</p>
                                <div className="ml-2 text-md text-black">
                                <p>Get balance</p>
                            </div>
                            </div>
                            
                        </div>*/}
                            
                            </>
                        ) : <div onClick={connectMetamask} className="border-[#5d8add] border rounded-lg justify-center flex p-2 items-center hover:cursor-pointer hover:bg-[#1e2947] text-gray-500 hover:text-black ml-4">
                                <img className="w-6" src="https://i.postimg.cc/mrT1hFKC/Meta-Mask-Fox-svg-2.png" />
                                <p className="text-xs font-bold ml-1 text-[#5d8add]">Connect Metamask</p>
                            </div>
                    }
                    
                </div>
               {
                 accounts ? (
                   <>
                   {
                     getMyGroupOne.length == 0 ? (
                        <div onClick={() => setModalVisible(true)} className="flex cursor-pointer bg-[#086fac] p-2 rounded-xl hover:bg-[#254149] mr-4">
                            <p className="text-white text-md px-3 py-1">Create a new campaign</p>
                        </div>
                     ) : (
                       <Link href={{ pathname: `/new/${getMyGroupOne[0].data.id}`, query: { specialParam: true } }}>
                        <div className="flex cursor-pointer bg-[#086fac] p-2 rounded-xl hover:bg-[#254149] mr-4">
                            <p className="text-white text-md px-3 py-1">Get new members</p>
                        </div>
                        </Link>
                     )
                   }
                   </>
                 ) : (
                   null
                 )
               }
        
        
    
        </div>
        {
            getMyGroupOne.length == 0 && getMyGroup.length == 0 ? (
                <div className={styles.postsss}>
                    <img src="https://i.postimg.cc/cHgkvZz1/undraw-writer-q06d-removebg-preview.png" className="h-64 mt-0" />
                    <p className="text-[#2f3f5c]">Connect and create your own marketing team.</p>
                </div>
            ) : (
                <div className={styles.postss}>
            
            <div className={styles.postsTwo}>
            <div className="flex mb-5 mt-16">
                <p className={`"text-[#46606B]"} mr-7 font-bold text-xl hover:cursor-pointer mt-2`}></p>
            </div>
            <div className="w-full items-center flex flex-col h-full">
              

              {
                info ? (
                  <>
                  <div className="flex items-center">
              <p onClick={() => setHelp("Your audience")} className={`mx-4 ${help == "Your audience" ? "text-blue-500" : "text-[#2c3f6e]"} ${help == "Your audience" ? "border-blue-500" : "border-[#111729]"}   border-b cursor-pointer ${help == "Your audience" ? "hover:text-blue-500" : "hover:text-[#3c5699]"} `}>Campaign ideas</p>
              {/*<p onClick={() => setHelp("Consultant")} className={`mx-4 ${help == "Consultant" ? "text-blue-500" : "text-[#2c3f6e]"} ${help == "Consultant" ? "border-blue-500" : "border-[#111729]"}   border-b cursor-pointer ${help == "Consultant" ? "hover:text-blue-500" : "hover:text-[#3c5699]"}`}>Consultant</p>*/}
              </div>
                  {
                    getPotential == 0 ? (
                      <div className="h-full w-full flex justify-center items-center">
                        {
                          getMyGroupOne == 0 ? (
                            <div className="flex items-center justify-center flex-col">
                              <img src="https://i.postimg.cc/FRQ4NYwf/undraw-undraw-undraw-undraw-team-effort-yj7m-ej3u-wvay-fl4f-removebg-preview.png" className="w-32" />
                              <p className="text-center text-[#2f3f5c] mt-4">Create your group</p>
                              <div onClick={() => setModalVisible(true)} className="flex cursor-pointer border mt-4 border-[#2f3f5c] p-2 rounded-lg hover:bg-[#6585be] mr-0">
                                  <p className="text-[#2f3f5c] text-md px-4 py-0">Click</p>
                              </div>
                            </div>
                          
                          ) : (
                            <div className="flex items-center justify-center flex-col">
                              <img src="https://i.postimg.cc/QMRS95qb/undraw-In-love-6sq2-2-removebg-preview.png" className="w-48" />
                              <div className="text-center text-[#2f3f5c] mt-4 px-2">Our consultants are writing ideas for your campaign. Come back later or invite your audience to help you</div>
                              <Link href={{ pathname: `/new/${getMyGroupOne[0].data.id}`, query: { specialParam: true } }}>
                              <div className="flex cursor-pointer mt-4 border-[#2f3f5c] border p-2 rounded-lg hover:bg-[#4e7dc4] mr-0">
                                  <p className="text-[#2f3f5c] text-md px-2 text-sm">Click</p>
                              </div>
                              </Link>
                            </div>
                          )
                        }
                      </div>
                    ) : (
                      <>
                      {
                        getPotential.map((data, index) => {
                            return <div className="w-full" key={index}><Comment deleteComment={() => removePotential(data.id)} talk={() => addGroup(data.data.address)} add={() => addGroupTwo(data.data.address)} color={data.data.color} address={data.data.address} title={data.data.info} /></div>
                        })
                    }
                    </>
                    )
                  }
                   
                  </>
                ) : help == "Consultant" ? (
                  <>
                   {
                            getConsultants.map((data, index) => {
                                return <div key={index}><Pro onClick={() => addConsultant(data.data.address, data.data.name)} type={data.data.type} title={data.data.info} name={data.data.name} color={data.data.color} /></div>
                            })
                        }
                  </>
                ) : (
                  <div className="w-full px-4">
                    <p className="text-blue-300 font-bold text-lg">Project name:</p>
                    <a href={`http://${projectInfo.link}`} className="text-gray-300 text-sm mt-1 underline">{projectInfo.link}</a>
                    <p className="text-blue-300 font-bold text-lg mt-8 ">Reward:</p>
                    <p className="text-gray-300 text-sm mt-1">{projectInfo.reward} eth</p>
                    <p className="text-blue-300 font-bold text-lg mt-8">Description & Goals</p>
                    <p className="border-b pb-6 border-[#253149] text-gray-300 text-sm mt-1">{projectInfo.goal}</p>
                    <div className="flex items-center mt-5 flex-wrap">
            {
                  projectInfo.resarch && (
                    <div className="text-[#E93378] mb-3 border-[#E93378] border p-2 px-5 rounded-full text-sm mr-4">Research</div>
                  ) 
                }
                
                {
                  projectInfo.ideas ? (
                    <div className="text-[#3387E9] mb-3 border-[#3387E9] border p-2 px-5 rounded-full mr-4 text-sm">Ideas</div>
                  ) : (
                    null
                  )
                }

{
                  projectInfo.content ? (
                    <div className="text-[#33a6e9] mb-3 border-[#33a6e9] border p-2 px-5 rounded-full text-sm">Content</div>
                  ) : (
                    null
                  )
                }
            </div>
                  </div>
                )
              }
              <Link href="/">
             <img src="https://i.postimg.cc/GmsPsTVc/2szn-KA-Logo-Makr.png" className="absolute left-3 bottom-3 h-8"/>
              </Link>
                </div>
            </div>
            <div className="w-full bg-[#111729] h-full flex flex-col justify-center items-center">
  <div className="flex flex-col flex-grow mt-20 w-full">
    <div className="mt-0 h-12 w-full bg-[#111729] border-[#20293a] border-b flex items-center font-bold">
      
        <div className="flex items-center">
        {
  // Find the item that matches the condition
  

  // Render the owner group first if found
  
    getMyGroupOne.map((data, index) => {
      return  <div key={index} onClick={() => fetchDataTwo(data.data.groupId)}  className={`rounded-lg py-2 cursor-pointer ${selectedGroup == data.data.groupId ? "bg-[#171e35]" : null}`}>
                <div className="flex items-center border-r border-[#20293a]">
                  <p  className="text-blue-500 ml-4 pr-4">Your group ({getTeam.length}) :</p>
                  <>
              {
                getTeam.map((data, index) => {
                  return <div onClick={() => removePerson(data.data.color, data.data.groupId, data.id, data.data.address)} className="cursor-pointer pr-4" key={index} style={{backgroundColor: data.data.color, width: 20, height: 20, borderRadius: "100%", marginRight: 10}}></div>
                })
              }
            </>
                </div>
              </div>
    })
  
   
  
}

{/* Render the rest of the groups */}

<div className="max-w-screen-md overflow-x-auto flex">
  {getMyGroup.map((data, index) => (
    <div
      onClick={() => fetchDataTwo(data.data.groupId, data.data.color, data.data.group, data.data.id, data.data.owner)}
      key={index}
      onMouseLeave={() => setShow("")}
      onMouseEnter={() => setShow("X")}
      className={` ${selectedGroup == data.data.groupId ? "bg-[#171e35]" : null} ${selectedGroup == data.data.groupId && data.data.group ? "bg-[#2e3d6b]" : null} ${data.data.group ? "border" : null} border-blue-300 relative rounded-lg py-2 flex items-center`}
    >
      <p
        onClick={() => deleteGroupChat(data.id)}
        className="absolute left-2 font-thin hover:bg-[#2b3e6e] p-1 text-sm cursor-pointer rounded-md"
      >
        {show}
      </p>
      <p className="font-light cursor-pointer border-r border-[#20293a] pl-8 pr-8">
        {
          data.data.group ? (
            <p className="text-blue-300">$ {data.data.link}</p>
          ) : (
            <>
            {data.data.name.slice(0, 10)}{" "}
            </>
          )
        }
        
      </p>
    </div>
  ))}
</div>

        </div>
        
        
    
    </div>
    
  


    <div className="flex h-96 flex-col flex-grow overflow-y-auto justify-center items-center" >
      {
        getMessages.length == 0 && trueOwner ? (
          <p className="ml-0 my-4 text-[#2f3f5c] text-center">Talk to this address before adding to your group chat</p>
        ) : (
<p className="ml-10 my-4 text-[#2f3f5c]"></p>
        )
      }
    
          <div className="h-full w-full">
                                
                                {getMessages.map((data, index) => {
                                    // Check if data.data.owner and accounts[0] are both strings and then compare them
                                    const isOwner =
                                    typeof data.data.owner === 'string' &&
                                    typeof accounts[0] === 'string' &&
                                    data.data.owner.toUpperCase() === accounts[0].toUpperCase();

                                    const messageClass = isOwner
                                    ? "bg-[#3867F4] text-white rounded-3xl p-2 px-4 max-w-md self-end"
                                    : "bg-[#333143] text-white rounded-3xl px-4 p-2 max-w-md self-start";

                                    const messageClassTwo = isOwner
                                    ? "text-gray-400 text-xs rounded-lg p-2 max-w-md self-end"
                                    : "text-gray-400 text-xs rounded-lg p-2 max-w-md self-start";

                                    const currentTime = data.data.timestamp;
                                    const timeDifference = index > 0 ? currentTime - prevTimestamp : 0;

                                    // Check if the time difference is greater than the threshold
                                    const addMargin = index > 0 && timeDifference > TIME_DIFFERENCE_THRESHOLD;

                                    // Update the previous timestamp for the next iteration
                                    prevTimestamp = currentTime;

                                    const prevMessageTime = index > 0 ? getMessages[index - 1].data.timestamp : 0;
                                    const timeDifferencePrev = currentTime - prevMessageTime;

                                    // Check if the time difference with the previous message is greater than the threshold
                                    const addMarginBottom = index > 0 && timeDifferencePrev > TIME_DIFFERENCE_THRESHOLD;

                                    const nextMessageTime = index < getMessages.length - 1 ? getMessages[index + 1].data.timestamp : 0;
                                    const timeDifferenceNext = nextMessageTime - currentTime;

                                    // Check if the time difference with the next message is greater than the threshold
                                    const addMarginTopNext = index < getMessages.length - 1 && timeDifferenceNext > TIME_DIFFERENCE_THRESHOLD;


                                    return (
                                      <div
    onClick={() => console.log(timeDifference)}
    key={index}
    className={`mb-0 flex flex-col ${isOwner ? "items-end" : "items-start"} w-full p-1 ${timeDifference > 60 ? "border-t" : null} ${
        timeDifference > 60 ? "pt-4" : "pt-0"
    } ${timeDifferenceNext > 60 ? "pb-4" : "pt-0"} border-[#1c2435]`}
>
  {
    timeDifference > 60 ? (
<p className={`mx-auto text-center text-xs text-[#30436d]`}>{new Date(currentTime.seconds * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
    ) : (
      null
    )
  }


    <div className={`flex items-end`}>
        {!isOwner && (
            data.data.isOwner ? (
                <div className={`h-6 w-6 rounded-full mr-2 bg-black flex justify-center items-center mb-2`}>
                    <img src="https://i.postimg.cc/28fsnQtc/9rx-X5-X-Logo-Makr.png" className="h-3" />
                </div>
            ) : (
                <div className={`h-6 w-6 rounded-full mr-2`} style={{ backgroundColor: data.data.color, marginBottom: 10 }}></div>
            )
        )}

        <div className="">
        {!isOwner && (
            <div className="text-[#30436d] text-xs ml-2 mb-1">{data.data.owner?.slice(0,4)}...{data.data.owner?.slice(data.data.owner.length - 4, data.data.owner.length)}</div>
        )}
            <p className={messageClass + " text-left"}>{data.data.message}</p>
        </div>
        {index === getMessages.length - 1 && <div ref={messagesEndRef}></div>}
    </div>
</div>


                                  
                                    );
                                })}

                                 
                                 
                                    <div  className={`mb-0 flex "justify-end"  items-center w-full p-2`}>
                                    
                                    </div>
                                </div>
        
      
     
      
                            </div>
  </div>
  <input
    className="outline-none focus-border-gray-200 bg-[#20293a] rounded-full pl-4 h-10 w-full mb-4"
    style={{ maxWidth: '98%' }}
    placeholder="Aa ..."
    onChangeCapture={(e) => setMessageInput(e.target.value)}
    value={messageInput}
    onKeyPress={(e) => {
      if (e.key === "Enter") {
        sendMessage()
          
      }
    }}
  />
</div>


        </div>
            )
        }
        
        
            
    </div>
  
  )
}

export default Account