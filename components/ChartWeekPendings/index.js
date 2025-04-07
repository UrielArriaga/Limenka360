import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { NavigateBefore, NavigateNext, Settings } from "@material-ui/icons";
import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns';
import { useForm } from "react-hook-form";
import { formatDate } from "../../utils";
import dayjs from "dayjs";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GraphWeekPendings = ({type,dataLabels,dataGraph,title, showOptions, setShowOptions,setSearch, rangeWeekPendings, setRangeWeekPendings, dataNormalizeGraph}) =>{
    const [typeChart, setTypeChart] = useState(type);
    const {register,handleSubmit,formState: { errors }} = useForm();
    const getOrCreateTooltip = (chart) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div');
      
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.style.backgroundColor = 'rgba(0,0,0,1)';
          tooltipEl.style.color = 'white';

          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.transform = 'translate(-50%, 0)';
          tooltipEl.style.transition = 'all .3s ease';
          tooltipEl.style.borderRadius = '5px';
          tooltipEl.style.boxShadow = '0 6px 12px rgba(0,0,0,.5)';
          tooltipEl.style.zIndex = '9999999999999999999999999999999'
      
          const table = document.createElement('table');
          table.style.margin = '0px';
      
          tooltipEl.appendChild(table);
          chart.canvas.parentNode.appendChild(tooltipEl);
        }
      
        return tooltipEl;
      };
      
    const externalTooltipHandler = (context) => {
        // Tooltip Element
        console.log(context)
        const {chart, tooltip} = context;
        const tooltipEl = getOrCreateTooltip(chart);
      
        // Hide if no tooltip
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
      
        // Set Text
        if (tooltip.body) {
          const titleLines = tooltip.title || [];
          const bodyLines = tooltip.body.map(b => b.lines);
          const dataPoints = tooltip.dataPoints;
          const container = document.createElement('div');
          container.style.padding = '5px'
          const header = document.createElement('div');
          header.style.backgroundColor = '#2E7DC3';
          header.style.borderRadius = '5px 5px 0px 0px';
          header.style.padding = '6px';
          header.style.color = 'white';
          header.style.fontSize = '14px';
          header.style.borderBottom = 'solid 1px #DDD'
      
      
          titleLines.forEach(title => {
            const tr = document.createElement('tr');
            tr.style.borderWidth = 0;
      
            const th = document.createElement('th');
            th.style.borderWidth = 0;
            const text = document.createTextNode(title);
      
            th.appendChild(text);
            tr.appendChild(th);
            header.appendChild(tr);
          });
      
          const tableBody = document.createElement('tbody');
          dataPoints.forEach((point, i) => {
            const colors = tooltip.labelColors[i];
      
            const span = document.createElement('span');
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;
            span.style.borderWidth = '2px';
            span.style.marginRight = '10px';
            span.style.height = '10px';
            span.style.width = '10px';
            span.style.display = 'inline-block';
      
            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = 0;
      
            const td = document.createElement('td');
            td.style.borderWidth = 0;
            const pendingItem = document.createElement('div');
            pendingItem.style.backgroundColor = colors.backgroundColor;
            pendingItem.style.padding = '2px 5px';
            pendingItem.style.borderRadius = '5px'
            const hora = document.createTextNode(`Hora: ${(new Date(dataNormalizeGraph[i].date_from).getHours()<10?'0':'')+new Date(dataNormalizeGraph[i].date_from).getHours()}:${(new Date(dataNormalizeGraph[i].date_from).getMinutes()<10?'0':'')+new Date(dataNormalizeGraph[i].date_from).getMinutes()} `);
            const lugar = document.createTextNode(dataNormalizeGraph[i].place?`|| Lugar: ${dataNormalizeGraph[i].place}`: '')
            const prospecto = document.createTextNode(`Prospecto: ${dataNormalizeGraph[i].prospect.name} ${dataNormalizeGraph[i].prospect.lastname}`)
            const br = document.createElement('br')
      
            pendingItem.appendChild(span);
            pendingItem.appendChild(hora);
            pendingItem.appendChild(lugar);
            pendingItem.appendChild(br);
            pendingItem.appendChild(prospecto);
            td.appendChild(pendingItem)
            tr.appendChild(td);
            tableBody.appendChild(tr);
          });
      
          const tableRoot = tooltipEl.querySelector('table');
      
          // Remove old children
          while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
          }
      
          // Add new children
          container.appendChild(tableBody);
          tableRoot.appendChild(header);
          tableRoot.appendChild(container);
        }
      
        const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
      
        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
        tooltipEl.style.font = tooltip.options.bodyFont.string;
    };
    let options = { 
        plugins:{
            legend: {
                display:false
            },
            /* tooltip:{
                mode: 'point',
                callbacks:{
                    // title: function(context){
                    //     let multiString = [
                    //         `${formatDate(dataNormalizeGraph[context[0].dataIndex].date_from)}`,
                    //         `${new Date(dataNormalizeGraph[context[0].dataIndex].date_from).getHours()}:${new Date(dataNormalizeGraph[context[0].dataIndex].date_from).getMinutes()}`
                    //     ]
                    // return multiString
                    // },
                    label: function(context){                        
                        let descriptionMultiString = dataNormalizeGraph[context.dataIndex].description.match(/\b.{1,60}(.$)?\b/g)
                        console.log(context)
                    
                    return [
                        `Hora: ${new Date(dataNormalizeGraph[context.dataIndex].date_from).getHours()}:${new Date(dataNormalizeGraph[context.dataIndex].date_from).getMinutes()} || Lugar: ${dataNormalizeGraph[context.dataIndex].place} || Prospecto: ${dataNormalizeGraph[context.dataIndex].prospect.name} ${dataNormalizeGraph[context.dataIndex].prospect.lastname}`,
                        descriptionMultiString]
                    },
                    beforeBody: function(context){
                    return dataNormalizeGraph[context[0].dataIndex].place
                    },
                }
            } */
            tooltip: {
                // Disable the on-canvas tooltip
                enabled: false,
                mode: 'point',

                external: externalTooltipHandler /* (context) => {
                    // Tooltip Element
                    console.log(context)
                    let tooltipEl = document.getElementById('chartjs-tooltip');

                    // Create element on first render
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.id = 'chartjs-tooltip';
                        tooltipEl.innerHTML = '<table></table>';
                        document.body.appendChild(tooltipEl);
                    }

                    // Hide if no tooltip
                    const tooltipModel = context.tooltip;
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = '0';
                        return;
                    }

                    // Set caret Position (above, below,no-transform ).As I need above I don't delete that class
                    tooltipEl.classList.remove('below', 'no-transform');


                    // Set HTML & Data
                    if (tooltipModel.body) {
                        const dataFromCurrentElement = tooltipModel.dataPoints[0];
                        const currentElement = dataFromCurrentElement.dataIndex;
                        const formattedValue = dataFromCurrentElement.formattedValue.trim();
                        const currentDataToShow = formattedValue.substr(1, formattedValue.length - 2).split(' ');
                        const innerHtml = [`
                        <div style="border-collapse: separate; overflow: hidden; border-radius: 5px; box-shadow: 0 6px 12px rgba(0,0,0,.5);">

                            <div style="background-color: #0c203b; padding-top: 5px; padding-bottom: 6px; padding-left: 7px; color: white; font-size: 14px; border-bottom: solid 1px #DDD">
                               Pendientes 09 Septiembre 2022
                            </div>
                            <div style="display: flex; padding: 1.2rem; background-color: white">
                                <div style="display: flex; margin-right: 1.2rem;align-items: center;  ">
                                    <div style="border-radius: 100%; background-color: #6785C1; height: 13px; width: 13px;"></div>
                                </div>
                                <div style="display: flex;  flex-direction: column;font-size: 14px">
                                    <div>Revenue: <span style="font-weight: 600">${currentDataToShow[0].substr(0, currentDataToShow[0].length - 1)}</span></div>
                                    <div>Revenue per employee: <span style="font-weight: 600">${currentDataToShow[1].substr(0, currentDataToShow[1].length - 1)}</span></div>
                                    <div>Net income per employee: <span style="font-weight: 600">${"Hola"}</span></div>
                                </div>
                            </div>
                         </div>
                    `,`
                    <div style="border-collapse: separate; overflow: hidden; border-radius: 5px; box-shadow: 0 6px 12px rgba(0,0,0,.5);">

                        <div style="background-color: #0c203b; padding-top: 5px; padding-bottom: 6px; padding-left: 7px; color: white; font-size: 14px; border-bottom: solid 1px #DDD">
                           Pendientes 09 Septiembre 2022
                        </div>
                        <div style="display: flex; padding: 1.2rem; background-color: white">
                            <div style="display: flex; margin-right: 1.2rem;align-items: center;  ">
                                <div style="border-radius: 100%; background-color: #6785C1; height: 13px; width: 13px;"></div>
                            </div>
                            <div style="display: flex;  flex-direction: column;font-size: 14px">
                                <div>Revenue: <span style="font-weight: 600">${currentDataToShow[0].substr(0, currentDataToShow[0].length - 1)}</span></div>
                                <div>Revenue per employee: <span style="font-weight: 600">${currentDataToShow[1].substr(0, currentDataToShow[1].length - 1)}</span></div>
                                <div>Net income per employee: <span style="font-weight: 600">${"Hola"}</span></div>
                            </div>
                        </div>
                     </div>
                `];

                        tooltipEl.querySelector('table').innerHTML = innerHtml;
                    }

                    const position = context.chart.canvas.getBoundingClientRect();

                    // Display, position, and set styles for font
                    tooltipEl.style.opacity = '1';
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                    tooltipEl.style.pointerEvents = 'none';
                } */
            }
        },
        indexAxis: 'x', 
        scales: {
          y:{
            min: '2022-09-05T08:00:00.000',
            max: '2022-09-05T20:00:00.000',
            type: 'time',
            time:{
              unit:'hour'
            },                          
          },
           x:{
            begingAtZero: true
          }
        }
    }
    let data = {
        labels: dataLabels,
        datasets: [
        {
            label: title,
            data: dataGraph,
            backgroundColor: [
                "rgba(81, 46, 95, .3)",
                "rgba(203, 67, 53, .3)",
                "rgba(46, 204, 113, .3)",
                "rgba(243, 156, 18, .5)",
                "rgba(93, 173, 226, .5)",
                "rgba(142, 68, 173, .5)"
            ],
            borderColor: [
                "rgba(81, 46, 95, 1)",
                "rgba(203, 67, 53, 1)",
                "rgba(46, 204, 113, 1)",
                "rgba(243, 156, 18, 1)","rgba(93, 173, 226, 1)",
                "rgba(142, 68, 173, 1)"
            ],
            borderWidth: 1,
            borderRadius: 5,
            borderSkipped: false,
        }
        ],
    }
    const handleShowOptions = () =>{
        setShowOptions(!showOptions)
      }
    const handleNextWeek = () =>{
        if(!rangeWeekPendings)return
        setRangeWeekPendings({initial: new Date(dayjs(rangeWeekPendings.initial).hour(0).minute(0).second(0).millisecond(0).add(7, 'day').$d), end: new Date(dayjs(rangeWeekPendings.end).hour(0).minute(0).second(0).millisecond(0).add(7, 'day').$d)})
    }
  
    const handlePreviousWeek = () =>{
        if(!rangeWeekPendings)return
        setRangeWeekPendings({initial: new Date(dayjs(rangeWeekPendings.initial).hour(0).minute(0).second(0).millisecond(0).subtract(7, 'day').$d), end: new Date(dayjs(rangeWeekPendings.end).hour(0).minute(0).second(0).millisecond(0).subtract(7, 'day').$d)})
    }
    const handleSearch = (form) =>{
        setSearch(form)
        setTypeChart(form.typeChart)
    }
    return(
        <div style={{ background: "#fff", borderRadius: 4, marginBottom: 15, position:"relative"}}>
            <div style={{ borderRadius:"4px 4px 0px 0px",color: "white", backgroundColor:"#0c203b",display: "flex", justifyContent:"space-between", padding: "7px 20px"}}>
                <p>{title}</p>
                <div style={{display:"flex", flexDirection:"column"}} onClick={(e)=>handleShowOptions()}>
                    <Settings/>
                </div>
            </div>
            {showOptions&&
            <form onSubmit={handleSubmit(handleSearch)} style={{float:"right",backgroundColor:"#0c203b", border:"3px rgba(0,0,0,.2) solid", padding:"5px", borderRadius:"0px 0px 0px 5px", position:"absolute",top:38, right:0, color:"white"}}>
                <div>                    
                    <label>Ordenar por: </label>
                    <select {...register("order")} style={{borderRadius:"5px"}}>
                        <option>Nombre</option>
                        <option>+Propectos</option>
                        <option>-Propectos</option>
                    </select>
                </div>
                <div>                    
                    <label>Inicio: </label>
                    <input {...register("initial")} style={{borderRadius:"5px"}} type="date"/>
                </div>
                <div>
                    <label>Fin: </label>
                    <input {...register("end")} type="date" style={{borderRadius:"5px"}}/>
                </div>
                <button type="submit">Aceptar</button>
            </form>}
            <hr/>
            <div className="content" style={{padding:"20px"}}>
                {typeChart === "bar"?
                    <Bar data={data} options={options}/>
                    :null
                }
            </div>
            <div className="footer" style={{ color: "white", backgroundColor:"#0c203b", borderRadius:"0px 0px 4px 4px", padding:"5px 20px", display:"flex", justifyContent:"right"}}>
                <div className="tfooter__ctr_pagination__pagination">
                    <button className="before" onClick={handlePreviousWeek} style={{color:"white",background:"none"}}>
                        <NavigateBefore />
                    </button>
                    {rangeWeekPendings?
                    <>
                    {formatDate(rangeWeekPendings?.initial)}
                    ----
                    {formatDate(rangeWeekPendings?.end)}
                    </>
                    :null}
                    <button className="next" onClick={handleNextWeek} style={{color:"white",background:"none"}}>
                        <NavigateNext />
                    </button>
                </div>
            </div>
        </div>
        )
}
export default GraphWeekPendings;