import { useMemo, useState } from "react";
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
import { Bar, Doughnut, Line, Pie, PolarArea } from "react-chartjs-2";
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

const Graph = ({type,dataLabels,dataGraph,title,options, showOptions, setShowOptions,setSearch, rangeWeekPendings, setRangeWeekPendings}) =>{
    const [typeChart, setTypeChart] = useState(type);
    const {register,handleSubmit,formState: { errors }} = useForm();
    let optionsBar ={indexAxis: 'x', scales:{y:{ display:false}}, plugins:{legend: {display:false}}}
    let optionsLine ={plugins:{legend: {display:false}}}
    let colors = [
        "rgb(133, 146, 158)",
        "rgb(203, 67, 53)",
        "rgb(46, 204, 113)",
        "rgb(243, 156, 18)",
        "rgb(93, 173, 226)",
        "rgb(142, 68, 173)",
    ]
    let colorsCopy =[
        'rgba(0, 93, 255 , 0.8)',
        'rgba(55, 255, 1, 0.8)',
        'rgba(236, 255, 1, 0.8)',
        'rgba(255, 151, 1 , 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
    ]
    const colorsGraph = [
        "#f9e79f",
        "#5dade2",
        "#aed6f1",
        "#a569bd",
        "#ec7063",
        "#f4d03f"];
      const colorsGraph1 = [
        "rgb(46, 204, 113)",
        "rgb(155, 89, 182)",
        "rgb(236, 112, 99)",
        "rgb(241, 196, 15)",
        "rgb(52, 152, 219)",
        "rgb(127, 179, 213)",
      ];
      const colorsGraph2 = [
        "rgb(229, 152, 102)",
        "rgb(231, 76, 60)",
        "rgb(34, 153, 84)",
        "rgb(243, 156, 18)",
        "rgb(93, 173, 226)",
        "rgb(142, 68, 173)",
      ]
    let data = {
        labels: dataLabels,
        datasets: [
        {
            label: title,
            data: dataGraph,
            backgroundColor: ["rgba(0, 120, 197, .7)"],
            borderColor: ["rgba(0, 120, 197, 1)"],
            borderWidth: 1,
            borderRadius: 5,
        }
        ],
    }
    if(typeChart==="pie"||typeChart==="donout"||typeChart==="polar-area"||typeChart === "doughnut"){
        data.datasets[0].backgroundColor=colorsCopy;
        delete(data.datasets[0].borderColor)
    }
    const handleShowOptions = () =>{
        setShowOptions(!showOptions)
      }
    const handlePreviousPage = () =>{

    }
    const handleNextPage = () =>{
        
    }
    const handleSearch = (form) =>{
        setSearch(form)
        console.log(form.typeChart)
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
                <div>
                    <label>Mostrar: </label>
                    <input {...register("view")} onKeyDown={function(){return false}} type="number" max="50" step="5" placeholder="5" style={{padding: "1px 0px 1px 5px",border: "none",borderBottom: "2px solid #858585",transition: "all 0.3s ease",fontSize: "14px", width: "3rem", borderRadius:"5px"}}/>
                </div>
                <div>                    
                    <label>Tipo de gráfica: </label>
                    <select {...register("typeChart")} style={{borderRadius:"5px"}}>
                        <option value={"bar"}>Barras Vertical</option>
                        <option value={"bary"}>Barras Horizontal</option>
                        <option value={"pie"}>Pastel</option>
                        <option value={"line"}>Lineal</option>
                        <option value={"doughnut"}>Dona</option>
                        <option value={"polar-area"}>Área Polar</option>
                    </select>
                </div>
                <button type="submit">Aceptar</button>
            </form>}
            <hr/>
            <div className="content" style={{padding:"20px"}}>
                {typeChart === "bar"?
                    <Bar data={data} options={options||optionsLine}/>
                    :typeChart === "line"?<Line data={data} options={options||optionsLine}/>
                        :typeChart === "pie"?<Pie data={data} options={options||optionsLine}/>
                            :typeChart === "polar-area"?<PolarArea data={data} options={options||optionsLine}/>
                                :typeChart === "doughnut"?<Doughnut data={data} options={options||optionsLine}/>:null
                }
            </div>
            <div className="footer" style={{ color: "white", backgroundColor:"#0c203b", borderRadius:"0px 0px 4px 4px", padding:"5px 20px", display:"flex", justifyContent:"right"}}>
                <div className="tfooter__ctr_pagination__pagination">
                    <button className="before" onClick={handlePreviousPage} style={{color:"white",background:"none"}}>
                        <NavigateBefore />
                    </button>
                    <button className="next" onClick={handleNextPage} style={{color:"white",background:"none"}}>
                        <NavigateNext />
                    </button>
                </div>
            </div>
        </div>
        )
}
export default Graph;