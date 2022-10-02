import { useRef, useState } from 'react'
import { FetchWordApi } from './api/WordApi'
import Particle from './components/particle'
import './App.scss'
const App = () => {
     const [data, setData] = useState()
     const input = useRef();

     const HandleKey = async (e) => {
          if (e.keyCode === 13) {
               const result = await FetchWordApi(input.current.value)
               if (!result.message) {
                    const { word, frequency, pronunciation, results } = result;
                    const partOfSpeech = { 'noun': [], 'verb': [] }
                    results.forEach(res => {
                         if (Object.keys(partOfSpeech).includes(res.partOfSpeech)) {
                              partOfSpeech[res.partOfSpeech].push({ definition: res.definition, synonyms: res.synonyms, examples: res.examples })
                         }
                    })
                    setData({ word, frequency, pronunciation: pronunciation.all, partOfSpeech, status: true })
               }else{
                    setData({ status:false})
               }
          }
     }
     return (
          <>
               <Particle />
               <div className='container'>
                    <input ref={input} onKeyDown={HandleKey} placeholder='Type a word...' />
                    {data && (data.status ?
                         <div className='card' >
                              <span className='word'>Word : {data.word.toUpperCase()}</span>
                              <span className='frequency'>Frequency : {data.frequency}</span>
                              <span className='pronunciation'>Pronunciation: {data.pronunciation}</span>
                              {Object.keys(data.partOfSpeech).map(key => (
                                   <div className='info' key={key}>
                                        <p className='title '>{key} : </p>
                                        {data.partOfSpeech[key].map(res => {
                                             const { definition, synonyms, examples } = res
                                             return (
                                                  <div className='details' key={definition}>
                                                       <span className='definition'> Definition : {definition}</span>
                                                       {synonyms && <span className='synonyms '> Synonyms:  {synonyms.join(', ')} </span>}


                                                       {examples && <span className='examples'> Examples : {examples.map(example => {
                                                            return <span key={example} className='examples'>{example}  </span>
                                                            })}
                                                            </span>}
                                                  </div>
                                             )
                                        })}
                                   </div>
                              ))
                              }

                         </div>
                         : <span className='error'>Word not Found</span>)
                    }
               </div>
          </>
     )
}

export default App