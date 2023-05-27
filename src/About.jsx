import axios from "axios"
const res = await axios.get('https://jsonplaceholder.typicode.com/todos/');
const obj = res.data;
// import list from './fruitsData.json';

export default function About({query}){ 
    const list = 
    [
        {
            name:'orange',
            price:8
        },
        {
            name:'apple',
            price:30
        },
        {
            name:'kivi',
            price:25
        },
        {
            name:'graps',
            price:0.100
        },
        {
            name:'dragon-fruit',
            price:90
        },
    ]
    
    const Filterlist = list.filter((data) =>{
        if(query === '') return data;
        else return data.name.toLowerCase().includes(query.toLowerCase());
    })
    console.log(Filterlist);     
    return (
        <>
            <h1 className="text-5xl mt-10">About</h1>
         {obj.slice(0, 15).map((item, index) => (
        <h1 key={index}>{item.title}</h1>
        ))}
        {
            Filterlist.map((data,idx)=>(
                <li key={idx}>{data.name}</li>
            ))
        }
        </>
    )
}