import { NavigateBefore, NavigateNext, Settings } from "@material-ui/icons";
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
import { useForm } from "react-hook-form";

const TableDashboard = ({type,children,title,options, showOptions, setShowOptions, totalData, page, setPage, limit}) =>{
    const {register,handleSubmit,formState: { errors }} = useForm();
    if(type==="pie"||type==="donout"||type==="polar-area"||type === "doughnut"){
        data.datasets[0].backgroundColor=colorsCopy;
        delete(data.datasets[0].borderColor)
    }
    const handleShowOptions = () =>{
        setShowOptions(!showOptions)
      }
    const handlePreviousPage = () =>{
        if(page>1&&page<=(totalData/limit)){
            setPage(page-1)
        }
    }
    const handleNextPage = () =>{
        if(page>=1&&page<(totalData/limit)){
            setPage(page+1)
        }
    }
    const handleSearch = (form) =>{
        console.log(form)
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
            <form onSubmit={handleSubmit(handleSearch)} style={{float:"right",backgroundColor:"#0c203b", border:"3px rgba(0,0,0,.2) solid", padding:"5px", borderRadius:"0px 0px 0px 5px", position:"absolute",top:38, right:0, color:"white", zIndex:10000 }}>
                <div>                    
                    <label>Ordenar por: </label>
                    <select style={{borderRadius:"5px"}}>
                        <option>Nombre</option>
                        <option>+Propectos</option>
                        <option>-Propectos</option>
                    </select>
                </div>
                <div>                    
                    <label>Inicio: </label>
                    <input style={{borderRadius:"5px"}} type="date"/>
                </div>
                <div>
                    <label>Fin: </label>
                    <input type="date" style={{borderRadius:"5px"}}/>
                </div>
                <div>
                    <label>Mostrar: </label>
                    <input onKeyDown={function(){return false}} type="number" max="50" step="5" placeholder="5" style={{padding: "1px 0px 1px 5px",border: "none",borderBottom: "2px solid #858585",transition: "all 0.3s ease",fontSize: "14px", width: "3rem", borderRadius:"5px"}}/>
                </div>
                <button type="submit">Aceptar</button>
            </form>}
            <div className="content" style={{padding:0, margin:0}} >
                {children}
            </div>
            <div className="footer" style={{ color: "white", backgroundColor:"#0c203b", borderRadius:"0px 0px 4px 4px", padding:"0px 20px", display:"flex", justifyContent:"right"}}>
                <div style={{display:"flex",flexDirection:"column"}}>
                <div className="tfooter__ctr_pagination__pagination" style={{display:"flex",alignItems:"center"}}>
                    {`Pagina: ${page} - ${Math.ceil(totalData/limit)}`}
                    <button className="before" onClick={handlePreviousPage} style={{background: "none", border:"none", color: "white"}}>
                        <NavigateBefore />
                    </button>
                    <button className="next" onClick={handleNextPage} style={{background: "none", border:"none", color: "white"}}>
                        <NavigateNext />
                    </button>
                </div>
                </div>
            </div>
        </div>
        )
}
export default TableDashboard;