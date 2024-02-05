import { addDoc, collection, doc, getDoc, onSnapshot } from '@firebase/firestore';
import { TEMPORARY_REDIRECT_STATUS } from 'next/dist/shared/lib/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import styles from "../../styles/Home.module.css"

function New() {


    const [input, setInput] = useState("");
    const [accounts, setAccounts] = useState("");
    const [getInfo, setGetInfo] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const router = useRouter();
    const specialParam = router.query.specialParam;

    const { postIds } = router.query;


    useEffect(() => {
      const fetchData = async () => {
        try {
          if (postIds) {
            const docRef = doc(db, "consultingTeam", postIds);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              setGetInfo(docSnap.data());
            } else {
              // Document doesn't exist
              console.log("No such document!");
            }
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      };
    
      fetchData();
    }, [postIds]);



  
  const connectMetamask = async() => {
      if (window.ethereum) {
          const account = await window.ethereum.request({
              method: "eth_requestAccounts",
          })
          setAccounts(account);
          
      }

      
  }
 
  const addPotential = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    addDoc(collection(db, "accounts", getInfo.owner, "potential"), {
      address: accounts[0],
      color: randomColor,
      info: input
    });

    setModalVisible(true);
  }


  const copyLink = () => {
    // Your logic here
    setLinked(false);
    // Access the current query parameters
    const { postIds } = router.query;

    // Copy postIds to the clipboard
    if (postIds) {
      navigator.clipboard.writeText(`http://tancy.xyz/new/${postIds}`)
        .then(() => {
          console.log('postIds copied to clipboard:', postIds);
        })
        .catch((err) => {
          console.error('Error copying postIds to clipboard:', err);
        });
    }

    // Additional logic or redirection if needed
  };


  const [linked, setLinked] = useState(true);



  return (
    <div className={styles.backgroundForm}>
      {modalVisible && (
          <div className={styles.modaloverlay} onClick={() => setModalVisible(false)}>
            <div className={styles.modalcontentThree}>
              <div onClick={(e) => e.stopPropagation() /* prevent closing when clicking on the content */}>
                <div className="flex w-full flex-col px-10 justify-center items-center">
                  <img src="https://i.postimg.cc/NMBDktW9/6t1-O4g-Logo-Makr.png" className="w-32" />
                  <p className="text-center w-2/3 mt-8 text-[#3f5780]">Successful send. Please return to your account and check if you have a group.</p>
                  <Link href="/account"><div onClick={() => setModalVisible(false)} className="mt-6 bg-blue-700 p-3 rounded-lg text-sm hover:bg-blue-600 cursor-pointer">Back to account</div></Link>
                </div>
              </div>
            </div>
          </div>
            )}
        <div className={styles.form}>
            <div className="h-20 w-20 rounded-full bg-[#00A3FF] justify-center items-center flex">
                <img src="https://i.postimg.cc/QMR5Tq3t/6w5w9p-Logo-Makr.png" className="h-10" />
            </div>
            {
              specialParam ? (
                <div className="flex items-center mt-10">
                  <img onClick={copyLink} src="https://i.postimg.cc/L4c0ZJkx/9-Ymh-YX-Logo-Makr.png" className="h-10 border border-[#6081ec] rounded-lg p-2 hover:bg-[#0831b6] cursor-pointer" /> 
                  <p  className="ml-3 text-[#6081ec]">{linked ? "Copy the URL and send it to you audience" : "Copied"}</p>
                </div>
              ) : (
                <div className="flex items-center mt-10">
                  
                  <p className="ml-3 text-[#6081ec]"></p>
                </div>
              )
            }
            
            <h1 className="mt-10 font-bold text-4xl mb-4">{getInfo.reward} ETH</h1>
            <a href={`${getInfo.link}`} className="text-[#5f90eb] underline">{getInfo.link}</a>
            <p className="text-[#A2ADC2] mt-5">{getInfo.goal}</p>
            <div className="flex items-center mt-5">
            {
                  getInfo.resarch && (
                    <div className="text-[#E93378] border-[#E93378] border p-2 px-5 rounded-full text-sm mr-4">Research</div>
                  ) 
                }
                
                {
                  getInfo.ideas ? (
                    <div className="text-[#3387E9] border-[#3387E9] border p-2 px-5 rounded-full mr-4 text-sm">Ideas</div>
                  ) : (
                    null
                  )
                }

{
                  getInfo.content ? (
                    <div className="text-[#33a6e9] border-[#33a6e9] border p-2 px-5 rounded-full text-sm">Content</div>
                  ) : (
                    null
                  )
                }
            </div>
            <div className="border-[#212B4D] border mt-10 w-full h-0"></div>
            <h1 className="mt-10 font-bold text-3xl">JOIN A MARKETING TEAM</h1>
            <p className="text-[#A2ADC2] mt-5">Write your thoughts/opinions/ideas on how you could help {getInfo.link} to achieve their goals. If they find it helpful they can add you to their group chat where you will work together and earn money.</p>
            <textarea
                  onChange={(e) => setInput(e.target.value)} 
                  value={input}
                  placeholder="Aa..."
                  className="mt-10 h-56 w-full text-sm pl-2 rounded-md border border-[#1e294d] bg-blue-950 pt-2 resize-none"
                ></textarea>
                <div className=" justify-end flex">
                  {
                    accounts ? (
                      <div onClick={addPotential} className="bg-blue-700 w-24 p-2 flex justify-center items-center rounded-lg mt-10 cursor-pointer hover:bg-blue-600">Send</div>
                    ) : (
                      <div onClick={connectMetamask} className="bg-blue-700 w-24 p-2 flex justify-center items-center rounded-lg mt-10 cursor-pointer hover:bg-blue-600">Connect</div>
                    )
                  }
                
                </div>
                <div className=" justify-end flex">
                <p className="mt-3 text-[#2e3e74] text-sm">
                  {accounts && accounts[0] ? `${accounts[0].slice(0, 4)}...${accounts[0].slice(-4)}` : '...'}
                </p>
                </div>
        </div>
    </div>
  )
}

export default New