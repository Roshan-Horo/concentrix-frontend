import React,{useState,useEffect} from 'react'
import { Line,Bar,Pie } from 'react-chartjs-2';



const Analytics = () => {
    let entry = [];
    const [fetching,setFetching] = useState([])
    const [currentData,setCurrentData] = useState({})
    const [col,setCol] = useState(null)
    const [row,setRow] = useState(null)
    const [graph,setGraph] = useState('Line')

    // const fetchData = [
    //   {
    //   "name": "Money",
    //   "months": ['JAN','FEB','MAR','APR','MAY','JUN','JULY','AUG','SEPT','OCT','NOV','DEC'],
    //   "money": [81,239,112,200,170,120,199,221,92,170,130,100]
    //   },
    //   {
    //     "name": "Colors",
    //     "colors": ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     "value": [12, 19, 3, 5, 2, 3],
    //     "other": [10,8,8,2,14,20]
    //   },
    //   {
    //     "name": "Electric Car",
    //     "year": ['2012','2013','2014','2015','2016','2017','2018','2019'],
    //     "value": [0.13,0.25,0.43,0.76,1.32,1.81,3.25,4.72]
    //   }
    // ]

    const data = {
        labels: col,
        datasets: [
          {
            label: '# of Votes',
            data: row,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        
      };




    const onDragOverListener = e => {
        e.preventDefault()
        e.stopPropagation()
        console.log('over')
    }

    useEffect(() => {
      
      async function justRun(){
        try {
          let res = await fetch('https://concentrix.herokuapp.com/api/data');
          let data = await res.json();
          setFetching(data)
          setCurrentData(data[0])
      } catch (error) {
          console.log(error);
      }
      }

      justRun()
      

      //setCurrentData(fetching[0])
    },[])

    

    

    useEffect(() => {
      
    }, [fetching,currentData])


    return (
        <div>
        {fetching && fetching.length ? (
        <div className="grid">
        <div className="row">
          <div className="col-12">
            <div className="col-2 line">
              <div className="datasets flex line">

              <div>Data</div>
              <div>Analytics</div>
              </div>

              <div className="datasets flex data">
               <div>Datasets</div>
               <div>
               <select
                onChange={e => {
                  // setCol({})
                  // setRow({})
                  fetching.map(d => {
                    if(d.name === e.target.value){
                      setCurrentData(d)
                      console.log(currentData)
                    }
                  })
                }}
               >
                {
                  fetching.map(d => (
                    <option
                        key={d.name}
                        value={d.name}
                        >{d.name}</option>
                  )

                    // for(let key of Object.keys(d)){
                    //   if(key === 'key' || key === 'value'){
                    //     <option
                    //     key={d.name}
                    //     value={d.name}
                    //     >{d.name}</option>
                    //   }
                    // }
                                    
                  
                  )
 
                }
               </select>
               </div>
               
              </div>
            </div>
            <div className="col-8">
              
              <div className="data line">
                <div
                 draggable="true"
                 className="columns line drop-zone"
                 id="topColumn"
                 
                 onDragOver={e => onDragOverListener(e)}
                 onDrop={e => {
                  e.preventDefault()
                  let mime = e.target
                  const res = JSON.parse(e.dataTransfer.getData('dropName'))
                  const droppedElement = document.createElement('div')
                  droppedElement.textContent = res.type
                  mime.appendChild(droppedElement)

                  setCol(res.payload)
                 }}
                 >
                  <div
                   className="head column-head"
                   >Columns </div>
                  
                </div>

                <div 
                className="rows line drop-zone"
                id="bottomColumn"
                draggable="true"
                
                onDragOver={e => onDragOverListener(e)}
                onDrop={e => {
                     e.preventDefault()
                     let mime = e.target
                     const res = JSON.parse(e.dataTransfer.getData('dropName'))
                     const droppedElement = document.createElement('div')
                     droppedElement.textContent = res.type
                     // Implement button to delete that category from row
                    //  const btn = document.createElement('button')
                    //  btn.innerHTML = res.type
                    //  btn.onclick = () => {
                        
                    //  }

                    
                     //droppedElement.appendChild(btn)
                     mime.appendChild(droppedElement)

                     setRow(res.payload)
                     
                 }}
                >
                  <div className="head column-head">Rows </div>
                  
 
                </div>
              </div>
              
            </div>
            <div className="col-2">
              <div className="graph center line">Graph</div>
              <div className="data center">
               <select
                onChange={e => setGraph(e.target.value)}
               >
                <option
                 value="Line"
                >Line Graph</option>
                <option
                value="Bar"
                >Bar Graph</option>
                <option
                value="Pie"
                >Pie Graph</option>

               </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <div className="measures line">
              <div className="dimention line">
                <div className="head">Dimension</div>
                <ul>

                  
                    {
                      Object.keys(currentData).map(data => (
                        data !== 'name' 
                          ?
                        <li
                       key={data}
                       className="category"
                       draggable="true"
                       onDragStart={e => {
                         let sentData = {
                           "type": data,
                           "payload": currentData[data]
                         }
                         console.log('h')
                         e.dataTransfer.setData('dropName',JSON.stringify(sentData))
                       }}
                       >{data}</li>
                        : null
                  
                      ))
                    }
                    
                

                </ul>

              </div>
              
              <div className="dimention line">
                <div className="head">Measures</div>
                <ul>
                  <li className="category">Profits</li>
                  <li className="category">Discount</li>
                  <li className="category">Sales</li>
                  <li className="category">Quantity</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-10">
            
              <div className={ graph === 'Pie' ? 'chart-data chart-pie' : 'chart-data'} >
              <div className='head'>{graph} Chart</div>
              {
                col && row 
                ?
                (graph === 'Line'
                  ? (<Line data={data} options={options} />) 
                  : graph === 'Bar'
                    ? (<Bar data={data} options={options} />)
                    : (<Pie data={data} options={options} />)
                )
                : <div>No Data</div>
              }
              
              </div>
              
            
          </div>
        </div>
      </div>
      ) : (<div>Loading data from server....</div>)}
        </div>
    )
}

export default Analytics
